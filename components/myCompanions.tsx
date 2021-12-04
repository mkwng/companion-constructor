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
		<>
			{owned.length ? (
				<>
					<h3 className="text-xl font-bold">My companions</h3>
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
								{/* eslint-disable */}
								<img
									src={`/api/face.png?id=${companionId}`}
									alt={`${companionId}`}
									className="w-full h-full"
								/>
								{/* eslint-enable */}
							</div>
						);
					})}

					<Button className=" bg-hair-yellow">Claim $COMPANIONSHIP</Button>
				</>
			) : (
				<>
					<h3 className="text-xl font-bold">No companions yet!</h3>
					<p>When you own Companions and your wallet is connected, they&apos;ll show up here</p>
				</>
			)}

			<Button className="text-black bg-background-orange">Mint</Button>
		</>
	);
};

export default MyCompanions;
