export default function Button({ className, ...props }) {
	return (
		<button
			className={
				`
				font-mono text-md font-semibold 
				py-2 px-4 
				transition-transform transform-gpu duration-75 
				hover:-translate-x-1 hover:-translate-y-1
				active:translate-x-0 active:translate-y-0  
				rounded-full border-4 border-transparent border-black 
				cursor-pointer ` + className
			}
			{...props}
		/>
	);
}
