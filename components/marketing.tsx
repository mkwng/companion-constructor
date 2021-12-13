import Image from "next/image";
import Button from "./button";
import { Faq } from "./faq";
import { Check } from "./icons/check";

export default function Marketing({
	handleScrollToBottom,
}: {
	handleScrollToBottom: () => void;
}) {
	return (
		<>
			<div
				className={`
				relative
				lg:snap-center w-full mb-20
				max-w-6xl mx-auto 
				bg-ui-black-default text-default-white rounded-3xl shadow-2xl 
				flex flex-col justify-start gap-8 items-start
				overflow-hidden`}
			>
				<div className="w-full aspect-[8/3] md:aspect-[6/1] grid grid-cols-2 md:grid-cols-3 mb-8">
					<div className="relative">
						<Image src="/examples/row1.png" alt="Example companions" layout="fill" />
					</div>
					<div className="relative">
						<Image src="/examples/row2.png" alt="Example companions" layout="fill" />
					</div>
					<div className="relative">
						<Image src="/examples/row3.png" alt="Example companions" layout="fill" />
					</div>
					<div className="relative">
						<Image src="/examples/row4.png" alt="Example companions" layout="fill" />
					</div>
					<div className="relative">
						<Image src="/examples/row5.png" alt="Example companions" layout="fill" />
					</div>
					<div className="relative">
						<Image src="/examples/row6.png" alt="Example companions" layout="fill" />
					</div>
				</div>
				<div className="gap-8 flex flex-col items-start px-4 lg:px-8 mb-20">
					<h1 className="font-display subpixel-antialiased text-6xl md:text-9xl leading-[.8]">
						Get in, everyone. We&apos;re hanging out in{" "}
						<span className="text-ui-orange-default">boxes</span>.
					</h1>
					<div className="flex flex-col md:flex-row gap-2 md:gap-8 text-sm">
						<div className="flex gap-2">
							<Check />
							<p>Trillions of possible combinations</p>
						</div>
						<div className="flex gap-2">
							<Check />
							<p>Not just a face, full body outfits</p>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-4 items-start">
						{/* <div>
							<Button className="border-default-white">View on OpenSea</Button>
						</div> */}
						<div>
							<Button onClick={handleScrollToBottom} className="border-default-white">
								Jump to FAQ
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full min-h-full bg-clothing-white rounded-xl shadow-2xl px-4 lg:px-8 py-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 items-center overflow-hidden">
				<div className="md:col-span-5">
					<a
						href="https://twitter.com/companioninabox"
						target="_blank"
						rel="noopener noreferrer"
						className={`
									inline-block relative w-full
									mb-8 py-2 px-4 rounded-full
									text-center
									border-2 border-clothing-black
								`}
						onClick={() => {}}
					>
						Follow us on Twitter
					</a>
				</div>
				<div className="md:col-span-3 p-4 md:p-8 order-2 md:order-1">
					<h1 className="font-bold mb-2 text-lg lg:text-xl">
						Get in, we&apos;re all hanging out in boxes
					</h1>
					<p className="mb-2">
						Companion-in-a-box is a limited run of NFTs on the Ethereum blockchain. Each NFT is
						an ERC-721 token and is completely and utterly one-of-a-kind.
					</p>
				</div>
				<div className="md:col-span-2 p-4 md:p-8 order-1 md:order-2 relative aspect-w-1 aspect-h-1 force-ratio">
					<Image src="/examples/4.png" alt="placeholder" layout="fill" />
				</div>

				<div className="md:col-span-2 p-4 md:p-8 order-3 relative  aspect-w-1 aspect-h-1 force-ratio">
					<Image src="/examples/3.png" alt="placeholder" layout="fill" />
				</div>
				<div className="md:col-span-3 p-4 md:p-8 order-4">
					<h1 className="font-bold mb-2 text-lg lg:text-xl">Not just another floating head</h1>
					<p className="mb-2">
						Why restrict yourself to just a headshot in your PFP? These companions have it all:
						Full body outfits, facial features, accessories, and more.
					</p>
				</div>

				<div className="md:col-span-3 p-4 md:p-8 order-6 md:order-5">
					<h1 className="font-bold mb-2 text-lg lg:text-xl">Become one with your companion</h1>
					<p className="mb-2">
						Each companion yields $COMPANIONSHIP every day, which you can claim and use to
						customize your companion&apos;s attributes.
					</p>
				</div>
				<div className="md:col-span-2 p-4 md:p-8 order-5 md:order-6 relative force-ratio">
					<Image src="/examples/2.png" alt="placeholder" layout="fill" />
				</div>

				<div className="md:col-span-2 p-4 md:p-8 order-7 relative force-ratio">
					<Image src="/examples/1.png" alt="placeholder" layout="fill" />
				</div>
				<div className="md:col-span-3 p-4 md:p-8 order-8">
					<h1 className="font-bold mb-2 text-lg lg:text-xl">Enter the box universe</h1>
					<p className="mb-2">
						Companion-in-a-box is not just one and done; It&apos;s only the start. Get early
						access to future box-themed launches, including upcoming customization mechanics,
						breeding, and more.
					</p>
				</div>
				<div className="md:col-span-5 order-9">
					<a
						href="https://twitter.com/companioninabox"
						target="_blank"
						rel="noopener noreferrer"
						className={`
									inline-block relative w-full
									mt-8 py-2 px-4 rounded-full
									text-center
									border-2 border-clothing-black
								`}
						onClick={() => {}}
					>
						Follow us on Twitter
					</a>
				</div>
			</div>
			<div className="w-full min-h-[80vh] bg-clothing-white rounded-xl shadow-2xl p-0 my-20 max-w-6xl mx-auto items-center overflow-hidden">
				<Faq />
			</div>
		</>
	);
}
