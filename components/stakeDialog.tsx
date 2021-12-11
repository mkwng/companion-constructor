import Button from "./button";

export const StakeDialog = ({ handleClose }: { handleClose: () => void }) => {
	return (
		<>
			<div className="w-screen h-screen fixed z-50 inset-0 font-mono">
				<div
					className="inset-0 w-full h-full bg-opacity-90 bg-ui-black-default cursor-pointer"
					onClick={handleClose}
				>
					&nbsp;
				</div>
				<div className="w-full max-w-screen-xl max-h-screen overflow-y-scroll md:overflow-y-hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-default-white grid grid-cols-1 md:grid-cols-2 overflow-hidden md:aspect-[2/1]">
					<div className={`aspect-1 relative`}>
						<div
							className={`h-full w-full bg-ui-black-lightest flex justify-center items-center`}
						>
							<span className="font-display text-default-yellow animate-pulse text-9xl">?</span>
						</div>
					</div>
					<div className="flex flex-col gap-4 justify-center items-center relative text-sm">
						<div className="absolute top-4 right-4">
							<Button className="w-8 h-8 pl-0 pr-0 pt-0 pb-0" onClick={handleClose}>
								×
							</Button>
						</div>
						<h1 className="font-display text-9xl text-center text-ui-black-lighter">Stake</h1>
					</div>
				</div>
			</div>
		</>
	);
};
