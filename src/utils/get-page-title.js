import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Architect'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
