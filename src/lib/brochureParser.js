import { serviceConfigs } from '../data/brochure/serviceConfigs'
import { extractIntro, removeHeading, sliceBetween } from './brochureTextUtils'

const DETAIL_SECTION_LABELS = new Set(['what it is', 'best for', 'what to expect'])
const GLOBAL_NOTE_HEADINGS = new Set([
  'important note',
  'treatment planning note',
  'important treatment note',
  'important treatment information',
  'important waxing guidance',
  'the evenana body experience',
  'the evenana waxing experience',
  'the evenana artistry experience',
  'understanding hair growth cycles',
  'recommended treatment intervals',
  'what to expect over time',
])
const DEFAULT_PRICE_LABEL = 'Price on consultation'
const DEFAULT_BOOKING_URL = 'tel:+442073213050'

function toBlocks(content) {
  return content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
}

function cleanNumbering(text) {
  return text.replace(/^\d+\.\s*/, '').trim()
}

function normalizeBlock(text) {
  return text.trim().toLowerCase()
}

function normalizeLine(text) {
  return text.replace(/^•\s*/, '').replace(/\s+/g, ' ').trim()
}

function isDescriptorLine(block) {
  return block.includes('|') && block.length <= 90
}

function isLikelyTreatmentTitle(block) {
  if (!block) {
    return false
  }

  const cleaned = cleanNumbering(block)
  const normalized = normalizeBlock(cleaned)

  if (!cleaned || cleaned.length > 90 || cleaned.includes('|')) {
    return false
  }

  if (DETAIL_SECTION_LABELS.has(normalized) || GLOBAL_NOTE_HEADINGS.has(normalized)) {
    return false
  }

  if (/[.:!?]$/.test(cleaned)) {
    return false
  }

  const words = cleaned.split(/\s+/).filter(Boolean)

  if (words.length === 0 || words.length > 14) {
    return false
  }

  return /[A-Za-z]/.test(cleaned)
}

function parseDetailSections(blocks, startIndex, endIndex) {
  const details = {
    whatIs: [],
    bestFor: [],
    expect: [],
    notes: [],
  }
  let activeSection = 'whatIs'

  for (let index = startIndex; index < endIndex; index += 1) {
    const block = blocks[index]
    const normalized = normalizeBlock(block)

    if (normalized === 'what it is') {
      activeSection = 'whatIs'
      continue
    }

    if (normalized === 'best for') {
      activeSection = 'bestFor'
      continue
    }

    if (normalized === 'what to expect') {
      activeSection = 'expect'
      continue
    }

    if (normalized === 'treatment grades') {
      activeSection = 'notes'
      continue
    }

    const normalizedLines = block
      .split('\n')
      .map((line) => normalizeLine(line))
      .filter(Boolean)

    if (normalizedLines.length === 0) {
      continue
    }

    details[activeSection].push(normalizedLines.join(' '))
  }

  return details
}

function buildTreatmentCards(menuContent) {
  const blocks = toBlocks(menuContent)
  const markers = []

  for (let index = 0; index < blocks.length; index += 1) {
    if (normalizeBlock(blocks[index]) !== 'what it is') {
      continue
    }

    const lookbackStart = Math.max(0, index - 4)
    let titleIndex = -1

    for (let cursor = index - 1; cursor >= lookbackStart; cursor -= 1) {
      if (isLikelyTreatmentTitle(blocks[cursor])) {
        titleIndex = cursor
        break
      }
    }

    if (titleIndex < 0) {
      continue
    }

    const title = cleanNumbering(blocks[titleIndex])

    if (!title) {
      continue
    }

    const subtitleCandidate = blocks[titleIndex + 1]
    const subtitle = subtitleCandidate && isDescriptorLine(subtitleCandidate) ? subtitleCandidate : ''

    markers.push({
      titleIndex,
      whatIndex: index,
      title,
      subtitle,
    })
  }

  if (markers.length === 0) {
    return []
  }

  const uniqueMarkers = markers.filter((marker, index) => {
    if (index === 0) {
      return true
    }

    const previous = markers[index - 1]
    return marker.titleIndex !== previous.titleIndex
  })

  return uniqueMarkers
    .map((marker, index) => {
      const nextMarker = uniqueMarkers[index + 1]
      let sectionEnd = nextMarker ? nextMarker.titleIndex : blocks.length

      for (let cursor = marker.whatIndex + 1; cursor < sectionEnd; cursor += 1) {
        if (GLOBAL_NOTE_HEADINGS.has(normalizeBlock(blocks[cursor]))) {
          sectionEnd = cursor
          break
        }
      }

      const details = parseDetailSections(blocks, marker.whatIndex + 1, sectionEnd)
      const description = details.whatIs.slice(0, 2).join(' ')

      if (!description) {
        return null
      }

      const frequencyNote = [...details.notes].find((note) => /^recommended frequency:/i.test(note))

      return {
        id: `${marker.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${marker.titleIndex}`,
        title: marker.title,
        subtitle: marker.subtitle,
        description,
        bestFor: details.bestFor.join(' • '),
        whatToExpect: details.expect[0] ?? '',
        frequency: frequencyNote ?? '',
        priceLabel: DEFAULT_PRICE_LABEL,
        bookingLabel: 'Book now',
        bookingUrl: DEFAULT_BOOKING_URL,
      }
    })
    .filter(Boolean)
}

export function getServiceContent(slug) {
  const config = serviceConfigs.find((item) => item.slug === slug)

  if (!config) {
    return null
  }

  const menuContent = config.aftercareHeading
    ? removeHeading(
        sliceBetween(config.menuHeading, config.aftercareHeading),
        config.menuHeading,
      )
    : removeHeading(sliceBetween(config.menuHeading, config.nextHeading), config.menuHeading)

  const aftercareContent = config.aftercareHeading
    ? removeHeading(
        sliceBetween(config.aftercareHeading, config.nextHeading),
        config.aftercareHeading,
      )
    : ''

  return {
    ...config,
    intro: extractIntro(menuContent),
    menuContent,
    treatmentCards: buildTreatmentCards(menuContent),
    aftercareContent,
  }
}

export function getAllServices() {
  return serviceConfigs.map((item) => getServiceContent(item.slug)).filter(Boolean)
}

export function getServiceNeighbors(slug) {
  const index = serviceConfigs.findIndex((item) => item.slug === slug)

  if (index < 0) {
    return { previous: null, next: null }
  }

  return {
    previous: serviceConfigs[index - 1] ?? null,
    next: serviceConfigs[index + 1] ?? null,
  }
}
