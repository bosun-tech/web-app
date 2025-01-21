type ButtonProps = {
	id?: string;
	label: string;
	onClick?: () => void;
	disabled?: boolean;
	width?: 'full' | 'auto' | 'fit';
};

export default function Button({
	id,
	label,
	onClick,
	disabled = false,
	width = 'auto',
}: ButtonProps) {
	const widthClasses = {
		full: 'w-full',
		auto: 'w-auto',
		fit: 'w-fit',
	};

	return (
		<button
			id={id}
			className={`${widthClasses[width]} bg-[#2194F2] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
}
