import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import { ITokenItem } from '../model'

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

class TokenStore {
	tokens: ITokenItem[] = []
	loading = false

	constructor() {
		makeAutoObservable(this)
	}

	async fetchTokens() {
		this.loading = true
		try {
			if (!API_URL) {
				throw new Error('API_URL не определен')
			}
			const res = await axios.get(API_URL)
			runInAction(() => {
				this.tokens = res.data.items
				this.loading = false
			})
		} catch (e) {
			runInAction(() => {
				this.loading = false
			})
			console.error('Ошибка загрузки токенов', e)
		}
	}
}

export const tokenStore = new TokenStore()
