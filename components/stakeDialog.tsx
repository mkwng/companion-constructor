import { useState } from "react";
import Button from "./button";
import { Faq } from "./faq";

export const StakeDialog = ({
	handleClose,
	selectedCompanions,
}: {
	handleClose: () => void;
	selectedCompanions: number[];
}) => {
	const [showFaq, setShowFaq] = useState(false);

	return (
		<>
			<div className="w-screen h-screen fixed z-50 inset-0 font-mono">
				<div
					className="inset-0 w-full h-full bg-opacity-90 bg-ui-black-default cursor-pointer"
					onClick={handleClose}
				>
					&nbsp;
				</div>
				<div className="w-full max-w-screen-xl max-h-screen overflow-y-scroll md:overflow-y-hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-default-white grid grid-cols-1 md:grid-cols-2 overflow-hidden md:aspect-[2/1] shadow-ui-black-default shadow-xl">
					<div className={`aspect-1 relative`}>
						<div
							className={`h-full w-full bg-ui-black-lightest flex justify-center items-center`}
						>
							<span className="font-display text-default-yellow animate-pulse text-9xl">?</span>
						</div>
					</div>

					{showFaq ? (
						<div className="md:overflow-y-scroll relative">
							<div className="sticky top-4 ml-4">
								<Button className="text-xs w-auto" onClick={() => setShowFaq(false)}>
									Back
								</Button>
							</div>
							<Faq section="staking" />
						</div>
					) : (
						<div className="flex flex-col gap-4 justify-center items-center relative text-sm">
							<div className="absolute top-4 right-4">
								<Button className="w-8 h-8 pl-0 pr-0 pt-0 pb-0" onClick={handleClose}>
									×
								</Button>
							</div>
							<h1 className="font-display text-9xl text-center text-ui-black-lighter">Stake</h1>

							<div className="px-8 max-w-xs text-center flex flex-col gap-2 justify-center items-center">
								<p>
									Earn <strong>$COMPANIONSHIP</strong> by putting your companions out on the
									pasture.{" "}
								</p>
								<p>
									You can call them back to your wallet at any point. Every day they are staked,
									you can earn.
								</p>
								<p>
									<a
										className="text-ui-orange-default"
										href="#"
										onClick={(e) => {
											e.preventDefault();
											setShowFaq(true);
										}}
									>
										What is this?
									</a>
								</p>
								<div className="mt-16 w-full sticky bottom-8">
									<Button className="text-lg text-white bg-ui-orange-default">
										<span>Stake</span>
										<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest bg-opacity-20 rounded-full">
											{selectedCompanions.length} companion
											{selectedCompanions.length > 1 ? "s" : ""}
										</span>
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
