import { createContext, useContext } from 'react'

export type Lang = 'es' | 'en'

export const LangContext = createContext<Lang>('es')

export const useLang = (): Lang => useContext(LangContext)
