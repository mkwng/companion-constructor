import { useEffect, useState } from "react";
import Button from "./button";
import { Faq } from "./faq";

const Approvals = ({
	tokenIds,
	handleApprove,
	onSuccess,
	onFailure,
}: {
	tokenIds: number[];
	handleApprove: (tokenId: number) => Promise<boolean>;
	onSuccess: () => void;
	onFailure: () => void;
}) => {
	const [current, setCurrent] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (current >= tokenIds.length) {
			onSuccess();
		}
	}, [current, onSuccess, tokenIds.length]);

	return (
		<div className="flex flex-col gap-4">
			<p>
				You&apos;re about to be asked to approve us, the Companion Range, to be able to move
				your Companions. This will cost gas.
			</p>
			<p>(If you&apos;ve previously approved, clicking below should not cost any gas.)</p>
			<div>
				<Button
					loading={loading}
					onClick={async () => {
						setLoading(true);
						const successfulApproval = await handleApprove(tokenIds[current]);
						setLoading(false);
						if (successfulApproval) {
							setCurrent((prev) => prev + 1);
						} else {
							onFailure();
						}
					}}
				>
					<span>Approve</span>
					<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest rounded-full">
						{current + 1} of {tokenIds.length}
					</span>
				</Button>
			</div>
		</div>
	);
};

const StakeStep = ({
	handleStake,
	selectedCompanions,
	onSuccess,
	onFailure,
}: {
	handleStake: (tokenIds: number[]) => Promise<boolean>;
	selectedCompanions: number[];
	onSuccess: () => void;
	onFailure: () => void;
}) => {
	const [loading, setLoading] = useState(false);
	return (
		<div className="flex flex-col gap-4">
			<p>Ok we&apos;re ready to stake your Companions. This will cost gas.</p>
			<div>
				<Button
					className="text-lg text-white bg-ui-orange-default"
					onClick={async () => {
						setLoading(true);
						if (await handleStake(selectedCompanions)) {
							onSuccess();
						} else {
							onFailure();
						}
						setLoading(false);
					}}
				>
					<span>Stake</span>
					<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest bg-opacity-20 rounded-full">
						{selectedCompanions.length} companion
						{selectedCompanions.length > 1 ? "s" : ""}
					</span>
				</Button>
			</div>
		</div>
	);
};

export const StakeDialog = ({
	handleClose,
	handleApprove,
	handleStake,
	onSuccess,
	selectedCompanions,
}: {
	handleClose: () => void;
	handleApprove: (tokenId: number) => Promise<boolean>;
	handleStake: (tokenIds: number[]) => Promise<boolean>;
	onSuccess: () => void;
	selectedCompanions: number[];
}) => {
	const [step, setStep] = useState<"intro" | "approvals" | "stake" | "success">("intro");
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
							<span className="font-display subpixel-antialiased text-default-yellow animate-pulse text-9xl">
								?
							</span>
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
						<>
							{step === "intro" ? (
								<div className="flex flex-col gap-4 justify-center items-center relative text-sm">
									<div className="absolute top-4 right-4">
										<Button className="w-8 h-8 pl-0 pr-0 pt-0 pb-0" onClick={handleClose}>
											×
										</Button>
									</div>
									<h1 className="font-display text-9xl text-center text-ui-black-lighter">
										Stake
									</h1>

									<div className="px-8 max-w-xs text-center flex flex-col gap-2 justify-center items-center">
										<p>
											Earn <strong>$COMPANIONSHIP</strong> by putting your companions out on the
											pasture.{" "}
										</p>
										<p>
											You can call them back to your wallet at any point. Every day they are
											staked, you can earn.
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
											<Button
												className="text-lg text-white bg-ui-orange-default"
												onClick={() => {
													setStep("approvals");
												}}
											>
												<span>Stake</span>
												<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest bg-opacity-20 rounded-full">
													{selectedCompanions.length} companion
													{selectedCompanions.length > 1 ? "s" : ""}
												</span>
											</Button>
										</div>
									</div>
								</div>
							) : null}
							{step === "approvals" ? (
								<div className="flex flex-col gap-4 justify-center items-center relative text-sm">
									<div className="absolute top-4 left-4">
										<Button className="text-xs w-auto" onClick={() => setStep("intro")}>
											Back
										</Button>
									</div>
									<div className="m-4">
										<Approvals
											tokenIds={selectedCompanions}
											handleApprove={handleApprove}
											onSuccess={() => {
												setStep("stake");
											}}
											onFailure={() => {
												alert("Something went wrong. Please try again.");
											}}
										/>
									</div>
								</div>
							) : null}

							{step === "stake" ? (
								<div className="flex flex-col gap-4 justify-center items-center relative text-sm">
									<StakeStep
										handleStake={handleStake}
										selectedCompanions={selectedCompanions}
										onSuccess={() => {
											setStep("success");
											onSuccess();
										}}
										onFailure={() => {
											alert("Something went wrong. Please try again.");
										}}
									/>
								</div>
							) : null}
						</>
					)}
				</div>
			</div>
		</>
	);
};
