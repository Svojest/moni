import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatAgeFromTimestamp(unixSeconds: number): string {
	const now = Date.now()
	const created = unixSeconds * 1000
	const diff = now - created

	const sec = Math.floor(diff / 1000)
	const min = Math.floor(sec / 60)
	const hrs = Math.floor(min / 60)
	const days = Math.floor(hrs / 24)
	const weeks = Math.floor(days / 7)

	if (sec < 60) return `${sec}s`
	if (min < 60) return `${min}m`
	if (hrs < 24) return `${hrs}h`
	if (days < 7) return `${days}d`
	return `${weeks}w`
}

export function formatAmount(value: number | string): string {
	const num = typeof value === 'string' ? parseFloat(value) : value

	if (isNaN(num)) return '–'

	return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
