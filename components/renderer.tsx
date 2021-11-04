import { useEffect, useRef } from "react";
import { colors } from "../data/colors";
import { AttributeSelection, Companion, Layer, RGBColor } from "../data/types";
import { getColor, getLayers, getPath } from "../data/helpers";

const loadAllImages = (paths: string[], callback: (img: HTMLImageElement[]) => void): void => {
	let count: number = 0;
	const imgs: HTMLImageElement[] = [];

	paths.forEach((path) => {
		const img = new Image();
		imgs.push(img);
		img.onload = () => {
			count++;
			if (count === paths.length) {
				callback(imgs);
			}
		};
		img.onerror = () => {
			throw new Error(`Failed to load image: ${path}`);
		};
		img.src = path;
	});
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

export default function Renderer({
	className,
	companion,
	...props
}: {
	className?: string;
	companion: Companion;
}) {
	if (!companion) return null;
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const layers: [Layer, AttributeSelection?][] = getLayers(companion);

		const imagePaths: string[] = layers.map(([layer]) =>
			getPath(layer, companion.properties.pose)
		);

		loadAllImages(imagePaths, (imgs) => {
			let color: RGBColor | undefined;
			layers.forEach(([layer, selection], i) => {
				if ("color" in layer) {
					color = layer.color;
				} else if ("colorType" in layer) {
					color = getColor(layer, companion, selection?.color);
				}
				if (layer.blendMode) {
					ctx.globalCompositeOperation = layer.blendMode;
				}
				ctx.drawImage(color ? replaceColor(imgs[i], color) : imgs[i], 0, 0);
				ctx.globalCompositeOperation = "source-over";
			});
		});
	}, [companion]);

	return (
		<div className={className} {...props}>
			<canvas width="2048" height="2048" ref={canvasRef} style={{ width: "100%" }} />
		</div>
	);
}
