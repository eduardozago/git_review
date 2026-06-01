"use client"

import { useSyncExternalStore } from "react"

import {
  DEFAULT_LANGUAGE,
  getLanguageSnapshot,
  subscribeLanguage,
  type Language,
} from "@/lib/i18n"

export function useLanguage(): Language {
  return useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    () => DEFAULT_LANGUAGE
  )
}

export function useCopy<T>(translations: { pt: T; en: T }): T {
  const lang = useLanguage()
  return translations[lang]
}
