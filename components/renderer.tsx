import { useEffect, useRef } from "react";
import { colors } from "../data/colors";
import { AttributeSelection, Companion, Layer, Pose, RGBColor } from "../data/types";
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
		//@ts-ignore
		case "1":
			return translateImage(flipHorizontal(source), -261, -15);
		case 2:
		//@ts-ignore
		case "2":
			return source;
		case 3:
		//@ts-ignore
		case "3":
			return translateImage(source, 521, -313);
		case 4:
		//@ts-ignore
		case "4":
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
	if (!companion) return null;
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const layers: [Layer, AttributeSelection?, boolean?][] = getLayers(companion);

		const imagePaths: string[] = layers.map(([layer]) =>
			getPath(layer, companion.properties.pose)
		);

		loadAllImages(imagePaths, (imgs) => {
			layers.forEach(([layer, selection, needsTranslation], i) => {
				let color: RGBColor | undefined;
				if ("color" in layer) {
					color = layer.color;
				} else if ("colorType" in layer) {
					color = getColor(layer, companion, selection?.color);
				}
				if (layer.blendMode) {
					ctx.globalCompositeOperation = layer.blendMode;
				}
				let imageToDraw = color ? replaceColor(imgs[i], color) : imgs[i];
				imageToDraw = needsTranslation
					? applyTransform(imageToDraw, companion.properties.pose)
					: imageToDraw;
				if (!imageToDraw) debugger;
				ctx.drawImage(imageToDraw, 0, 0);
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
