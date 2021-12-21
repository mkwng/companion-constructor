import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Renderer from "../../../components/renderer";
import { colors } from "../../../data/colors";
import { colorToKey, keysToCompanion } from "../../../data/helpers";
import { Companion, RGBColor } from "../../../data/types";
import { fetcher } from "../../../lib/swr";
import { Check } from "../../../components/icons/check";
import { Web3Provider } from "@ethersproject/providers";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { ConnectButton } from "../../../components/connectButton";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { companionAbi, companionAddress } from "../../../components/contract";
import Button from "../../../components/button";

function getLibrary(provider) {
	const library = new Web3Provider(provider);
	return library;
}

const ConnectorNames = {
	Injected: "injected",
	WalletConnect: "walletconnect",
};
const W3Operations = {
	Connect: "connect",
	Disconnect: "disconnect",
};
const wcConnector = new WalletConnectConnector({
	infuraId: "517bf3874a6848e58f99fa38ccf9fce4",
});
const injected = new InjectedConnector({ supportedChainIds: [1, 4] });

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function WrapperHome() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<CompanionGift />
		</Web3ReactProvider>
	);
}

const rescale = (
	minOld: number,
	maxOld: number,
	minNew: number,
	maxNew: number,
	value: number
) => {
	return ((value - minOld) / (maxOld - minOld)) * (maxNew - minNew) + minNew;
};

