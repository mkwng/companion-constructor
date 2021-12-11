import { Dispatch, SetStateAction, useState } from "react";
import { colors } from "../data/colors";
import { colorToKey } from "../data/helpers";
import { Companion } from "../data/types";
import Button from "./button";
import { priceCustomEth, priceEth } from "./contract";
import { Faq } from "./faq";
import Renderer from "./renderer";

export const MintDialog = ({
	companion,
	handleMint,
	handleClose,
	mintTypeState,
	mintQtyState,
	minting,
}: {
	companion: Companion;
	handleMint: () => void;
	handleClose: () => void;
	mintTypeState: ["custom" | "random", Dispatch<SetStateAction<"custom" | "random">>];
	mintQtyState: [number, Dispatch<SetStateAction<number>>];
	minting: boolean;
}) => {
	const [mintType, setMintType] = mintTypeState;
	const [mintQty, setMintQty] = mintQtyState;
	const [showFaq, setShowFaq] = useState(false);

	return (
		<div className="w-screen h-screen fixed z-50 inset-0 font-mono">
			<div
				className="inset-0 w-full h-full bg-opacity-90 bg-ui-black-default cursor-pointer"
				onClick={handleClose}
			>
				&nbsp;
			</div>
			<div className="w-full max-w-screen-xl max-h-screen overflow-y-scroll md:overflow-y-hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-default-white grid grid-cols-1 md:grid-cols-2 overflow-hidden md:aspect-[2/1]">
				<div
					className={`aspect-1 relative ${
						mintType == "custom"
							? "bg-background-" +
							  colorToKey(companion.properties.background, colors.background)
							: ""
					}`}
				>
					<div className={`${mintType == "custom" ? "" : "hidden"}`}>
						<Renderer showTitle={false} companion={companion} hideBackground={false} />
					</div>
					<div
						className={`h-full w-full bg-ui-black-lightest flex justify-center items-center ${
							mintType == "random" ? "" : "hidden"
						}`}
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
						<Faq />
					</div>
				) : (
					<div className="flex flex-col gap-4 justify-center items-center relative text-sm">
						<div className="absolute top-4 right-4">
							<Button className="w-8 h-8 pl-0 pr-0 pt-0 pb-0" onClick={handleClose}>
								×
							</Button>
						</div>
						<h1 className="font-display text-9xl text-center text-ui-black-lighter">Mint</h1>

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
						<div className="px-8 max-w-xs text-center flex flex-col gap-2 justify-center items-center">
							{mintType === "custom" ? (
								<>
									<p>Whoa! This customized 1/1 NFT you created looks really dope. </p>
									<p>
										I just checked and it has a completely arbitrary* rarity score of 67/100.
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
									<div className="mt-16 w-full sticky bottom-8">
										<Button
											className="text-lg text-white bg-ui-orange-default"
											disabled={mintQty > 8 || mintQty < 1}
											loading={minting}
											onClick={handleMint}
										>
											<span>Mint</span>
											<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest bg-opacity-20 rounded-full">
												{priceCustomEth}Ξ
											</span>
										</Button>
									</div>
								</>
							) : (
								<>
									<p>
										Minting a random companion this way gives you the opportunity to obtain
										ultra-rare attributes that can&apos;t obtained otherwise.{" "}
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
									<div className="mt-16 w-full sticky bottom-8">
										<Button
											className="text-lg text-white bg-ui-orange-default"
											disabled={mintQty > 8 || mintQty < 1}
											loading={minting}
											onClick={handleMint}
										>
											<span>Mint</span>
											<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest bg-opacity-20 rounded-full">
												{priceEth * mintQty}Ξ
											</span>
										</Button>
									</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
