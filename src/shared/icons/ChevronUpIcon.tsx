import { SVGProps } from 'react'
export const ChevronUpIcon = ({
	color = 'currentColor',
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
				d='M3.085 1.116a.5.5 0 0 1 .83 0L6.006 4.22a.5.5 0 0 1-.415.78H1.41a.5.5 0 0 1-.415-.78z'
				fill={color}
			/>
		</svg>
	)
}
