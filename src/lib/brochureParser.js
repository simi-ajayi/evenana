import { serviceConfigs } from '../data/brochure/serviceConfigs'
import { extractIntro, removeHeading, sliceBetween } from './brochureTextUtils'

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
