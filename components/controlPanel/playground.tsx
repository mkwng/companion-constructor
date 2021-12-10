export const Playground = ({
	handleCustomize,
	handleRandomize,
}: {
	handleCustomize: () => void;
	handleRandomize: () => void;
}) => {
	return (
		<div className="p-2 pl-3 pt-0 ">
			<div className="pl-2 border-l-4 border-background-sand flex flex-col justify-items-stretch gap-2">
				<button
					className={`
									relative
									py-2 rounded-full
									text-center
									border-2 border-gray-600
								`}
					onClick={handleCustomize}
				>
					Customize
				</button>
				<button
					className={`
									relative
									py-2 rounded-full
									text-center
									border-2 border-gray-600
								`}
					onClick={handleRandomize}
				>
					Randomize
				</button>
			</div>
		</div>
	);
};
