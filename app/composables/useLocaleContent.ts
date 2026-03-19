type CollectionBase = 'index' | 'blog' | 'pages' | 'projects' | 'about' | 'footer'
type LocaleCollectionName<T extends CollectionBase> = `${T}_en` | `${T}_es`

export function useLocaleContent() {
  const { locale } = useI18n()

  function collectionName<T extends CollectionBase>(base: T): LocaleCollectionName<T> {
    return `${base}_${locale.value}`
  }

  function fallbackCollectionName<T extends CollectionBase>(base: T): `${T}_en` {
    return `${base}_en`
  }

  return {
    locale,
    collectionName,
    fallbackCollectionName
  }
}
