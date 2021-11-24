export default function Button({ className, ...props }) {
	return (
		<button
			className={
				"font-mono m-2 py-3 px-6 transition-transform transform-gpu rounded-full text-lg font-semibold cursor-pointer border-4 border-transparent duration-75 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 border-black " +
				className
			}
			{...props}
		/>
	);
}
