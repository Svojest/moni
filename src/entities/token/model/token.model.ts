import { IBaseInfo, ICurrency, ILink, ISecurity } from './token.types'

export interface ITokenItem {
	address: string
	chain: IBaseInfo
	createdAt: number
	holdersCount: number
	holdersCountChange: number
	id: number
	links: ILink[]
	liquidity: ICurrency
	logoUrl: string
	marketCap: ICurrency
	marketCapChange: ICurrency
	marketCapChangePercents: ICurrency
	name: string
	platform: IBaseInfo
	security: ISecurity[]
	smartFollowersCount: number
	smartFollowersCountChange: number
	smartMentionsCount: number
	smartMentionsCountChange: number
	symbol: string
	txsBuyCount: number
	txsSellCount: number
	txsCountChange: number
	volumeBuy: ICurrency
	volumeSell: ICurrency
	volumeChange: ICurrency
}
