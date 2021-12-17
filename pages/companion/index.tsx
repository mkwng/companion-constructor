import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../../components/button";
import Editor from "../../components/editor";
import Renderer from "../../components/renderer";
import { colors } from "../../data/colors";
import { colorToKey, keysToCompanion } from "../../data/helpers";
import { randomCompanion } from "../../data/random";
import { Companion } from "../../data/types";
import { fetcher } from "../../lib/swr";

export default function CompanionDetails() {
	const router = useRouter();
	const [companion, setCompanion] = useState<Companion | null>(null);
	const [companionUnedited, setCompanionUnedited] = useState<Companion | null>(null);
	const [tokenId, setTokenId] = useState<number | null>(25);
	const { data, error } = useSWR(`/api/companion/${tokenId}?format=keys`, fetcher);
	const [name, setName] = useState("");
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setCompanionUnedited(null);
		if (!data?.pose) {
			setCompanion(null);
			setName("");
		} else {
			const dataCom = keysToCompanion(data);
			setCompanion(dataCom);
			setName(dataCom.name || "");
		}
	}, [data]);

	const handleSave = async () => {
		setSaving(true);
		const result = await fetch(`/api/companion/admin/${tokenId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				companion,
			}),
		});
		setSaving(false);
	};

	return (
		<div className="bg-ui-black-darker grid grid-cols-5 font-mono text-sm">
			<div className="col-span-3 h-screen">
				<div
					className={`w-full h-full font-mono transition-colors bg-background-${
						companion ? colorToKey(companion?.properties.background, colors.background) : "sand"
					}`}
				>
					{companion ? (
						<div className="w-full h-full flex justify-center relative">
							<Renderer companion={companion} />
							<div className="absolute top-4 left-4">
								<Button
									onClick={() => {
										if (confirm("Are you sure? This will reset every attribute.")) {
											const random = randomCompanion();
											setCompanionUnedited(random);
											setCompanion(random);
										}
									}}
								>
									Random
								</Button>
							</div>
						</div>
					) : (
						<div className="w-full h-full flex justify-center items-center relative p-8">
							<Button
								onClick={() => {
									const random = randomCompanion();
									setCompanionUnedited(random);
									setCompanion(random);
								}}
							>
								Random
							</Button>
						</div>
					)}
				</div>
			</div>
			<div className="col-span-2 h-screen relative flex flex-col max-h-screen">
				<div className="fixed bottom-4 mx-2 text-lg right-4 left-[60%] pl-4 z-50">
					{router.query.admin === "true" ? (
						<Button
							onClick={() => {
								handleSave();
							}}
							loading={saving}
							disabled={!companionUnedited}
							className="text-default-white bg-default-red "
						>
							Save
						</Button>
					) : null}
				</div>
				<div className="flex m-4 gap-4 z-10 bg-ui-black-darker">
					<div>
						<Button
							className="border-ui-black-lightest text-default-white"
							disabled={tokenId <= 25 || saving}
							onClick={() => setTokenId((prev) => prev - 1)}
						>
							← Prev
						</Button>
					</div>
					<div className="grow relative">
						<span className="absolute text-ui-black-lightest opacity-50 left-2 z-10 h-full flex items-center">
							#{tokenId}
						</span>
						<input
							className="w-full pl-12 h-full"
							type="text"
							disabled={!companion || saving}
							value={name}
							onChange={(e) => setName(e.target.value)}
							onBlur={() => {
								if (!companionUnedited) {
									setCompanionUnedited(companion);
								}
								setCompanion((prev) => {
									return { ...prev, name: name };
								});
							}}
						/>
					</div>
					<div>
						<Button
							className="border-ui-black-lightest text-default-white"
							disabled={tokenId >= 175 || saving}
							onClick={() => setTokenId((prev) => prev + 1)}
						>
							Next →
						</Button>
					</div>
				</div>
				<div className="bg-ui-black-default text-default-white max-h-[calc(100vh-144px)] overflow-y-scroll">
					{companion ? (
						<div>
							<Editor
								showRare={router.query.admin === "true"}
								companionState={[companion, setCompanion]}
								uneditedCompanionState={[companionUnedited, setCompanionUnedited]}
							/>
						</div>
					) : (
						<div className="w-full h-full flex justify-center items-center relative p-8">
							Companion #{tokenId} does not exist yet. <br />
							<a
								href="#"
								className="underline pl-2"
								onClick={(e) => {
									e.preventDefault();
									const random = randomCompanion();
									setCompanionUnedited(random);
									setCompanion(random);
								}}
							>
								Start with a random one
							</a>
							.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
