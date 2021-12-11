import { colors } from "../../data/colors";
import Button from "../button";

export const MyCompanions = ({
	ownedCompanions,
	selectedCompanion,
	setSelectedCompanion,
	handleCustomize,
	loading,
}: {
	ownedCompanions: Set<number>;
	selectedCompanion: number;
	setSelectedCompanion: (id: number) => void;
	handleCustomize: () => void;
	loading: boolean;
}) => {
	return (
		<div className="relative m-2 mt-0 p-2 bg-ui-black-darker rounded-lg overflow-hidden">
			{ownedCompanions.size === 0 ? (
				<div className="py-8 flex flex-col w-8/12 mx-auto justify-center items-center text-center">
					<h3 className="font-bold mb-2">You don&apos;t have any Companions yet!</h3>
					<p className="text-gray-400">When you own some Companions, they will show up here</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-4 xl:grid-cols-6 justify-start items-center gap-2">
						{Array.from(ownedCompanions).map((tokenId) => (
							<Button
								key={tokenId}
								className={`${
									selectedCompanion == tokenId
										? "border-hair-lightblue text-hair-lightblue"
										: "text-gray-400 border-ui-black-lighter "
								}`}
								onClick={() => {
									setSelectedCompanion(tokenId);
								}}
							>
								#{tokenId}
								{/* eslint-disable */}
								{/* <img
									src={`https://railway.companioninabox.art/api/companion.png?id=${tokenId}`}
									alt={`Companion #${tokenId}`}
									className="w-full h-full"
								/> */}
								{/* eslint-enable */}
							</Button>
						))}
					</div>

					<div className="grid grid-cols-2 gap-2 mt-2">
						<Button disabled={selectedCompanion === null} onClick={handleCustomize}>
							<span>Customize{selectedCompanion ? ` #${selectedCompanion}` : ""}</span>
						</Button>

						<Button disabled={selectedCompanion === null} onClick={() => {}}>
							<span>Stake{selectedCompanion ? ` #${selectedCompanion}` : ""}</span>
						</Button>
					</div>
				</>
			)}
			{loading ? (
				<div className="absolute w-full h-full inset-0 bg-opacity-90 backdrop-blur-sm bg-ui-black-darker">
					<div className="absolute animate-spin w-6 h-6 left-1/2 top-1/2 -ml-3 -mt-3 text-ui-black-darker">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill={`rgb(${colors.clothing.orange.r},${colors.clothing.orange.g},${colors.clothing.orange.b})`}
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="12" cy="12" r="3"></circle>
							<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
						</svg>
					</div>
				</div>
			) : null}
		</div>
	);
};
