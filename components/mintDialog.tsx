import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { colors } from "../data/colors";
import { colorToKey } from "../data/helpers";
import { Companion } from "../data/types";
import Button from "./button";
import { priceCustomEth, priceEth } from "./contract";
import { Faq } from "./faq";
import Renderer from "./renderer";
import { Spinner } from "./icons/spinner";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import { ConnectButton } from "./connectButton";
import { toast } from "react-toastify";
import useSWR from "swr";
import { fetcher } from "../lib/swr";

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

const EmailForm = ({ onSuccess }: { onSuccess?: () => void }) => {
	const [email, setEmail] = useState("");
	return (
		<div className="flex flex-col gap-4">
			<input
				type="email"
				placeholder="youremail@gmail.com"
				className=""
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			<Button
				onClick={async () => {
					const response = await (
						await fetch("/api/email", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ email }),
						})
					).json();
					if (response.error) {
						toast.error(response.error);
					} else {
						onSuccess?.();
					}
				}}
			>
				Submit
			</Button>
		</div>
	);
};

export const MintDialog = ({
	companion,
	handleMint,
	handleClose,
	handleCustomize,
	handleConnectInjected,
	handleConnectWalletConnect,
	mintTypeState,
	mintQtyState,
	minting,
	saleIsActive,
	account,
	debug,
}: {
	companion: Companion;
	handleMint: ({ onSuccess }: { onSuccess?: () => void }) => void;
	handleClose: () => void;
	handleCustomize: () => void;
	handleConnectInjected: () => void;
	handleConnectWalletConnect: () => void;
	mintTypeState: ["custom" | "random", Dispatch<SetStateAction<"custom" | "random">>];
	mintQtyState: [number, Dispatch<SetStateAction<number>>];
	minting: boolean;
	saleIsActive: boolean;
	account: string;
	debug?: boolean;
}) => {
	const [mintType, setMintType] = mintTypeState;
	const [mintQty, setMintQty] = mintQtyState;
	const [showFaq, setShowFaq] = useState(false);
	const [showEmail, setShowEmail] = useState(false);
	const { data, error } = useSWR("api/getCount", fetcher);

	const bgColorKey = colorToKey(companion.properties.background, colors.background);
	const buttonColor = bgColorKey === "red" || bgColorKey == "orange" ? "yellow" : "red";

	const [loadingText, setLoadingText] = useState("Confirm the transaction with your wallet to continue...");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (!minting) return;
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
	}, [minting]);

	useEffect(() => {
		if (data?.custom >= 888) {
			setMintType("random");
		}
	}, [data]);

	const isSoldOutCustoms = data?.custom >= 887;
	const isSoldOut = data?.total >= 8887;

	return (
		<div className="w-screen h-screen fixed z-50 inset-0 font-mono">
			{debug && (
				<div className="fixed top-0 z-50">
					<div>
						<Button onClick={() => setSuccess((prev) => !prev)}>Toggle success</Button>
					</div>
				</div>
			)}
			<div className="absolute top-4 right-4 left-4 z-20 flex justify-between">
				<div>
					{showFaq && (
						<Button
							className="bg-ui-black-default text-default-white text-xs w-auto md:hidden"
							onClick={() => setShowFaq(false)}
						>
							Back
						</Button>
					)}
				</div>
				<div>
					{!success && (
						<Button
							className={`bg-ui-black-default text-default-white w-8 h-8 pl-0 pr-0 pt-0 pb-0 ${minting ? "opacity-20" : ""}`}
							onClick={minting ? () => {} : handleClose}
						>
							×
						</Button>
					)}
				</div>
			</div>
			<div
				className="inset-0 w-full h-full bg-opacity-95 bg-ui-black-darker cursor-pointer"
				onClick={minting ? () => {} : handleClose}
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
					${minting ? "bg-default-white" : "bg-default-white"}
					${
						success
							? "max-w-screen-sm bg-opacity-0 shadow-none overflow-visible "
							: "max-w-screen-xl shadow-xl overflow-y-scroll md:overflow-y-hidden overflow-x-hidden grid grid-cols-1 md:grid-cols-2 "
					}
					`}
			>
				{saleIsActive ? null : (
					<div className="absolute z-50 inset-0 flex flex-col justify-center items-center bg-default-white bg-opacity-90 backdrop-blur-sm gap-4">
						{showEmail ? (
							<div className="w-full h-full flex justify-center items-center">
								<div className="top-4 left-4 absolute">
									<Button className="bg-ui-black-default text-default-white text-xs w-auto" onClick={() => setShowEmail(false)}>
										Back
									</Button>
								</div>
								<EmailForm
									onSuccess={() => {
										setShowEmail(false);
									}}
								/>
							</div>
						) : (
							<>
								<p className="p-4">Minting will open soon! Stay tuned.</p>
								<div className="flex flex-col md:flex-row gap-4 w-full mx-auto max-w-xl p-4">
									<a
										className="
					relative w-full
					py-2 px-4 rounded-full active:pt-3 active:pb-1
					flex justify-center items-center gap-2
					text-center
					border-2 border-ui-black-default 
					cursor-pointer bg-hair-yellow
					hover:text-ui-black-default hover:no-underline"
										href="#"
										onClick={(e) => {
											setShowEmail(true);
										}}
									>
										Remind me via email
									</a>
									<a
										className="
					relative w-full
					py-2 px-4 rounded-full active:pt-3 active:pb-1
					flex justify-center items-center gap-2
					text-center
					border-2 border-ui-black-default 
					cursor-pointer bg-hair-yellow
					hover:text-ui-black-default hover:no-underline"
										href="https://www.twitter.com/companioninabox"
										target="_blank"
										rel="noopener noreferrer"
									>
										Follow us on Twitter
									</a>
								</div>
							</>
						)}
					</div>
				)}
				{minting && !success && (
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
				{account ? null : (
					<div className="absolute z-50 inset-0 flex flex-col justify-center items-center bg-default-white bg-opacity-80 backdrop-blur gap-4">
						<p>Connect your wallet, first!</p>
						<div>
							<ConnectButton
								account={account}
								handleLogout={() => {}}
								handleConnectInjected={handleConnectInjected}
								handleConnectWalletConnect={handleConnectWalletConnect}
							/>
						</div>
					</div>
				)}

				{/********************************************/}
				{/************* Companion Image **************/}
				{/********************************************/}
				<div
					className={`aspect-1 relative transform-gpu transition-all duration-1000 
					${
						!minting &&
						`left-0 bg-background-${
							companion && mintType === "custom" ? colorToKey(companion?.properties.background, colors.background) : "red"
						}`
					}
					${minting && !success && "md:left-1/2 origin-center rounded-2xl overflow-hidden opacity-50"}
					${success && "opacity-100 duration-75 rounded-2xl overflow-hidden "}
					`}
				>
					<div
						className={`h-full w-full transform-gpu transition-transform overflow-hidden max-w-md md:max-w-none mx-auto
						${!minting && "duration-1000"}
						${minting && !success && "duration-[60000ms] ease-out scale-50 rounded-xl "}
						${success && "scale-90 rounded-xl "}
						`}
					>
						<div className={`w-full h-full ${mintType == "custom" ? "" : "hidden"}`}>
							<Renderer showTitle={false} companion={companion} hideBackground={false} />
							{success ? null : (
								<div className="absolute inset-0 z-40 opacity-0 hover:opacity-100 transition-opacity">
									<div className={`absolute bottom-8 left-1/2 -translate-x-1/2`}>
										<Button className={`text-xs text-white border-transparent bg-ui-black-default`} onClick={handleCustomize}>
											Continue customizing
										</Button>
									</div>
								</div>
							)}
						</div>
						<div className={`h-full w-full aspect-square relative bg-default-red ${mintType == "random" ? "" : "hidden"}`}>
							<Image src="/box.png" alt="box" layout="fill" />
						</div>
					</div>
				</div>
				{/************* /Companion Image *************/}
				{success ? (
					<>
						<h1 className="font-display subpixel-antialiased text-7xl md:text-9xl text-center text-default-white">Minted</h1>
						<Button className="bg-ui-black-default text-default-white" onClick={handleClose}>
							Back home
						</Button>
					</>
				) : (
					<>
						{showFaq ? (
							<>
								{/********************************************/}
								{/******************** FAQ *******************/}
								{/********************************************/}
								<div className="md:overflow-y-scroll relative">
									<div className="top-4 ml-4 hidden md:block sticky">
										<Button className="bg-ui-black-default text-default-white text-xs w-auto" onClick={() => setShowFaq(false)}>
											Back
										</Button>
									</div>
									<Faq />
								</div>

								{/******************** /FAQ ******************/}
							</>
						) : (
							<>
								{/********************************************/}
								{/************* Mint Information *************/}
								{/********************************************/}
								<div
									className={`flex flex-col gap-4 justify-center items-center relative text-sm transition-opacity duration-1000 ${
										minting ? "opacity-0 pointer-events-none" : ""
									}`}
								>
									<h1 className="font-display subpixel-antialiased text-9xl text-center text-ui-black-lighter">Mint</h1>
									<div className="flex rounded-full relative justify-items-stretch text-xs max-w-xs">
										<div className="absolute w-full h-full z-0 rounded-full border-ui-black-lightest bg-ui-black-lightest bg-opacity-10 border-2"></div>
										<Button
											disabled={mintType === "custom"}
											className={
												mintType === "custom"
													? "border-background-red bg-background-red text-white opacity-100"
													: "border-transparent text-ui-black-lightest"
											}
											onClick={() => {
												setMintType("custom");
											}}
										>
											Custom
										</Button>
										<Button
											disabled={mintType === "random"}
											className={
												mintType === "random"
													? "border-background-red bg-background-red text-white opacity-100"
													: "border-transparent text-ui-black-lightest"
											}
											onClick={() => {
												setMintType("random");
											}}
										>
											Random
										</Button>
									</div>
									<div className={`px-8 max-w-xs text-center flex flex-col gap-2 justify-center items-center`}>
										{mintType === "custom" ? 887 - data?.custom : 8887 - data?.total} of{" "}
										{mintType === "custom" ? "888" : "8888"} remain
										{mintType === "custom" ? (
											<>
												{/********************************************/}
												{/*************** Mint: Custom ***************/}
												{/********************************************/}
												<p>Whoa! This customized 1/1 NFT you created looks really dope. </p>
												<p>I just checked and it has a completely arbitrary* rarity score of 67/100.</p>
												<p>
													<a
														className="text-ui-orange-default"
														href="#"
														onClick={(e) => {
															e.preventDefault();
															setShowFaq(true);
														}}
													>
														Still have questions?
													</a>
												</p>
											</>
										) : (
											<>
												{/********************************************/}
												{/*************** Mint: Random ***************/}
												{/********************************************/}
												<p>
													Minting a random companion this way gives you the opportunity to obtain ultra-rare attributes that
													can&apos;t obtained otherwise.{" "}
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
														Still have questions?
													</a>
												</p>
												<div className="flex align-baseline text-xl ">
													<label className="p-2" htmlFor="qty">
														QTY:
													</label>
													<input
														className={`
											bg-transparent text-xl
											w-16 text-center py-2 px-0
											border-0 border-b-4 border-ui-black-lightest 
											outline-ui-orange-default focus:border-ui-orange-default focus:ring-ui-orange-default
											${mintQty > 8 ? "text-default-red" : ""}
										`}
														name="qty"
														type="number"
														min="1"
														max="8"
														value={mintQty}
														onChange={(e) => {
															setMintQty(parseInt(e.target.value));
														}}
														onBlur={(e) => {
															if (parseInt(e.target.value) > 8) {
																setMintQty(8);
															}
														}}
													/>
												</div>
											</>
										)}
									</div>
									<div className="mt-16 w-full sticky bottom-8 flex justify-center">
										<div>
											<Button
												className="text-lg text-white bg-ui-orange-default"
												// disabled={true}
												disabled={isSoldOut || (mintType == "custom" && isSoldOutCustoms) || mintQty > 8 || mintQty < 1}
												loading={minting}
												onClick={() => {
													handleMint({
														onSuccess: () => {
															setSuccess(true);
														},
													});
												}}
											>
												<span>Mint</span>
												<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest bg-opacity-20 rounded-full">
													{mintType === "custom"
														? isSoldOutCustoms
															? "Sold out"
															: priceCustomEth + "Ξ"
														: isSoldOut
														? "Sold out"
														: priceEth * mintQty + "Ξ"}
												</span>
											</Button>
										</div>
									</div>
								</div>
								{/************* /Mint Information ************/}
							</>
						)}
					</>
				)}
			</div>
			{/*************** /Popup Window **************/}
		</div>
	);
};
