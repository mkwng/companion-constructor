import { useEffect, useRef, useState } from "react";
import {
	AttributeSelection,
	Companion,
	Layer,
	LayerWithData,
	Pose,
	RGBColor,
} from "../data/types";
import { colorToKey, drawLayer, getLayers, getPath } from "../data/helpers";
import { colors } from "../data/colors";
import { Spinner } from "./icons/spinner";

const { w, h } = { w: 1024, h: 1024 };
const ratio = 1;

const imgLoadToPromise = (src): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		let canvas = document.createElement("canvas");
		let ctx = canvas.getContext("2d");
		let img = new Image();
		img.onload = () => {
			return resolve(img);
		};
		img.onerror = reject;
		img.src = src;
		console.log(src);
	});
};

const loadImages = async (paths: string[]): Promise<HTMLImageElement[]> => {
	const etc = paths.map(async (path) => {
		return imgLoadToPromise(path);
	});
	return Promise.all(etc);
};

const replaceColor = (source: HTMLImageElement, color: RGBColor): HTMLCanvasElement => {
	const tempCanvas = document.createElement("canvas");
	tempCanvas.width = source.width;
	tempCanvas.height = source.height;
	const tempCtx = tempCanvas.getContext("2d");

	tempCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
	tempCtx.fillRect(0, 0, source.width, source.height);

	tempCtx.globalCompositeOperation = "destination-in";
	tempCtx.drawImage(source, 0, 0);
	return tempCanvas;
};

const flipHorizontal = (source: HTMLImageElement | HTMLCanvasElement): HTMLCanvasElement => {
	const tempCanvas = document.createElement("canvas");
	tempCanvas.width = source.width;
	tempCanvas.height = source.height;
	const tempCtx = tempCanvas.getContext("2d");

	tempCtx.translate(source.width, 0);
	tempCtx.scale(-1, 1);
	tempCtx.drawImage(source, 0, 0);
	return tempCanvas;
};

const flipVertical = (source: HTMLImageElement | HTMLCanvasElement): HTMLCanvasElement => {
	const tempCanvas = document.createElement("canvas");
	tempCanvas.width = source.width;
	tempCanvas.height = source.height;
	const tempCtx = tempCanvas.getContext("2d");

	tempCtx.translate(0, source.height);
	tempCtx.scale(1, -1);
	tempCtx.drawImage(source, 0, 0);
	return tempCanvas;
};

const translateImage = (
	source: HTMLImageElement | HTMLCanvasElement,
	x: number,
	y: number
): HTMLCanvasElement => {
	const tempCanvas = document.createElement("canvas");
	tempCanvas.width = source.width;
	tempCanvas.height = source.height;
	const tempCtx = tempCanvas.getContext("2d");

	tempCtx.drawImage(source, x, y);
	return tempCanvas;
};

const rotateImage = (
	source: HTMLImageElement | HTMLCanvasElement,
	angle: number
): HTMLCanvasElement => {
	const tempCanvas = document.createElement("canvas");
	tempCanvas.width = source.width;
	tempCanvas.height = source.height;
	const tempCtx = tempCanvas.getContext("2d");

	tempCtx.translate(source.width / 2, source.height / 2);
	tempCtx.rotate((angle * Math.PI) / 180);
	tempCtx.drawImage(source, -source.width / 2, -source.height / 2);
	return tempCanvas;
};

const applyTransform = (
	source: HTMLImageElement | HTMLCanvasElement,
	pose: Pose
): HTMLCanvasElement | HTMLImageElement => {
	switch (pose) {
		case 1:
			return translateImage(flipHorizontal(source), -261 * ratio, -15 * ratio);
		case 2:
			return source;
		case 3:
			return translateImage(source, 521 * ratio, -313 * ratio);
		case 4:
			return translateImage(rotateImage(flipVertical(source), -90), 246 * ratio, 0);
	}
};

