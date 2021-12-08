import "../style/global.css";
import "tailwindcss/tailwind.css";
import NextHead from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextHead>
				<title>Companion-in-a-Box</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />

				<meta name="twitter:card" content="summary"></meta>
				<meta name="twitter:site" content="@companioninabox" />
				<meta name="twitter:creator" content="@mkwng" />

				<meta property="og:image" content="/social.png" />
				<meta property="og:title" content="Companion-in-a-Box" />
				<meta
					property="og:description"
					content="Get in, we're hanging out in boxes. A limited run NFT project by @mkwng."
				/>
				<meta property="og:url" content="https://www.companioninabox.art" />
			</NextHead>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
