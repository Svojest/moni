import { ChevronDownIcon, ChevronUpIcon } from '@/shared/icons'

export function SortIcons({ isSorted }: { isSorted: false | 'asc' | 'desc' }) {
	return (
		<span className='inline-flex flex-col items-center justify-center gap-[2px] '>
			<ChevronUpIcon className={isSorted === 'asc' ? 'text-foreground' : 'text-muted-foreground'} />
			<ChevronDownIcon
				className={isSorted === 'desc' ? 'text-foreground' : 'text-muted-foreground'}
			/>
		</span>
	)
}
