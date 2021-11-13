import { colors } from "../data/colors";

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
