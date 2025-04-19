import { SVGProps } from 'react'

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width={16}
			height={16}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M13.333 4 6 11.333 2.667 8'
				stroke='#83E073'
				strokeWidth={1.5}
				strokeLinecap='square'
			/>
		</svg>
	)
}
