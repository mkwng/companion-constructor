import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Editor from "../../components/editor";
import Renderer from "../../components/renderer";
import { keysToCompanion } from "../../data/helpers";
import { randomCompanion } from "../../data/random";
import { Companion } from "../../data/types";
import { fetcher } from "../../lib/swr";

export default function CompanionDetails() {
	const [companion, setCompanion] = useState<Companion | null>(randomCompanion());
	const [isEditing, setIsEditing] = useState(false);
	const [showBg, setShowBg] = useState(true);

	return (
		<div>
			<Renderer companion={companion} hideBackground={!showBg} />
			<div className="flex m-8 gap-8">
				<Button onClick={() => setShowBg((prev) => !prev)}>
					Toggle background ({showBg ? "On" : "Off"})
				</Button>
				<Button onClick={() => setCompanion(randomCompanion())}>Random</Button>
			</div>
			<div className="bg-ui-black-default text-default-white">
				<Editor companionState={[companion, setCompanion]} />
			</div>
		</div>
	);
}
