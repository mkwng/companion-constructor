export default function Button({ className, ...props }) {
	return (
		<button
			className={
				`
				relative
				py-2 rounded-full
				flex justify-center items-center gap-2
				text-center
				border-2 border-clothing-black
				cursor-pointer ` + className
			}
			{...props}
		/>
	);
}
