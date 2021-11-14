import "../style/global.css";
import "tailwindcss/tailwind.css";
import NextHead from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextHead>
				<title>Companion</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</NextHead>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
