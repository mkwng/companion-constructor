import { colors } from "../data/colors";

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex({ r, g, b }) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
const allColors = {};
Object.keys(colors).map((group) => {
	const temp = {};
	Object.keys(colors[group]).map((color) => {
		temp[color] = rgbToHex(colors[group][color]);
	});
	allColors[group] = temp;
});
console.log(allColors);

export default function Colors() {
	return (
		<div>
			{Object.keys(colors).map((group) => {
				return (
					<div key={group}>
						{Object.keys(colors[group]).map((color) => {
							return (
								<div
									key={`${group}-${color}`}
									style={{
										width: "48px",
										height: "48px",
										display: "inline-block",
										backgroundColor: `rgb(${colors[group][color].r},${colors[group][color].g},${colors[group][color].b})`,
									}}
								></div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
