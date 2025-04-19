import { SVGProps } from 'react'

export const ClockIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='12'
			height='12'
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M11.833 6A5.833 5.833 0 1 1 .167 6a5.833 5.833 0 0 1 11.666 0M6.646 2.5a.646.646 0 1 0-1.292 0V6c0 .245.138.468.357.578l2.334 1.166a.646.646 0 0 0 .577-1.155l-1.976-.988z'
				fill='#A1A1AA'
			/>

			<defs>
				<path fill='#fff' d='M0 0h12v12H0z' />
			</defs>
		</svg>
	)
}
