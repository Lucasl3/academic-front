export function WordsLimit(text: string, limit: number) {
  if (text.length > limit) {
    const truncatedText = text.slice(0, limit)
    return truncatedText + '...'
  } else {
    return text
  }
}
