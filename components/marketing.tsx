import Image from "next/image";
import { Faq } from "./faq";

export default function Marketing() {
	return (
		<>
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
			<div className="w-full min-h-full bg-clothing-white rounded-xl shadow-2xl p-0 mt-8 mb-16 max-w-6xl mx-auto items-center overflow-hidden">
				<Faq />
			</div>
		</>
	);
}
