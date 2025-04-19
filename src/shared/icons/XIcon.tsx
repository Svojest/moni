import { SVGProps } from 'react'

export const XIcon = (props: SVGProps<SVGSVGElement>) => {
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
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3 12.75 12.75 3l1.06 1.06-9.75 9.75z'
				fill='#FF5F5F'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M12.75 13.81 3 4.06 4.06 3l9.75 9.75z'
				fill='#FF5F5F'
			/>
		</svg>
	)
}
