import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Editor from "../../components/editor";
import Renderer from "../../components/renderer";
import { keysToCompanion } from "../../data/helpers";
import { randomCompanion } from "../../data/random";
import { Companion } from "../../data/types";
import { fetcher } from "../../lib/swr";

export default function CompanionDetails() {
	const [companion, setCompanion] = useState<Companion | null>(randomCompanion());
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div>
			<h1>{companion.name}</h1>
			<Renderer companion={companion} />
			<button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "View" : "Edit"}</button>
			<button onClick={() => setCompanion(randomCompanion())}>Randomize</button>
			{isEditing && <Editor companionState={[companion, setCompanion]} />}
		</div>
	);
}
