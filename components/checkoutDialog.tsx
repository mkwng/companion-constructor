import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { colors } from "../data/colors";
import { colorToKey, getDifferences } from "../data/helpers";
import { Companion } from "../data/types";
import Button from "./button";
import Renderer from "./renderer";
import { Spinner } from "./icons/spinner";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import useSWR from "swr";
import { fetcher } from "../lib/swr";
import { toast } from "react-toastify";

const loadingStrings = [
	"Finalizing your purchase...",
	"Piecing your companion together...",
	"Packing your companion into a box...",
	"Waiting for your transaction to be mined...",
	"Reticulating splines...",
	"Having a snack...",
	"Sending your companion to the nearest space station...",
	"Waiting for your companion to be delivered...",
	"Man, this is taking a while, huh?",
];

export const CheckoutDialog = ({
	companion,
	uneditedCompanion,
	walletBalance,
	handleSpend,
	handleClose,
	transacting,
	coupon,
	setCoupon,
}: {
	companion: Companion;
	uneditedCompanion: Companion;
	walletBalance: number;
	handleSpend: ({ amount, onSuccess }: { amount: number; onSuccess?: () => void }) => void;
	handleClose: () => void;
	transacting: boolean;
	coupon?: string;
	setCoupon: Dispatch<SetStateAction<string>>;
}) => {
	const bgColorKey = colorToKey(companion.properties.background, colors.background);
	const { data, error } = useSWR("/api/coupon?code=" + coupon, fetcher);
	const [loadingText, setLoadingText] = useState(
		"Don't close your browser or you may lose your shipment..."
	);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (data.error) {
			toast.error("Invalid coupon code: " + data.error);
		}
	}, [data]);

	useEffect(() => {
		if (!transacting) return;
		let running = true;

		const updateLoadingText = () => {
			setTimeout(() => {
				if (running) {
					setLoadingText(loadingStrings[Math.floor(Math.random() * loadingStrings.length)]);
				}
				updateLoadingText();
			}, 5000);
		};
		updateLoadingText();
		return () => {
			running = false;
		};
	}, [transacting]);

	const differences = getDifferences(uneditedCompanion, companion);
	const balance = data?.coupon ? 0 : differences.reduce((acc, cur) => acc + cur.cost, 0);

	return (
		<div className="w-screen h-screen fixed z-50 inset-0 font-mono">
			<div className="absolute top-4 right-4 left-4 z-20 flex justify-between">
				<div></div>
				<div>
					{!success && (
						<Button
							className={`bg-ui-black-default text-default-white w-8 h-8 pl-0 pr-0 pt-0 pb-0 ${
								transacting ? "opacity-20" : ""
							}`}
							onClick={transacting ? () => {} : handleClose}
						>
							×
						</Button>
					)}
				</div>
			</div>
			<div
				className="inset-0 w-full h-full bg-opacity-95 bg-ui-black-darker cursor-pointer"
				onClick={transacting ? () => {} : handleClose}
			>
				&nbsp;
			</div>
			{/********************************************/}
			{/*************** Popup Window ***************/}
			{/********************************************/}
			<div
				className={`
					transition-all
					w-full max-h-screen
					absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:aspect-[2/1] 
					rounded-lg shadow-xl
					shadow-ui-black-default 
					${transacting ? "bg-default-white" : "bg-default-white"}
					${
						success
							? "max-w-screen-sm bg-opacity-0 shadow-none overflow-visible "
							: "max-w-screen-xl shadow-xl overflow-y-scroll md:overflow-y-hidden overflow-x-hidden grid grid-cols-1 md:grid-cols-2 "
					}
					`}
			>
				{transacting && !success && (
					<div className="absolute z-50 inset-0 flex flex-col justify-center items-center">
						<div className="w-12 h-12 transform scale-75">
							<Spinner />
						</div>
						<p className="p-4 text-center">{loadingText}</p>
					</div>
				)}

				{success && (
					<div className="absolute z-50 inset-0 flex justify-center items-center pointer-events-none">
						<ConfettiExplosion floorHeight={1600} floorWidth={1600} />
					</div>
				)}

				{/********************************************/}
				{/************* Companion Image **************/}
				{/********************************************/}
				<div
					className={`aspect-1 relative transform-gpu transition-all duration-1000 
					${
						!transacting &&
						`left-0 bg-background-${
							companion
								? colorToKey(companion?.properties.background, colors.background)
								: "red"
						}`
					}
					${transacting && !success && "md:left-1/2 origin-center rounded-2xl overflow-hidden opacity-50"}
					${success && "opacity-100 duration-75 rounded-2xl overflow-hidden "}
					`}
				>
					<div
						className={`h-full w-full transform-gpu transition-transform overflow-hidden max-w-md md:max-w-none mx-auto
						${!transacting && "duration-1000"}
						${transacting && !success && "duration-[60000ms] ease-out scale-50 rounded-xl "}
						${success && "scale-90 rounded-xl "}
						`}
					>
						<div className={`w-full h-full`}>
							<Renderer showTitle={false} companion={companion} hideBackground={false} />
						</div>
					</div>
				</div>
				{/************* /Companion Image *************/}
				{success ? (
					<>
						<h1 className="font-display subpixel-antialiased text-7xl md:text-9xl text-center text-default-white">
							Purchased
						</h1>
						<Button className="bg-ui-black-default text-default-white" onClick={handleClose}>
							Back home
						</Button>
					</>
				) : (
					<>
						{/********************************************/}
						{/************* Mint Information *************/}
						{/********************************************/}
						<div
							className={`flex flex-col gap-4 justify-center items-center relative text-sm transition-opacity duration-1000 ${
								transacting ? "opacity-0 pointer-events-none" : ""
							}`}
						>
							<h1 className="font-display subpixel-antialiased text-9xl text-center text-ui-black-lighter">
								Customize
							</h1>

							<div
								className={`px-8 max-w-xs text-center flex flex-col gap-2 justify-center items-center`}
							>
								{/********************************************/}
								{/*************** Mint: Custom ***************/}
								{/********************************************/}
								{differences.map((diff) => (
									<div key={diff.key}>
										<p>{diff.key}</p>
										<span className="line-through">{diff.prev || "none"}</span> →{" "}
										<span>{diff.curr || "none"}</span>
										<p className={data?.coupon ? "line-through" : ""}>{diff.cost}</p>
									</div>
								))}
							</div>

							<div className="mt-16 w-full sticky bottom-8 flex justify-center">
								<div>
									<Button
										className="text-lg text-white bg-ui-orange-default"
										// disabled={true}
										loading={transacting}
										onClick={() => {
											handleSpend({
												amount: balance,
												onSuccess: () => {
													setCoupon(null);
													setSuccess(true);
												},
											});
										}}
									>
										Purchase
										<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest bg-opacity-20 rounded-full">
											{balance} $COMPANIONSHIP + gas
										</span>
									</Button>
								</div>
							</div>
						</div>
						{/************* /Mint Information ************/}
					</>
				)}
			</div>
			{/*************** /Popup Window **************/}
		</div>
	);
};
