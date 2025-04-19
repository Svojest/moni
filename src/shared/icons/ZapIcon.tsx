import { SVGProps } from 'react'

export const ZapIcon = (props: SVGProps<SVGSVGElement>) => {
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
				d='M8.667 1.333 2 9.333h6l-.667 5.334 6.667-8H8z'
				stroke='#8462EE'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}
