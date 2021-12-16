import Button from "../button";

export const Playground = ({
	handleCustomize,
	handleRandomize,
	handleClearSelection,
	disabled,
}: {
	handleCustomize: () => void;
	handleRandomize: () => void;
	handleClearSelection: () => void;
	disabled: boolean;
}) => {
	return (
		<div className="relative m-2 mt-0 p-2 bg-ui-black-darker rounded-lg overflow-hidden">
			<div className="grid grid-cols-2 gap-2">
				<div className="col-span-2 py-8 flex flex-col w-8/12 mx-auto justify-center items-center">
					<h3 className="font-bold mb-2 text-center">Welcome to the playground!</h3>
					<p className="text-gray-400 text-center">
						You can preview (almost) all the attributes and mix and match all you want. <br />
						Some rarer traits you can only get by minting randomly.
					</p>
				</div>
				<Button className="border-ui-black-lighter" onClick={handleCustomize}>
					Customize
				</Button>
				<Button className="border-ui-black-lighter" onClick={handleRandomize}>
					Randomize
				</Button>
			</div>
			{disabled ? (
				<div className="absolute w-full h-full inset-0 bg-opacity-90 backdrop-blur-sm bg-ui-black-darker">
					<div className="flex flex-col h-full w-8/12 mx-auto justify-center items-center">
						<h3 className="font-bold mb-2 text-center">Back to playground</h3>
						<p className="text-gray-400 text-center">This will deselect your companion.</p>
						<Button
							className="border-ui-black-lighter mt-2"
							onClick={() => {
								handleClearSelection();
								handleRandomize();
							}}
						>
							Randomize
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
};
