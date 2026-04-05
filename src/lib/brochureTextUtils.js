import brochureRaw from '../data/brochure/brochure.txt?raw'

const brochureText = brochureRaw
  .replace(/\r/g, '')
  .replace(/\t+/g, '')
  .replace(/\n{3,}/g, '\n\n')

function normalizeChunk(chunk) {
  return chunk
    .replace(/^\s+|\s+$/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function sliceBetween(startHeading, endHeading) {
  const startIndex = brochureText.indexOf(startHeading)

  if (startIndex < 0) {
    return ''
  }

  const fromStart = brochureText.slice(startIndex)

  if (!endHeading) {
    return normalizeChunk(fromStart)
  }

  const endIndex = fromStart.indexOf(endHeading)

  if (endIndex < 0) {
    return normalizeChunk(fromStart)
  }

  return normalizeChunk(fromStart.slice(0, endIndex))
}

export function removeHeading(content, heading) {
  if (!content.startsWith(heading)) {
    return content
  }

  return normalizeChunk(content.slice(heading.length))
}

export function extractIntro(menuText) {
  const chunks = menuText.split(/\n\n+/).map((item) => item.trim()).filter(Boolean)

  for (const chunk of chunks) {
    if (chunk.length > 120) {
      return chunk
    }
  }

  return chunks[0] ?? ''
}
