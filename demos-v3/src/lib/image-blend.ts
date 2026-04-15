/**
 * Vault Maison — Image Background Matching Utility
 * 
 * Provides CSS properties for seamlessly blending product images
 * (typically on white backgrounds) into concept-specific colored backgrounds.
 * 
 * Light concepts use `multiply` blend mode.
 * Dark concepts use a subtle approach with reduced opacity and overlay.
 */

interface BlendConfig {
  containerBg: string
  blendMode: string
  filter: string
  /** Whether the concept has a dark background */
  isDark: boolean
}

/** Map concept IDs to their blend configurations */
const blendConfigs: Record<string, BlendConfig> = {
  minimal: { containerBg: '#FAFAF8', blendMode: 'multiply', filter: 'none', isDark: false },
  vault: { containerBg: '#141414', blendMode: 'normal', filter: 'none', isDark: true },
  gallery: { containerBg: '#F5F0EB', blendMode: 'multiply', filter: 'none', isDark: false },
  salon: { containerBg: '#FDF8F4', blendMode: 'multiply', filter: 'none', isDark: false },
  atelier: { containerBg: '#1E1E32', blendMode: 'normal', filter: 'none', isDark: true },
  archive: { containerBg: '#F2EDE8', blendMode: 'multiply', filter: 'none', isDark: false },
  observatory: { containerBg: '#0F1A2E', blendMode: 'normal', filter: 'none', isDark: true },
  theater: { containerBg: '#1A0A0A', blendMode: 'normal', filter: 'none', isDark: true },
  marketplace: { containerBg: '#0F1A14', blendMode: 'normal', filter: 'none', isDark: true },
  maison: { containerBg: '#FAF8F5', blendMode: 'multiply', filter: 'none', isDark: false },
}

/**
 * Get the blend configuration for a concept.
 * Returns CSS properties to apply to the image container and image element.
 */
export function getBlendConfig(conceptId: string): BlendConfig {
  return blendConfigs[conceptId] || blendConfigs.minimal
}

/**
 * Get inline styles for the image container element.
 */
export function getImageContainerStyle(conceptId: string): React.CSSProperties {
  const config = getBlendConfig(conceptId)
  return {
    backgroundColor: config.containerBg,
  }
}

/**
 * Get inline styles for the image element itself.
 */
export function getImageStyle(conceptId: string): React.CSSProperties {
  const config = getBlendConfig(conceptId)
  return {
    mixBlendMode: config.blendMode as React.CSSProperties['mixBlendMode'],
    filter: config.filter !== 'none' ? config.filter : undefined,
  }
}

/**
 * Check if a concept uses a dark background.
 */
export function isDarkConcept(conceptId: string): boolean {
  return getBlendConfig(conceptId).isDark
}
