import { useEffect, useRef, useState } from "react";
import { AttributeSelection, Companion, Layer, Pose, RGBColor } from "../data/types";
import { colorToKey, getColor, getLayers, getPath } from "../data/helpers";
import { colors } from "../data/colors";

const imgLoadToPromise = (src): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
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
			return translateImage(flipHorizontal(source), -261, -15);
		case 2:
			return source;
		case 3:
			return translateImage(source, 521, -313);
		case 4:
			return translateImage(rotateImage(flipVertical(source), -90), 246, 0);
	}
};

export default function Renderer({
	className,
	companion,
	...props
}: {
	className?: string;
	companion: Companion;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const layers: [Layer, AttributeSelection?, boolean?][] = getLayers(companion);

		const imagePaths: string[] = layers.map(([layer]) =>
			getPath(layer, companion.properties.pose)
		);

		setIsLoading(true);

		(async () => {
			const imgs = await loadImages(imagePaths);
			layers.forEach(([layer, selection, needsTranslation], i) => {
				let color: RGBColor | undefined;
				if ("color" in layer) {
					color = layer.color;
				} else if ("colorType" in layer) {
					color = getColor(layer, companion, selection);
				}
				if (layer.blendMode) {
					ctx.globalCompositeOperation = layer.blendMode;
				}
				let imageToDraw = color ? replaceColor(imgs[i], color) : imgs[i];
				imageToDraw = needsTranslation
					? applyTransform(imageToDraw, companion.properties.pose)
					: imageToDraw;
				if (!imageToDraw) throw new Error("No image returned");
				ctx.drawImage(imageToDraw, 0, 0);
				ctx.globalCompositeOperation = "source-over";
			});
			setIsLoading(false);
		})();
	}, [companion]);

	return (
		<div
			className={`w-full bg-background-${colorToKey(
				companion.properties.background,
				colors.background
			)}`}
			{...props}
		>
			{companion && (
				<canvas
					width="2048"
					height="2048"
					ref={canvasRef}
					className={`max-w-full max-h-2/3-screen mx-auto transition-opacity ${
						isLoading && "opacity-50"
					}`}
				/>
			)}
		</div>
	);
}
