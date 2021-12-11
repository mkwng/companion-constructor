import { useState } from "react";
import Button from "./button";

const Question = ({ q, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div
			className="border-t last:border-b border-ui-black-lightest hover:bg-white bg-opacity-25 cursor-pointer px-8 py-4"
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<div className="flex gap-4">
				<h2 className="font-bold flex-grow">{q}</h2>
				<div>{isOpen ? "-" : "+"}</div>
			</div>
			{isOpen && (
				<div className="text-sm mt-4 mb-3 gap-3 flex flex-col"> {props.children} </div>
			)}
		</div>
	);
};

export const Faq = ({ section }: { section?: "general" | "customizing" | "staking" }) => {
	const [currentSection, setCurrentSection] = useState<"general" | "customizing" | "staking">(
		section || "general"
	);
	return (
		<>
			<h1 className="p-8 font-display text-9xl mx-auto text-center text-ui-black-lighter">
				FAQ
			</h1>
			<div className="flex rounded-full justify-items-stretch text-xs max-w-xs mx-auto mb-8 sticky top-4 z-10">
				<div className="absolute w-full h-full z-0 rounded-full border-ui-black-lightest bg-ui-black-lightest bg-opacity-10 border-2"></div>
				<Button
					disabled={currentSection === "general"}
					className={
						currentSection === "general"
							? "border-background-red bg-background-red text-white opacity-100"
							: "border-transparent text-ui-black-lightest"
					}
					onClick={() => {
						setCurrentSection("general");
					}}
				>
					General
				</Button>
				<Button
					disabled={currentSection === "customizing"}
					className={
						currentSection === "customizing"
							? "border-background-red bg-background-red text-white opacity-100"
							: "border-transparent text-ui-black-lightest"
					}
					onClick={() => {
						setCurrentSection("customizing");
					}}
				>
					Companions
				</Button>
				<Button
					disabled={currentSection === "staking"}
					className={
						currentSection === "staking"
							? "border-background-red bg-background-red text-white opacity-100"
							: "border-transparent text-ui-black-lightest"
					}
					onClick={() => {
						setCurrentSection("staking");
					}}
				>
					Staking
				</Button>
			</div>
			{currentSection === "general" && (
				<>
					<Question q="Do you mind if I just screenshot my companion and use it as my profile pic?">
						<p>
							The playground is provided for free for your enjoyment if you agree to the
							license.{" "}
						</p>

						<p>
							Here’s the license: Don’t sue us + don’t get us in trouble. If you agree with
							these terms, screenshot away! Tag us on{" "}
							<a
								href="https://twitter.com/companioninabox"
								target="_blank"
								rel="noopener noreferrer"
							>
								Twitter
							</a>
							, we’d love to see your creations.
						</p>
					</Question>
					<Question q="Why would I mint/pay for it?">
						<p>
							That’s the big question with NFTs in general. It’s further complicated because
							with the playground, you can already generate completely unique and custom images
							that no one else has. There’s a couple ways to think about this that make sense to
							me.{" "}
						</p>

						<p>
							First, you’d be supporting the creator and artist. A ton of late nights went into
							this passion project hoping that it would be something that others like you might
							value.
						</p>

						<p>
							Second, you can think of this as like an avatar or object for your metaverse
							inventory. NFTs are an open system that anyone can build on top of. In the future,
							platforms such as Twitter will allow you to display objects you own. Future video
							games will be built to account for truly portable customization with NFTs.
						</p>

						<p>
							Finally, once all companions are sold out, a portion of the proceeds from the sale
							as well as secondary market income will be received into a DAO with the purpose of
							contributing to charities that the community votes for.
						</p>

						<p>
							Some may claim that NFTs are a speculative vehicle you can invest in. This is not
							financial advice, but please do not purchase Companion-in-a-box with the
							expectation to turn a profit.
						</p>
					</Question>

					<Question q="Where’s the roadmap?">
						<p>
							Oh we have ambitions, trust us. That said, we don’t believe in weightless
							promises. How many NFT projects overpromise and underdeliver? Too many.{" "}
						</p>

						<p>
							But what we do believe in is day 1 functionality. Complete customization, wallet
							management, staking, and sharing capabilities are available the same day that
							minting opens.
						</p>

						<p>
							We hope that this display of competence establishes our credibility and ability to
							deliver future functionality.
						</p>
					</Question>
					<Question q="Discord?">
						<p>
							No discord, only harmony. Vibe with us, in the comfort of your very own box, away
							from the noise.{" "}
						</p>

						<p>
							Got questions? Hit us up on{" "}
							<a
								href="https://twitter.com/companioninabox"
								target="_blank"
								rel="noopener noreferrer"
							>
								Twitter
							</a>
							.
						</p>
					</Question>
					<Question q="Who’s behind Companion-in-a-Box?">
						<p>
							Oh I’m completely doxxed. The Companion-in-a-Box NFT contract, web application
							(what you’re looking at!), and all associated artwork was designed, illustrated,
							developed and deployed by{" "}
							<a href="https://twitter.com/mkwng" target="_blank" rel="noopener noreferrer">
								@mkwng
							</a>
							, a digital creator living in California with his wife, son, and dog.
						</p>
					</Question>
				</>
			)}
			{currentSection === "customizing" && (
				<>
					<Question q="Why are some attributes marked with ???">
						<p>
							Some ultra-rare attributes aren’t available in the playground and can only be
							obtained by minting randomly! Can’t wait for you all to unbox them.
						</p>
					</Question>
					<Question q="Can I change my companion after I purchase?">
						<p>
							Yes! After minting your companion, attributes can be customized in exchange for
							$COMPANIONSHIP.
						</p>
					</Question>
					<Question q="Are the companions stored completely on-chain?">
						<p>
							No, to keep gas prices low and enable customization mechanics, companion metadata
							is by necessity delivered via Vercel’s serverless infrastructure, the same
							infrastructure trusted by McDonald’s, Facebook, The Washington Post, among others.
						</p>

						<p>
							Implicit in your purchase is a 10-year guarantee of 99% availability. Funds raised
							from the mint will be used to cover any potential server and maintenance costs. We
							have every intention to keep this online forever.
						</p>

						<p>
							If anything changes at a future date past the 10-year mark, functionality exists
							to freeze all metadata and move onto IPFS. Rest assured, your companion will last
							as long as the internet.
						</p>
					</Question>
				</>
			)}
			{currentSection === "staking" && (
				<>
					<Question q="How do I get $COMPANIONSHIP to customize my companion?">
						<p>
							$COMPANIONSHIP is a “utility token,” a totally fake and value-less currency you
							can earn by “staking” your companion. Staking is the process where you put your
							companion out to pasture, and they generate a little bit of income for you while
							they’re out there.
						</p>

						<p>
							At any point, you can call them back home and put them back the box, along with
							any $COMPANIONSHIP they earned.
						</p>

						<p>
							It’s kind of confusing, I know! It helped me to understand better when I realized
							the creator (me!) benefits because it incentivizes fans to acquire multiple
							companions to generate more $COMPANIONSHIP, among other reasons. Increased demand,
							decreased supply, get it?
						</p>
					</Question>
					<Question q="What else can I do with $COMPANIONSHIP?">
						<p>
							This is getting to the really interesting part. Once all companions are sold out,
							a portion of the profit from the sales and secondary market sales will be received
							into a charitable DAO. Each $COMPANIONSHIP you earn gives you a vote in how to use
							those funds.
						</p>

						<p>
							We’ll all be able to make proposals of charities to fund, and as a token holder
							you can vote to accept or reject proposals.
						</p>
					</Question>
				</>
			)}
		</>
	);
};
