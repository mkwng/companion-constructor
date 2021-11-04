import { useEffect, useMemo, useRef } from "react";
import { colors } from "../data/colors";
import { AttributeSelection, Companion, Layer, RGBColor } from "../data/helpers";
import { poses } from "../data/poses";

const loadAllImages = (paths: string[], callback: (img: HTMLImageElement[]) => void): void => {
	let count: number = 0;
	const imgs: HTMLImageElement[] = [];

	paths.forEach((path) => {
		let img = new Image();
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
	const pose = useMemo(() => poses[companion.properties.pose], [companion]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let layers: [Layer, AttributeSelection?][] = [];
		pose.forEach((attribute) => {
			let selection: AttributeSelection | undefined;
			let match = attribute.variants.find((variant) => {
				if (companion.attributes[attribute.name]?.name) {
					let isMatch = variant.name === companion.attributes[attribute.name].name;
					if (isMatch) {
						selection = companion.attributes[attribute.name];
					}
					return isMatch;
				}
				if (variant.restrictions?.gender) {
					if (variant.restrictions.gender != companion.properties.gender) {
						return false;
					}
				}
				if (variant.restrictions?.pose) {
					if (variant.restrictions.pose != companion.properties.pose) {
						return false;
					}
				}
				return !attribute.isOptional;
			});
			if (match) {
				match.layers.forEach((layer) => {
					let result: [Layer, AttributeSelection?] = [layer];
					if (selection) {
						result.push(selection);
					}
					layers.push(result);
				});
			}
		});
		let imagePaths: string[] = layers.map(([layer]) => {
			if (typeof layer.path == "string") {
				return "/attributes/" + layer.path;
			} else {
				return "/attributes/" + layer.path[companion.properties.pose];
			}
		});

		loadAllImages(imagePaths, (imgs) => {
			let colorCount = 0;
			let color: RGBColor | undefined;
			layers.forEach(([layer, selection], i) => {
				if ("color" in layer) {
					color = layer.color;
				} else {
					if (layer.colorType != "static") {
						color = (() => {
							switch (layer.colorType) {
								case "hair":
								case "skin":
								case "background":
									return companion.properties[layer.colorType];
								case "skinShadow":
									ctx.globalCompositeOperation = "multiply";
									return colors.skin["1"];
								case "skinShadowDark":
									ctx.globalCompositeOperation = "multiply";
									return colors.skin["2"];
								case "clothing":
									if (!selection.color) {
										throw new Error("No color selected");
									}
									if (Array.isArray(selection.color)) {
										let temp = selection.color[colorCount++];
										if (colorCount >= selection.color.length) {
											colorCount = 0;
										}
										return temp;
									} else {
										return selection.color;
									}
								default:
									return colors.default.black;
							}
						})();
					}
				}
				if (color) {
					let tempCanvas = document.createElement("canvas");
					tempCanvas.width = imgs[i].width;
					tempCanvas.height = imgs[i].height;
					let tempCtx = tempCanvas.getContext("2d");

					tempCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
					tempCtx.fillRect(0, 0, imgs[i].width, imgs[i].height);

					tempCtx.globalCompositeOperation = "destination-in";
					tempCtx.drawImage(imgs[i], 0, 0);
					ctx?.drawImage(tempCanvas, 0, 0);
				} else {
					ctx?.drawImage(imgs[i], 0, 0);
				}
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
