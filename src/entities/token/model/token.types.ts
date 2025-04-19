export interface IBaseInfo {
	id: number
	logoUrl: string
	name: string
	slug: string
}

export interface ILink {
	name: string
	linkUrl: string
	logoUrl: string
}

export interface ICurrency {
	USD: string
}

export interface ISecurity {
	name: string
	shortName: string
	status: boolean
}
