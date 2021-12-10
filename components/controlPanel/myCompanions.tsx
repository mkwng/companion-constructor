export const MyCompanions = ({
	ownedCompanions,
	selectedCompanion,
	setSelectedCompanion,
	handleCustomize,
}: {
	ownedCompanions: Set<number>;
	selectedCompanion: number;
	setSelectedCompanion: (id: number) => void;
	handleCustomize: () => void;
}) => {
	return (
		<div className="p-4 pt-0 flex flex-col justify-items-stretch gap-2">
			<div className="text-center my-2">
				{ownedCompanions.size === 0 ? (
					<>
						<h3 className="font-bold mb-2">You don&apos;t have any Companions yet!</h3>
						<p className="text-gray-400">
							When you own some Companions, they will show up here
						</p>
					</>
				) : (
					<>
						<div className="flex justify-start items-center gap-2">
							{Array.from(ownedCompanions).map((tokenId) => (
								<div
									key={tokenId}
									className={`
											w-16 h-16 lg:w-12 lg:h-12 xl:w-16 xl:h-16
											flex justify-center items-center 
											font-semibold 
											cursor-pointer 
											rounded-full overflow-hidden
											border-2 border-transparent 
											${
												selectedCompanion == tokenId
													? "border-hair-lightblue text-hair-lightblue"
													: "text-gray-400 border-gray-600 filter grayscale"
											}`}
									onClick={() => {
										setSelectedCompanion(tokenId);
									}}
								>
									{/* eslint-disable */}
									<img
										src={`https://railway.companioninabox.art/api/companion.png?faceOnly=true&id=${tokenId}`}
										alt={`Companion #${tokenId}`}
										className="w-full h-full"
									/>
									{/* eslint-enable */}
								</div>
							))}
						</div>

						<div className="mt-4 pl-2 border-l-4 border-background-sand flex flex-col justify-items-stretch gap-2">
							<button
								disabled={selectedCompanion === null}
								className={`
											relative
											py-2 rounded-full
											text-center
											flex gap-2 justify-center items-center
											border-2 border-gray-600 ${selectedCompanion === null ? "opacity-20" : ""}
										`}
								onClick={() => {
									handleCustomize();
								}}
							>
								<span>Customize</span>
							</button>

							<button
								disabled={selectedCompanion === null}
								className={`
											relative
											py-2 rounded-full
											text-center
											flex gap-2 justify-center items-center
											border-2 border-gray-600  ${selectedCompanion === null ? "opacity-20" : ""}
										`}
								onClick={() => {}}
							>
								<span>Stake this companion</span>
							</button>
						</div>
					</>
				)}
			</div>
			<button
				className={`
									relative
									py-2 rounded-full
									text-center
									flex gap-2 justify-center items-center
									border-2 border-gray-600
								`}
				onClick={() => {}}
			>
				<span>Mint</span>
				<span className="text-xs inline-block px-2 py-0.5 text-clothing-black bg-background-yellow rounded-full">
					soon
				</span>
			</button>
		</div>
	);
};
