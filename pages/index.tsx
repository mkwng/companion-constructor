import Head from "next/head";
import Image from "next/image";
import Renderer from "../components/renderer";
import { companionExample } from "../data/example";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<>
			<Renderer companion={companionExample} />
		</>
	);
}
