import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Button from "../../components/button";
import Editor from "../../components/editor";
import Renderer from "../../components/renderer";
import { colors } from "../../data/colors";
import { colorToKey, keysToCompanion } from "../../data/helpers";
import { randomCompanion } from "../../data/random";
import { Companion, RGBColor } from "../../data/types";
import { fetcher } from "../../lib/swr";

const rescale = (minOld: number, maxOld: number, minNew: number, maxNew: number, value: number) => {
	return ((value - minOld) / (maxOld - minOld)) * (maxNew - minNew) + minNew;
};

const Logomark = ({ color }: { color: RGBColor }) => {
	const fillString = `rgb(${color.r},${color.g},${color.b})`;
	return (
		<svg className="max-h-full" width="100%" viewBox="0 0 654 294" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M36.3842 65.54V91.672H32.2482V32.264H36.3842V58.396H68.1562V32.264C68.1562 10.456 56.3122 0.679991 34.3162 0.679991C12.3202 0.679991 0.664203 10.456 0.664203 32.264V91.672C0.664203 113.48 12.3202 123.256 34.3162 123.256C56.3122 123.256 68.1562 113.48 68.1562 91.672V65.54H36.3842ZM108.537 91.672H104.401V32.264H108.537V91.672ZM106.469 0.679991C84.4725 0.679991 72.8165 10.456 72.8165 32.264V91.672C72.8165 113.48 84.4725 123.256 106.469 123.256C128.465 123.256 140.309 113.48 140.309 91.672V32.264C140.309 10.456 128.465 0.679991 106.469 0.679991ZM198.925 2.748L195.541 67.608H192.721L189.337 2.748H145.909V121H177.493L174.297 56.328H177.117L182.945 121H205.317L211.145 56.328H213.965L210.581 121H242.353V2.748H198.925ZM280.489 32.264H284.625V55.2H280.489V32.264ZM284.625 2.748H248.905V121H280.489V84.716H284.625C306.809 84.716 317.149 71.18 317.525 45.424C317.525 44.86 317.525 44.296 317.525 43.732C317.525 17.036 307.185 2.748 284.625 2.748ZM350.237 32.264H354.185V77.572H350.237V32.264ZM350.237 105.02H354.185V121H387.461L379.189 2.748H325.233L316.961 121H350.237V105.02ZM432.165 2.748L439.309 67.608H436.489L425.961 2.748H391.557V121H423.141L416.185 56.328H418.817L428.593 121H463.937V2.748H432.165ZM502.087 121V2.748H470.503V121H502.087ZM543.47 91.672H539.334V32.264H543.47V91.672ZM541.402 0.679991C519.406 0.679991 507.75 10.456 507.75 32.264V91.672C507.75 113.48 519.406 123.256 541.402 123.256C563.398 123.256 575.242 113.48 575.242 91.672V32.264C575.242 10.456 563.398 0.679991 541.402 0.679991ZM621.45 2.748L628.594 67.608H625.774L615.246 2.748H580.842V121H612.426L605.47 56.328H608.102L617.878 121H653.222V2.748H621.45ZM45.6864 291V138.153H4.86245V291H45.6864ZM106.71 138.153L115.944 221.988H112.299L98.6908 138.153H54.2218V291H95.0458L86.0548 207.408H89.4568L102.093 291H147.777V138.153H106.71ZM210.452 218.586V210.81H154.805V218.586H210.452ZM257.339 176.304H262.442V234.867H257.339V176.304ZM257.339 270.345H262.442V291H305.453L294.761 138.153H225.02L214.328 291H257.339V270.345ZM364.937 218.586V210.81H309.29V218.586H364.937ZM418.143 176.304V195.744H412.797V176.304H418.143ZM412.797 253.092V233.652H418.143V253.092H412.797ZM440.985 211.782V208.137C453.135 204.735 457.752 196.23 458.238 177.519C458.238 176.547 458.238 175.575 458.238 174.846C458.238 144.228 444.144 138.153 418.143 138.153H371.973V291H418.143C443.415 291 459.939 285.897 460.668 252.849C460.668 251.877 460.668 250.905 460.668 249.933C460.668 224.661 455.808 215.184 440.985 211.782ZM511.375 253.092H506.029V176.304H511.375V253.092ZM508.702 135.48C480.271 135.48 465.205 148.116 465.205 176.304V253.092C465.205 281.28 480.271 293.916 508.702 293.916C537.133 293.916 552.442 281.28 552.442 253.092V176.304C552.442 148.116 537.133 135.48 508.702 135.48ZM642.092 212.025L653.027 138.153H610.259L605.885 195.744H602.24L597.866 138.153H555.098L565.79 212.025V217.371L555.098 291H597.866L602.24 233.652H605.885L610.259 291H653.027L642.092 217.371V212.025Z"
				fill={fillString}
			/>
		</svg>
	);
};

export default function CompanionDetails() {
	const router = useRouter();
	const [companion, setCompanion] = useState<Companion | null>(null);
	const tokenId = parseInt(Array.isArray(router.query.id) ? router.query.id[0] : router.query.id);
	const { data, error } = useSWR(`/api/companion/${tokenId}?format=keys`, fetcher);
	const scrollableArea = useRef<HTMLDivElement>(null);
	const [y, setY] = useState(0);

	useEffect(() => {
		if (!data?.pose) {
			setCompanion(null);
			return;
		}
		setCompanion(keysToCompanion(data));
	}, [data]);

	const bgColorKey = companion ? colorToKey(companion.properties.background, colors.background) : "orange";
	const typeColor = bgColorKey === "red" || bgColorKey === "orange" ? colors.default.yellow : colors.default.red;

	if (error || !data?.pose || !companion) return <div>failed to load</div>;
	return (
		<>
			<div className={`font-mono h-screen transition-colors bg-background-${companion ? bgColorKey : "orange"}`}>
				<div className="absolute pointer-events-none w-full h-full overflow-hidden">
					<div
						className="w-full h-full absolute flex justify-center items-center transform-gpu p-10"
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
						{companion ? <Renderer showTitle={false} companion={companion} hideBackground={true} maxHeight={true} /> : null}
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
					</div>
				</div>
			</div>
		</>
	);
}
