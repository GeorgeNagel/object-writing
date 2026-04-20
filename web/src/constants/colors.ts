import type { Sense } from '../services/analysisService'

// Palette
export const COLOR_YELLOW_200 = '#FFF176'
export const COLOR_CYAN_300 = '#80DEEA'
export const COLOR_GREEN_300 = '#A5D6A7'
export const COLOR_RED_300 = '#EF9A9A'
export const COLOR_PURPLE_300 = '#CE93D8'
export const COLOR_ORANGE_200 = '#FFCC80'
export const COLOR_BLUE_300 = '#90CAF9'

// Semantic
export const SENSE_COLORS: Record<Sense, string> = {
  sight: COLOR_YELLOW_200,
  sound: COLOR_CYAN_300,
  smell: COLOR_GREEN_300,
  taste: COLOR_RED_300,
  touch: COLOR_PURPLE_300,
  organic: COLOR_ORANGE_200,
  kinesthetic: COLOR_BLUE_300,
}
