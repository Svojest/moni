import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export function useShadowScroll({ deps }: { deps?: unknown[] }) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(false)

	const updateScroll = useCallback(() => {
		const container = containerRef.current
		if (!container) return

		const { scrollLeft, scrollWidth, clientWidth } = container
		setCanScrollLeft(scrollLeft > 8)
		setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8)
	}, [])

	useLayoutEffect(() => {
		const container = containerRef.current
		if (!container) return

		updateScroll()

		container.addEventListener('scroll', updateScroll)
		window.addEventListener('resize', updateScroll)

		const observer = new ResizeObserver(updateScroll)
		observer.observe(container)

		return () => {
			container.removeEventListener('scroll', updateScroll)
			window.removeEventListener('resize', updateScroll)
			observer.disconnect()
		}
	}, [updateScroll, deps])

	return { containerRef, canScrollLeft, canScrollRight }
}
