import Image from "next/image";
import Button from "./button";

const MyCompanions = ({
	owned,
	selected,
	callback,
}: {
	owned: number[];
	selected?: number;
	callback: (companionId?: number) => void;
}) => {
	return (
		<div className="fixed z-40 flex flex-col justify-center items-center left-4 top-4 p-4 bg-white rounded-xl overflow-y-scroll hide-scrollbar shadow-medium">
			<div
				className={`font-semibold flex justify-center content-center cursor-pointer min-h-20 rounded-xl  hover:text-gray-800  border-4 border-transparent ${
					!selected ? "border-black bg-hair-lightblue" : "hover:bg-gray-100 bg-gray-50"
				}`}
				onClick={() => {
					callback();
				}}
			>
				Playground
			</div>

			<h2>My companions</h2>
			{owned.map((companionId) => {
				return (
					<div
						key={companionId}
						className={`m-2 transition-all transform-gpu w-24 h-24 flex justify-center items-center font-semibold cursor-pointer rounded-full overflow-hidden shadow-xl hover:text-gray-800  border-4 border-transparent ${
							selected == companionId
								? "border-hair-lightblue"
								: "hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 bg-gray-50 filter grayscale"
						}`}
						onClick={() => {
							callback(companionId);
						}}
					>
						<img
							src={`/api/face.png?id=${companionId}`}
							alt={`${companionId}`}
							className="w-full h-full"
						/>
					</div>
				);
			})}
			<Button className=" bg-hair-yellow">Claim $COMPANIONSHIP</Button>
			<Button className=" bg-hair-purple">Mint now!</Button>
		</div>
	);
};

export default MyCompanions;
