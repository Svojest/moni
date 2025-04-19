'use client'

import '@tanstack/react-table'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { ITokenItem } from '../model'
import { tokenStore } from '../store'
import Image from 'next/image'
import Link from 'next/link'

import { CheckIcon, ClockIcon, XIcon, ZapIcon } from '@/shared/icons'
import { cn, formatAgeFromTimestamp, formatAmount } from '@/shared/lib'
import { SortIcons } from '@/shared/ui'

type ColumnAlign = 'start' | 'center' | 'end'
type StickyAlign = 'left' | 'right'

declare module '@tanstack/react-table' {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	interface ColumnMeta {
		align?: ColumnAlign
		sticky?: StickyAlign
	}
}

export const TokenTable = observer(() => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			await tokenStore.fetchTokens()
			setIsReady(true)
		}
		fetchData()
	}, [])

	const columns: ColumnDef<ITokenItem>[] = [
		{
			accessorKey: 'Token',
			header: 'Token',
			meta: { align: 'start', sticky: 'left' },
			enableSorting: false,
			cell: ({ row }) => {
				const token = row.original
				return (
					<div className='flex gap-[10px] items-center min-w-max'>
						<Image
							src={token.logoUrl ? token.logoUrl : token.chain.logoUrl}
							alt={token.name}
							width={24}
							height={24}
							className='flex-shrink-0 block rounded-full size-6'
						/>
						<div className='grid gap-[4px]'>
							<p className=''>{token.name}</p>
							<div className='flex items-center gap-1'>
								<p className='text-xs font-normal text-muted-foreground text-nowrap'>
									{token.address.slice(0, 3) + '...' + token.address.slice(-3)}
								</p>
								<ul className='flex items-center gap-[2px]'>
									{token.links.map((link, index) => (
										<li key={index}>
											<Link href={link.linkUrl}>
												<Image
													src={link.logoUrl}
													width={10}
													height={10}
													className='size-[10px]'
													alt={link.name}
												/>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				)
			}
		},
		{
			accessorKey: 'Created',
			header: 'Created',
			meta: { align: 'center' },

			cell: ({ row }) => {
				const created = row.original.createdAt
				return (
					<span className='inline-flex items-center gap-1 '>
						<ClockIcon />
						{formatAgeFromTimestamp(created)}
					</span>
				)
			}
		},
		{
			accessorKey: 'Smarts',
			header: 'Smarts',
			meta: { align: 'end' },

			cell: ({ row }) => {
				const token = row.original
				return <span className='align-top'>{formatAmount(token.smartFollowersCount)}</span>
			}
		},
		{
			accessorKey: 'smartFollowersCountChange',
			header: 'Cng',
			meta: { align: 'start' },
			cell: ({ row }) => {
				const token = row.original
				return (
					<span
						className={cn(
							'align-top',
							token.smartFollowersCountChange > 0 && 'text-positive before:content-["+"]',
							token.smartFollowersCountChange < 0 && 'text-destructive '
						)}
					>
						{formatAmount(token.smartFollowersCountChange)}
					</span>
				)
			}
		},
		{
			accessorKey: 'smartMentionsCount',
			header: 'S. M.',
			meta: { align: 'end' },
			cell: ({ row }) => {
				const token = row.original
				return <span className='align-top'>{formatAmount(token.smartMentionsCount)}</span>
			}
		},
		{
			accessorKey: 'smartMentionsCountChange',
			header: 'Cng',
			meta: { align: 'start' },

			cell: ({ row }) => {
				const token = row.original
				return (
					<span
						className={cn(
							'align-top',
							token.smartMentionsCountChange > 0 && 'text-positive before:content-["+"]',
							token.smartMentionsCountChange < 0 && 'text-destructive '
						)}
					>
						{formatAmount(token.smartMentionsCountChange)}
					</span>
				)
			}
		},
		{
			accessorKey: 'TXs',
			header: 'TXs',
			meta: { align: 'end' },

			cell: ({ row }) => {
				const token = row.original
				const txsSum = token.txsBuyCount + token.txsSellCount
				return (
					<div className='flex flex-col items-end gap-2'>
						<span>${formatAmount(txsSum)}</span>
						<div className='relative bg-destructive w-[56px] h-[4px] rounded overflow-hidden'>
							<div
								className={cn('bg-positive h-[4px]')}
								style={{
									width: `${(token.txsBuyCount / (token.txsBuyCount + token.txsSellCount)) * 100}%`
								}}
							></div>
						</div>
					</div>
				)
			}
		},
		{
			accessorKey: 'txsCountChange',
			header: 'Cng',
			meta: { align: 'start' },
			cell: ({ row }) => {
				const token = row.original
				return (
					<span
						className={cn(
							'align-top',
							token.txsCountChange > 0 && 'text-positive before:content-["+"] ',
							token.txsCountChange < 0 && 'text-destructive '
						)}
					>
						{formatAmount(token.txsCountChange)}
					</span>
				)
			}
		},
		{
			accessorKey: 'Volume',
			header: 'Volume',
			meta: { align: 'end' },
			cell: ({ row }) => {
				const token = row.original
				const volume = token.volumeBuy.USD + token.volumeSell.USD
				return (
					<div className='flex flex-col items-end gap-2'>
						<span>${formatAmount(volume)}</span>
						<div className='relative bg-destructive w-[56px] h-[4px] rounded overflow-hidden'>
							<div
								className={cn('bg-positive h-[4px]')}
								style={{
									width: `${(Number(token.volumeSell.USD) / Number(token.volumeBuy.USD)) * 100}%`
								}}
							></div>
						</div>
					</div>
				)
			}
		},
		{
			accessorKey: 'volumeChange',
			header: 'Cng',
			meta: { align: 'start' },

			cell: ({ row }) => {
				const token = row.original
				return (
					<span
						className={cn(
							'align-top',
							Number(token.volumeChange.USD) > 0 && 'text-positive before:content-["+"]',
							Number(token.volumeChange.USD) < 0 && 'text-destructive '
						)}
					>
						{formatAmount(Number(token.volumeChange.USD))}
					</span>
				)
			}
		},
		{
			accessorKey: 'liquidity',
			header: 'Liquidity',
			meta: { align: 'center' },

			cell: ({ row }) => {
				const token = row.original
				return <span className='align-top'>${formatAmount(token.liquidity.USD)}</span>
			}
		},
		{
			accessorKey: 'marketCap',
			header: 'MKT Cap',
			meta: { align: 'end' },

			cell: ({ row }) => {
				const token = row.original
				return <span className='align-top'>${formatAmount(token.marketCap.USD)}</span>
			}
		},
		{
			accessorKey: 'marketCapChange',
			header: 'Cng',
			meta: { align: 'start' },

			cell: ({ row }) => {
				const token = row.original
				return (
					<span
						className={cn(
							'align-top',
							Number(token.marketCapChange.USD) > 0 && 'text-positive before:content-["+"]',
							Number(token.marketCapChange.USD) < 0 && 'text-destructive '
						)}
					>
						{formatAmount(Number(token.marketCapChange.USD))}
					</span>
				)
			}
		},
		{
			accessorKey: 'holdersCount',
			header: 'Holders',
			meta: { align: 'end' },

			cell: ({ row }) => {
				const token = row.original
				return <span className='align-top'>${formatAmount(token.holdersCount)}</span>
			}
		},
		{
			accessorKey: 'holdersCountChange',
			header: 'Cng',
			meta: { align: 'start' },

			cell: ({ row }) => {
				const token = row.original
				return (
					<span
						className={cn(
							'align-top',
							token.holdersCountChange > 0 && 'text-positive before:content-["+"] ',
							token.holdersCountChange < 0 && 'text-destructive '
						)}
					>
						{formatAmount(token.holdersCountChange)}
					</span>
				)
			}
		},
		{
			accessorKey: 'security',
			header: 'CV/CR/HNP/LB',
			meta: { align: 'center' },
			enableSorting: false,
			cell: ({ row }) => {
				const token = row.original
				return (
					<ul className='inline-flex gap-[2px] items-center'>
						{token.security.map(item => (
							<li key={item.name} className='px-1 py-[2px]'>
								{item.status ? <CheckIcon /> : <XIcon />}
							</li>
						))}
					</ul>
				)
			}
		},
		{
			accessorKey: 'actions',
			header: '',
			meta: { align: 'end', sticky: 'right' },
			enableSorting: false,
			cell: () => {
				return (
					<button className='inline-flex items-center gap-2 px-4 transition-opacity rounded-lg cursor-pointer whitespace-nowrap bg-secondary h-9 hover:bg-secondary/80'>
						<ZapIcon />
						<span>Buy</span>
					</button>
				)
			}
		}
	]

	const table = useReactTable({
		data: tokenStore.tokens,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel()
		// getSortedRowModel: getSortedRowModel()
	})

	if (!isReady)
		return (
			<div className='overflow-x-auto border rounded-lg h-[95dvh] border-border bg-background-2 flex flex-col items-center justify-center'>
				<div className='text-xl text-muted-foreground'>Loading...</div>
			</div>
		)

	return (
		<div className='overflow-x-auto border rounded-lg max-h-[95dvh] border-border bg-background-2 scrollbar'>
			<table className='min-w-full text-sm table-auto'>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr
							key={headerGroup.id}
							className='[&_th:first-child]:pl-4 [&_th:last-child]:pr-4 
							[&_th:last-child]:pl-2 [&_th:nth-last-child(2)]:pr-10'
						>
							{headerGroup.headers.map(header => (
								<th
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									className={cn(
										'relative h-[52px] select-none whitespace-nowrap',
										'text-center text-xs leading-[16px] text-muted-foreground font-normal',

										header.column.columnDef.meta?.align === 'start' && 'text-start pl-2 pr-2',

										header.column.columnDef.meta?.align === 'end' && 'text-right pr-[10px]',
										'after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-[32px] after:bg-border-primary-foreground',

										header.column.columnDef.meta?.sticky === 'left' &&
											'bg-background-2 sticky left-0 z-[1]',
										'after:content-[""] after:absolute after:left-[100%] after:top-0 after:h-full after:w-[16px] after:bg-background-2 after:mask-r-from-5%',

										header.column.columnDef.meta?.sticky === 'right' &&
											'bg-background-2 sticky right-0 z-[1]',
										'after:content-[""] after:absolute after:right-[100%] after:!top-0 after:!h-full after:w-[16px] after:bg-background-2 after:mask-l-from-5% after:!translate-none'
									)}
								>
									<div
										className={cn(
											'inline-flex items-center gap-1',
											header.column.getCanSort() && 'cursor-pointer'
										)}
									>
										{header.column.getCanSort() && (
											<SortIcons isSorted={header.column.getIsSorted()} />
										)}
										{flexRender(header.column.columnDef.header, header.getContext())}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className=''>
					{table.getRowModel().rows.map(row => (
						<tr
							key={row.id}
							className='border-t border-border [&_td:first-child]:pl-4 [&_td:last-child]:pr-4 [&_td:last-child]:pl-2 [&_td:nth-last-child(2)]:pr-10'
						>
							{row.getVisibleCells().map(cell => (
								<td
									key={cell.id}
									className={cn(
										'text-center h-[64px] relative align-top whitespace-nowrap min-w-[90px] pt-[14px]',
										cell.column.columnDef.meta?.align === 'start' &&
											'text-start min-w-[80px] pl-2 pr-2',
										cell.column.columnDef.meta?.align === 'end' &&
											'min-w-[88px] text-right pr-[10px] after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-[32px] after:bg-border-primary-foreground',
										cell.column.columnDef.meta?.sticky === 'left' &&
											'bg-background-2 sticky left-0 z-[1] after:content-[""] after:absolute after:left-[100%] after:top-0 after:h-full after:w-[16px] after:bg-background-2 after:mask-r-from-5%',

										cell.column.columnDef.meta?.sticky === 'right' &&
											'bg-background-2 sticky right-0 z-[1] after:content-[""] after:absolute after:right-[100%] after:!top-0 after:!h-full after:w-[16px] after:bg-background-2 after:mask-l-from-5% after:!translate-none'
									)}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
})
