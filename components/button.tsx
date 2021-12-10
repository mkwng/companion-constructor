import { colors } from "../data/colors";

export default function Button({
	className = "",
	loading = false,
	disabled = false,
	...props
}) {
	return (
		<div className="relative w-full">
			<button
				disabled={disabled}
				className={`
				relative w-full
				py-2 px-4 rounded-full active:pt-3 active:pb-1
				flex justify-center items-center gap-2
				text-center
				border-2 border-ui-black-default 
				cursor-pointer 
				${loading || disabled ? "opacity-50 pointer-events-none" : ""} 
				${className}
			`}
				{...props}
			/>
			{loading ? (
				<>
					<div className="absolute animate-spin w-4 h-4 left-3 top-1/2 -mt-2 text-ui-black-default">
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="12" cy="12" r="3"></circle>
							<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
						</svg>
					</div>
					<div className="absolute w-12 h-12 left-1/2 top-1/2 -ml-6 mt-16 text-center flex justify-center items-center text-xs">
						{/* {loadingText} */}
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