const Logomark = ({ color }: { color: RGBColor }) => {
	const fillString = `rgb(${color.r},${color.g},${color.b})`;
	return (
		<svg height="85%" viewBox="0 0 662 564" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M40.7199 334.86V360.992H36.5839V301.584H40.7199V327.716H72.4919V301.584C72.4919 279.776 60.6479 270 38.6519 270C16.6559 270 4.99991 279.776 4.99991 301.584V360.992C4.99991 382.8 16.6559 392.576 38.6519 392.576C60.6479 392.576 72.4919 382.8 72.4919 360.992V334.86H40.7199Z"
				fill={fillString}
			/>
			<path
				d="M112.872 360.992H108.736V301.584H112.872V360.992ZM110.804 270C88.8083 270 77.1523 279.776 77.1523 301.584V360.992C77.1523 382.8 88.8083 392.576 110.804 392.576C132.8 392.576 144.644 382.8 144.644 360.992V301.584C144.644 279.776 132.8 270 110.804 270Z"
				fill={fillString}
			/>
			<path
				d="M203.261 272.068L199.877 336.928H197.057L193.673 272.068H150.245V390.32H181.829L178.633 325.648H181.453L187.281 390.32H209.653L215.481 325.648H218.301L214.917 390.32H246.689V272.068H203.261Z"
				fill={fillString}
			/>
			<path
				d="M284.825 301.584H288.961V324.52H284.825V301.584ZM288.961 272.068H253.241V390.32H284.825V354.036H288.961C311.145 354.036 321.485 340.5 321.861 314.744C321.861 314.18 321.861 313.616 321.861 313.052C321.861 286.356 311.521 272.068 288.961 272.068Z"
				fill={fillString}
			/>
			<path
				d="M354.573 301.584H358.521V346.892H354.573V301.584ZM354.573 374.34H358.521V390.32H391.797L383.525 272.068H329.569L321.297 390.32H354.573V374.34Z"
				fill={fillString}
			/>
			<path
				d="M436.501 272.068L443.645 336.928H440.825L430.297 272.068H395.893V390.32H427.477L420.521 325.648H423.153L432.929 390.32H468.273V272.068H436.501Z"
				fill={fillString}
			/>
			<path d="M506.422 390.32V272.068H474.838V390.32H506.422Z" fill={fillString} />
			<path
				d="M547.806 360.992H543.67V301.584H547.806V360.992ZM545.738 270C523.742 270 512.086 279.776 512.086 301.584V360.992C512.086 382.8 523.742 392.576 545.738 392.576C567.734 392.576 579.578 382.8 579.578 360.992V301.584C579.578 279.776 567.734 270 545.738 270Z"
				fill={fillString}
			/>
			<path
				d="M625.786 272.068L632.93 336.928H630.11L619.582 272.068H585.178V390.32H616.762L609.806 325.648H612.438L622.214 390.32H657.558V272.068H625.786Z"
				fill={fillString}
			/>
			<path d="M50.0222 560.32V407.473H9.19815V560.32H50.0222Z" fill={fillString} />
			<path
				d="M111.046 407.473L120.28 491.308H116.635L103.027 407.473H58.5575V560.32H99.3815L90.3905 476.728H93.7925L106.429 560.32H152.113V407.473H111.046Z"
				fill={fillString}
			/>
			<path d="M214.788 487.906V480.13H159.141V487.906H214.788Z" fill={fillString} />
			<path
				d="M261.675 445.624H266.778V504.187H261.675V445.624ZM261.675 539.665H266.778V560.32H309.789L299.097 407.473H229.356L218.664 560.32H261.675V539.665Z"
				fill={fillString}
			/>
			<path d="M369.273 487.906V480.13H313.626V487.906H369.273Z" fill={fillString} />
			<path
				d="M422.478 445.624V465.064H417.132V445.624H422.478ZM417.132 522.412V502.972H422.478V522.412H417.132ZM445.32 481.102V477.457C457.47 474.055 462.087 465.55 462.573 446.839C462.573 445.867 462.573 444.895 462.573 444.166C462.573 413.548 448.479 407.473 422.478 407.473H376.309V560.32H422.478C447.75 560.32 464.275 555.217 465.004 522.169C465.004 521.197 465.004 520.225 465.004 519.253C465.004 493.981 460.143 484.504 445.32 481.102Z"
				fill={fillString}
			/>
			<path
				d="M515.711 522.412H510.365V445.624H515.711V522.412ZM513.038 404.8C484.607 404.8 469.541 417.436 469.541 445.624V522.412C469.541 550.6 484.607 563.236 513.038 563.236C541.469 563.236 556.778 550.6 556.778 522.412V445.624C556.778 417.436 541.469 404.8 513.038 404.8Z"
				fill={fillString}
			/>
			<path
				d="M646.428 481.345L657.363 407.473H614.595L610.221 465.064H606.576L602.202 407.473H559.434L570.126 481.345V486.691L559.434 560.32H602.202L606.576 502.972H610.221L614.595 560.32H657.363L646.428 486.691V481.345Z"
				fill={fillString}
			/>
			<path
				d="M134.802 32.6642C110.898 32.6642 92.2208 50.7264 92.2208 74.9064C92.2208 99.0864 110.426 116.994 134.802 116.994C159.177 116.994 177.699 98.7773 177.699 74.7518C177.699 50.8809 159.494 32.6642 134.802 32.6642ZM134.963 99.568C121.351 99.568 111.376 89.0446 111.376 74.9123C111.376 60.6195 121.189 50.1021 134.802 50.1021C148.575 50.1021 158.544 60.7801 158.544 74.9123C158.544 89.0446 148.575 99.568 134.963 99.568ZM182.919 51.0415H194.794V115.43H213.787V34.2338H182.919V51.0415ZM44.4195 50.0961C54.3943 50.0961 62.3084 56.2199 65.3128 65.3283H85.4176C81.7741 45.8571 65.6294 32.6642 44.5808 32.6642C20.6772 32.6642 1.99991 50.7264 1.99991 74.9123C1.99991 99.0983 20.2053 117 44.5808 117C65.1575 117 81.6188 103.807 85.2623 84.1753H65.3128C62.4637 93.2837 54.5496 99.568 44.5748 99.568C30.8013 99.568 21.1491 89.0446 21.1491 74.9123C21.155 60.6195 30.652 50.0961 44.4195 50.0961ZM543.815 67.0584L529.886 65.0192C523.238 64.0798 518.49 61.88 518.49 56.6956C518.49 51.0415 524.666 48.2174 533.052 48.2174C542.232 48.2174 548.091 52.1414 549.358 58.5803H567.718C565.658 42.2482 552.995 32.6701 533.529 32.6701C513.425 32.6701 500.129 42.8784 500.129 57.3258C500.129 71.1429 508.837 79.1574 526.404 81.6664L540.333 83.7056C547.142 84.645 550.94 87.3205 550.94 92.3443C550.94 98.7832 544.293 101.453 535.112 101.453C523.871 101.453 517.54 96.8985 516.59 89.9899H497.913C499.657 105.852 512.158 117 534.951 117C555.689 117 569.457 107.577 569.457 91.399C569.457 76.9516 559.488 69.4128 543.815 67.0584ZM204.291 0.784796C197.326 0.784796 192.1 5.80868 192.1 12.7173C192.1 19.6258 197.32 24.6497 204.291 24.6497C211.255 24.6497 216.481 19.6258 216.481 12.7173C216.481 5.80868 211.255 0.784796 204.291 0.784796ZM483.034 62.0346C483.034 44.448 472.271 32.6701 449.479 32.6701C427.952 32.6701 415.923 43.5086 413.546 60.1558H432.384C433.334 53.7169 438.399 48.3779 449.162 48.3779C458.82 48.3779 463.569 52.617 463.569 57.8014C463.569 64.5554 454.86 66.2796 444.097 67.3795C429.535 68.9491 411.491 73.973 411.491 92.82C411.491 107.428 422.415 116.845 439.826 116.845C453.439 116.845 461.986 111.191 466.263 102.238C466.896 110.246 472.91 115.43 481.302 115.43H492.382V98.6286H483.04V62.0346H483.034ZM464.357 82.4511C464.357 93.2896 454.86 101.298 443.303 101.298C436.177 101.298 430.162 98.3135 430.162 92.0352C430.162 84.0267 439.82 81.8269 448.684 80.8875C457.231 80.1027 461.98 78.218 464.357 74.6032V82.4511ZM363.528 32.6642C352.921 32.6642 344.057 37.0638 337.725 44.442V0H318.732V115.43H337.409V104.752C343.74 112.446 352.765 117 363.528 117C386.321 117 403.577 99.0983 403.577 74.9123C403.577 50.7264 386.004 32.6642 363.528 32.6642ZM360.679 99.568C347.067 99.568 337.092 89.0446 337.092 74.9123C337.092 60.7801 347.222 50.1021 360.835 50.1021C374.608 50.1021 384.26 60.6255 384.26 74.9123C384.26 89.0446 374.292 99.568 360.679 99.568ZM273.302 32.6642C260.956 32.6642 252.88 37.688 248.132 44.7572V34.2338H229.293V115.424H248.287V71.2975C248.287 58.8894 256.201 50.0961 267.914 50.0961C278.838 50.0961 285.642 57.7895 285.642 68.9431V115.43H304.635V67.5341C304.641 47.1115 294.039 32.6642 273.302 32.6642ZM660 72.2429C660 49.0022 642.905 32.6701 619.952 32.6701C595.576 32.6701 577.687 50.8869 577.687 74.9123C577.687 100.198 596.842 117 620.268 117C640.056 117 655.568 105.377 659.522 88.89H639.734C636.885 96.1137 629.92 100.198 620.579 100.198C608.388 100.198 599.208 92.6594 597.153 79.4665H659.994V72.2429H660ZM598.264 65.9585C601.274 54.6503 609.822 49.1568 619.635 49.1568C630.398 49.1568 638.629 55.2806 640.528 65.9585H598.264Z"
				fill={fillString}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0.998748 239.841C1.46341 243.122 4.49977 245.405 7.78078 244.941L655.944 153.156C659.225 152.691 661.508 149.655 661.043 146.374C660.579 143.093 657.542 140.81 654.261 141.274L6.09822 233.059C2.81727 233.524 0.534148 236.56 0.998748 239.841Z"
				fill={fillString}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M661.001 239.841C660.536 243.122 657.5 245.405 654.219 244.941L6.05598 153.156C2.77501 152.691 0.491896 149.655 0.956508 146.374C1.42112 143.093 4.45752 140.81 7.73849 141.274L655.902 233.059C659.183 233.524 661.466 236.56 661.001 239.841Z"
				fill={fillString}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M445.531 144.888C444.246 141.833 440.728 140.399 437.673 141.684L219.51 233.469C216.456 234.754 215.022 238.272 216.307 241.326C217.592 244.381 221.109 245.815 224.164 244.53L442.327 152.745C445.381 151.46 446.816 147.942 445.531 144.888Z"
				fill={fillString}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M216.306 144.888C217.591 141.833 221.109 140.399 224.163 141.684L442.326 233.469C445.381 234.754 446.815 238.272 445.53 241.326C444.245 244.381 440.727 245.815 437.673 244.53L219.51 152.745C216.455 151.46 215.021 147.942 216.306 144.888Z"
				fill={fillString}
			/>
		</svg>
	);
};

