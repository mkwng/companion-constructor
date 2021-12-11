import { useState } from "react";
import { colors } from "../data/colors";
import { colorToKey } from "../data/helpers";
import { Companion } from "../data/types";
import Button from "./button";
import { priceCustomEth, priceEth } from "./contract";
import { Faq } from "./faq";
import Renderer from "./renderer";

export const MintDialog = ({
	companion,
	handleClose,
}: {
	companion: Companion;
	handleClose: () => void;
}) => {
	const [activeSection, setActiveSection] = useState<"custom" | "random">("custom");
	const [showFaq, setShowFaq] = useState(false);
	const [randomQty, setRandomQty] = useState(1);

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
						activeSection == "custom"
							? "bg-background-" +
							  colorToKey(companion.properties.background, colors.background)
							: ""
					}`}
				>
					<div className={`${activeSection == "custom" ? "" : "hidden"}`}>
						<Renderer showTitle={false} companion={companion} hideBackground={false} />
					</div>
					<div
						className={`h-full w-full bg-ui-black-lightest flex justify-center items-center ${
							activeSection == "random" ? "" : "hidden"
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
								disabled={activeSection === "custom"}
								className={
									activeSection === "custom"
										? "border-background-red bg-background-red text-white opacity-100"
										: "border-transparent text-ui-black-lightest"
								}
								onClick={() => {
									setActiveSection("custom");
								}}
							>
								Custom
							</Button>
							<Button
								disabled={activeSection === "random"}
								className={
									activeSection === "random"
										? "border-background-red bg-background-red text-white opacity-100"
										: "border-transparent text-ui-black-lightest"
								}
								onClick={() => {
									setActiveSection("random");
								}}
							>
								Random
							</Button>
						</div>
						<div className="px-8 max-w-xs text-center flex flex-col gap-2 justify-center items-center">
							{activeSection === "custom" ? (
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
											Wait, I have a question...
										</a>
									</p>
									<div className="mt-16 w-full sticky bottom-8">
										<Button
											className="text-lg text-white bg-ui-orange-default"
											disabled={randomQty > 8 || randomQty < 1}
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
											Wait, I have a question...
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
											${randomQty > 8 ? "text-default-red" : ""}
										`}
											name="qty"
											type="number"
											min="1"
											max="8"
											value={randomQty}
											onChange={(e) => {
												setRandomQty(parseInt(e.target.value));
											}}
											onBlur={(e) => {
												if (parseInt(e.target.value) > 8) {
													setRandomQty(8);
												}
											}}
										/>
									</div>
									<div className="mt-16 w-full sticky bottom-8">
										<Button
											className="text-lg text-white bg-ui-orange-default"
											disabled={randomQty > 8 || randomQty < 1}
										>
											<span>Mint</span>
											<span className="text-md px-2 py-0.5 text-white bg-ui-black-lightest bg-opacity-20 rounded-full">
												{priceEth * randomQty}Ξ
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
