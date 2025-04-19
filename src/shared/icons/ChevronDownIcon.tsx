import { SVGProps } from 'react'
export const ChevronDownIcon = ({
	color = '#A1A1AA',
	...props
}: SVGProps<SVGSVGElement> & { color?: string }) => {
	return (
		<svg
			width={7}
			height={5}
			viewBox='0 0 7 5'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M3.085 3.884a.5.5 0 0 0 .83 0L6.006.78A.5.5 0 0 0 5.591 0H1.41a.5.5 0 0 0-.415.78z'
				fill={color}
			/>
		</svg>
	)
}