function CompanionGift() {
	const router = useRouter();
	const [companion, setCompanion] = useState<Companion | null>(null);
	const tokenId = parseInt(
		Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
	);
	const { data, error } = useSWR(`/api/companion/${tokenId}?format=keys`, fetcher);
	const scrollableArea = useRef<HTMLDivElement>(null);
	const [y, setY] = useState(0);
	const [owned, setOwned] = useState<boolean | null>(null);

	const web3React = useWeb3React();
	const [web3, setWeb3] = useState<Web3>(null);
	const [loaded, setLoaded] = useState(false);
	const [companionContract, setCompanionContract] = useState<Contract>(null);
	const [latestOp, setLatestOp] = useLocalStorage("latest_op", "");
	const [latestConnector, setLatestConnector] = useLocalStorage("latest_connector", "");

	useEffect(() => {
		if (web3React.active) {
			let w3 = new Web3(web3React.library.provider);
			setWeb3(w3);
			setCompanionContract(new w3.eth.Contract(companionAbi, companionAddress));
		} else {
			setCompanionContract(null);
			setOwned(null);
		}
	}, [web3React.active]);
	useEffect(() => {
		if (latestOp == "connect" && latestConnector == "injected") {
			injected
				.isAuthorized()
				.then((isAuthorized) => {
					setLoaded(true);
					if (isAuthorized && !web3React.active && !web3React.error) {
						web3React.activate(injected);
					}
				})
				.catch(() => {
					setLoaded(true);
				});
		} else if (latestOp == "connect" && latestConnector == "walletconnect") {
			web3React.activate(wcConnector);
		}
	}, []);

	const handleConnectInjected = () => {
		setLatestConnector(ConnectorNames.Injected);
		setLatestOp(W3Operations.Connect);
		web3React.activate(injected);
	};
	const handleConnectWalletConnect = () => {
		setLatestConnector(ConnectorNames.WalletConnect);
		setLatestOp(W3Operations.Connect);
		web3React.activate(wcConnector);
	};
	const handleSignOut = () => {
		setLatestOp(W3Operations.Disconnect);
		web3React.deactivate();
	};

	const isOwner = async () => {
		console.log(!isNaN(companion?.tokenId));
		if (companionContract && !isNaN(companion?.tokenId)) {
			const ownerOf = await companionContract.methods.ownerOf(companion.tokenId).call();
			return ownerOf === web3React.account;
		}
	};
	useEffect(() => {
		console.log("Hello");
		isOwner().then((result) => {
			console.log(result);
			setOwned(result);
		});
	}, [companionContract, web3React.account]);

	useEffect(() => {
		if (!data?.pose) {
			setCompanion(null);
			return;
		}
		setCompanion(keysToCompanion(data));
	}, [data]);

	const bgColorKey = companion
		? colorToKey(companion.properties.background, colors.background)
		: "orange";
	const typeColor =
		bgColorKey === "red" || bgColorKey === "orange"
			? colors.default.yellow
			: colors.default.red;

	if (!tokenId || tokenId < 25 || tokenId > 144) {
		return <div>Invalid ID</div>;
	}

	return (
		<>
			<div
				className={`font-mono h-screen transition-colors bg-background-${
					companion ? bgColorKey : "orange"
				}`}
			>
				<div className="absolute pointer-events-none w-full h-full overflow-hidden">
					<div
						className="w-full h-full absolute flex justify-center items-center transform-gpu"
						style={{
							// @ts-ignore
							"--tw-scale-x": rescale(0, 1, 0.75, 1, 1 - y) + "",
							"--tw-scale-y": rescale(0, 1, 0.75, 1, 1 - y) + "",
							transform: "var(--tw-transform)",
						}}
					>
						<Logomark color={typeColor} />
					</div>
					<div
						className={`
							fixed z-0 flex justify-center 
							w-screen left-0 h-full
							overflow-visible transform-gpu scale-50
						`}
						style={{
							top: `${1600 * 0.5 - Math.min(1, rescale(0, 0.25, 0.75, 1, y)) * (1600 * 0.5)}px`,
							// @ts-ignore
							"--tw-scale-x": Math.min(1, rescale(0, 0.25, 0.75, 1, y)) + "",
							"--tw-scale-y": Math.min(1, rescale(0, 0.25, 0.75, 1, y)) + "",
							transform: "var(--tw-transform)",
						}}
					>
						{companion ? (
							<Renderer
								showTitle={false}
								companion={companion}
								hideBackground={true}
								maxHeight={true}
							/>
						) : null}
						<div
							className="mt-12 absolute z-20 aspect-square w-full max-h-2/3-screen"
							style={{
								top: `calc(33% + ${Math.min(
									scrollableArea?.current?.offsetHeight,
									y * 4 * scrollableArea?.current?.offsetHeight
								)}px)`,
							}}
						>
							<div
								className="absolute top-6 left-6 origin-bottom-left h-5 w-1/2 transform-gpu -translate-y-5"
								style={{
									// @ts-ignore
									"--tw-rotate": rescale(0, 0.25, -60, -180, y) + "deg",
									transform: "var(--tw-transform)",
								}}
							>
								<div className="relative w-full h-full">
									<Image src="/lid.png" alt="lid" layout="fill" />
								</div>
							</div>
							<div
								className="absolute top-6 right-6 origin-bottom-right h-5 w-1/2 transform-gpu -translate-y-5"
								style={{
									// @ts-ignore
									"--tw-rotate": rescale(0, 0.25, 60, 180, y) + "deg",
									transform: "var(--tw-transform)",
								}}
							>
								<div className="relative w-full h-full">
									<Image src="/lid.png" alt="lid" layout="fill" />
								</div>
							</div>
							<div className="relative w-full h-full">
								<Image src="/box.png" alt="box" layout="fill" />
							</div>
						</div>
					</div>
				</div>
				<div
					ref={scrollableArea}
					onScroll={() => {
						setY(
							scrollableArea?.current?.scrollTop /
								(scrollableArea?.current?.scrollHeight - scrollableArea?.current?.offsetHeight)
						);
					}}
					className="scroll-smooth lg:snap-y lg:snap-proximity absolute inset-0 w-screen h-screen overflow-x-hidden overflow-y-scroll"
				>
					<div className=" snap-y min-h-screen">&nbsp;</div>
					<div className="min-h-screen">
						<div className=" h-96">&nbsp;</div>
						<div className="flex flex-col gap-4 md:gap-8 pb-20">
							<div
								className={`
								relative
								lg:snap-center w-full
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
										Whoa! You were just gifted an{" "}
										<span className="text-ui-orange-default">NFT</span>.
									</h1>
									<div className="flex flex-col md:flex-row gap-2 md:gap-8 text-sm">
										<div className="flex gap-2">
											<Check />
											<p>
												{companion?.name
													? "1/1 created just for " + companion.name
													: "Automatically generated with love"}
												.
											</p>
										</div>
										<div className="flex gap-2">
											<Check />
											<p>100% customizable, just log in below</p>
										</div>
									</div>
									<div className="flex flex-col md:flex-row gap-4 items-start">
										<div>
											<Button
												className="border-default-white"
												onClick={() => {
													window.location.href = `https://opensea.com/${companionContract}/${tokenId}`;
												}}
											>
												View on OpenSea
											</Button>
										</div>
										<div>
											<ConnectButton
												loginMessage="Check to see if you're the owner"
												className="border-default-white"
												account={web3React.account}
												handleLogout={handleSignOut}
												handleConnectInjected={handleConnectInjected}
												handleConnectWalletConnect={handleConnectWalletConnect}
											/>
										</div>
									</div>

									<div className="text-default-yellow">
										{owned === true ? (
											<>
												Congratulations! You are the owner. Use this{" "}
												<a className="underline" href={`/?coupon=coinbase${companion.tokenId}`}>
													special one-time link
												</a>{" "}
												to customize your companion cost-free.
											</>
										) : null}
										{owned === false ? (
											<>
												Reach out to{" "}
												<a className="underline" href="mailto:katie.ett@coinbase.com">
													katie.ett@coinbase.com
												</a>{" "}
												to learn how to redeem your NFT.
											</>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