export default function Renderer({
	className,
	companion,
	showTitle,
	hideBackground,
	maxHeight,
	...props
}: {
	className?: string;
	companion: Companion;
	showTitle?: boolean;
	maxHeight?: boolean;
	hideBackground?: boolean;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [loadingText, setLoadingText] = useState("0%");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let active = true;
		const canvas = canvasRef.current;
		canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
		const layers: [Layer, AttributeSelection?, boolean?][] = getLayers(companion);

		const imagePaths = layers.map(([layer]) => getPath(layer, companion.properties.pose));

		setIsLoading(true);
		load();
		return () => {
			active = false;
		};

		async function load() {
			canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
			const batches: Set<string> = new Set();
			const imgs = await loadImages(imagePaths);
			const layersWithData: [LayerWithData, AttributeSelection?, boolean?][] = layers.map(
				([layer, ...rest], i) => {
					return [
						{
							imgData: imgs[i],
							...layer,
						},
						...rest,
					];
				}
			);
			for (let i = 0; i < layersWithData.length; i++) {
				const [layer] = layersWithData[i];
				if (layer.batch?.length && layer.batch.some((item) => batches.has(item))) {
					continue;
				}
				if (
					layer.path == "/attributes/pose1/00-background/bg-v_background.png" &&
					hideBackground
				) {
					continue;
				}
				if (!active) {
					return;
				}
				// TODO: This doesn't work for some reason...
				setLoadingText(
					`${((i / layersWithData.length) * 100).toLocaleString(undefined, {
						maximumFractionDigits: 0,
					})}%`
				);
				await drawLayer({
					companion,
					canvas,
					layers: layersWithData,
					drawIndex: i,
					usedBatches: batches,
					paint: (input: HTMLCanvasElement, canvas: HTMLCanvasElement, blendMode) => {
						if (!canvas.getContext) throw new Error("No canvas context");
						const ctx = canvas.getContext("2d");
						ctx.globalCompositeOperation = blendMode || "source-over";
						ctx.drawImage(input, 0, 0, w, h);
						return canvas;
					},
					createCanvas: () => {
						const tempCanvas = document.createElement("canvas");
						tempCanvas.width = canvas.width;
						tempCanvas.height = canvas.height;
						return tempCanvas;
					},
					replaceColor,
					translateImage: applyTransform,
				});
			}
			if (!active) {
				return;
			}
			setIsLoading(false);
		}
	}, [companion, hideBackground]);

	const bgColorKey = colorToKey(companion.properties.background, colors.background);
	const typeColor =
		bgColorKey === "red" || bgColorKey == "orange" ? colors.default.yellow : colors.default.red;

	return (
		<div className={`my-auto w-full`} {...props}>
			<div
				className={`transition-opacity duration-700 absolute inset-2 lg:inset-8 z-0 flex justify-center items-center ${
					showTitle ? "opacity-100" : "opacity-0"
				}`}
			>
				<svg
					className="max-h-full"
					width="100%"
					viewBox="0 0 654 294"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M36.3842 65.54V91.672H32.2482V32.264H36.3842V58.396H68.1562V32.264C68.1562 10.456 56.3122 0.679991 34.3162 0.679991C12.3202 0.679991 0.664203 10.456 0.664203 32.264V91.672C0.664203 113.48 12.3202 123.256 34.3162 123.256C56.3122 123.256 68.1562 113.48 68.1562 91.672V65.54H36.3842ZM108.537 91.672H104.401V32.264H108.537V91.672ZM106.469 0.679991C84.4725 0.679991 72.8165 10.456 72.8165 32.264V91.672C72.8165 113.48 84.4725 123.256 106.469 123.256C128.465 123.256 140.309 113.48 140.309 91.672V32.264C140.309 10.456 128.465 0.679991 106.469 0.679991ZM198.925 2.748L195.541 67.608H192.721L189.337 2.748H145.909V121H177.493L174.297 56.328H177.117L182.945 121H205.317L211.145 56.328H213.965L210.581 121H242.353V2.748H198.925ZM280.489 32.264H284.625V55.2H280.489V32.264ZM284.625 2.748H248.905V121H280.489V84.716H284.625C306.809 84.716 317.149 71.18 317.525 45.424C317.525 44.86 317.525 44.296 317.525 43.732C317.525 17.036 307.185 2.748 284.625 2.748ZM350.237 32.264H354.185V77.572H350.237V32.264ZM350.237 105.02H354.185V121H387.461L379.189 2.748H325.233L316.961 121H350.237V105.02ZM432.165 2.748L439.309 67.608H436.489L425.961 2.748H391.557V121H423.141L416.185 56.328H418.817L428.593 121H463.937V2.748H432.165ZM502.087 121V2.748H470.503V121H502.087ZM543.47 91.672H539.334V32.264H543.47V91.672ZM541.402 0.679991C519.406 0.679991 507.75 10.456 507.75 32.264V91.672C507.75 113.48 519.406 123.256 541.402 123.256C563.398 123.256 575.242 113.48 575.242 91.672V32.264C575.242 10.456 563.398 0.679991 541.402 0.679991ZM621.45 2.748L628.594 67.608H625.774L615.246 2.748H580.842V121H612.426L605.47 56.328H608.102L617.878 121H653.222V2.748H621.45ZM45.6864 291V138.153H4.86245V291H45.6864ZM106.71 138.153L115.944 221.988H112.299L98.6908 138.153H54.2218V291H95.0458L86.0548 207.408H89.4568L102.093 291H147.777V138.153H106.71ZM210.452 218.586V210.81H154.805V218.586H210.452ZM257.339 176.304H262.442V234.867H257.339V176.304ZM257.339 270.345H262.442V291H305.453L294.761 138.153H225.02L214.328 291H257.339V270.345ZM364.937 218.586V210.81H309.29V218.586H364.937ZM418.143 176.304V195.744H412.797V176.304H418.143ZM412.797 253.092V233.652H418.143V253.092H412.797ZM440.985 211.782V208.137C453.135 204.735 457.752 196.23 458.238 177.519C458.238 176.547 458.238 175.575 458.238 174.846C458.238 144.228 444.144 138.153 418.143 138.153H371.973V291H418.143C443.415 291 459.939 285.897 460.668 252.849C460.668 251.877 460.668 250.905 460.668 249.933C460.668 224.661 455.808 215.184 440.985 211.782ZM511.375 253.092H506.029V176.304H511.375V253.092ZM508.702 135.48C480.271 135.48 465.205 148.116 465.205 176.304V253.092C465.205 281.28 480.271 293.916 508.702 293.916C537.133 293.916 552.442 281.28 552.442 253.092V176.304C552.442 148.116 537.133 135.48 508.702 135.48ZM642.092 212.025L653.027 138.153H610.259L605.885 195.744H602.24L597.866 138.153H555.098L565.79 212.025V217.371L555.098 291H597.866L602.24 233.652H605.885L610.259 291H653.027L642.092 217.371V212.025Z"
						fill={`rgb(${typeColor.r},${typeColor.g},${typeColor.b})`}
					/>
				</svg>
			</div>
			{isLoading && (
				<>
					<Spinner />
					<div className="absolute w-12 h-12 left-1/2 top-1/2 -ml-6 mt-16 text-center flex justify-center items-center text-xs">
						{/* {loadingText} */}
					</div>
				</>
			)}
			{companion && (
				<div className={`max-w-full mx-auto z-10 relative ${maxHeight && "max-h-2/3-screen"}`}>
					<canvas
						width={w}
						height={h}
						ref={canvasRef}
						className={`max-w-full mx-auto transition-opacity ${
							maxHeight && "max-h-2/3-screen"
						} ${isLoading ? "opacity-0 duration-0" : ""}`}
					/>
				</div>
			)}
		</div>
	);
}
