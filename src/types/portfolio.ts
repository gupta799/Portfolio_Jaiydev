import type { IconName } from '../components/iconRegistry'

export type ProjectMetric = string

export type ProjectMediaTone = 'before' | 'after' | 'diagram'

export type ProjectMedia = {
  id: string
  label: string
  description: string
  tone: ProjectMediaTone
  /**
   * Optional asset path served from the public/ directory. Defaults to a stylized card if omitted.
   */
  asset?: string
  /**
   * Tailwind utility classes that control the gradient background of the media card.
   */
  backgroundClass?: string
  /**
   * Additional context or measurable outcome tied to the visual.
   */
  annotation?: string
}

export type ProjectStoryBeat = {
  id: string
  title: string
  description: string
  outcome?: string
}

export type ProjectChartSeriesTone = 'before' | 'after' | 'baseline'

export type ProjectChartSeries = {
  label: string
  value: number
  tone: ProjectChartSeriesTone
}

export type ProjectChart = {
  id: string
  title: string
  description: string
  unit?: string
  series: ProjectChartSeries[]
}

export type VisualCue = {
  label: string
  icon: IconName
}

export type Project = {
  title: string
  subtitle: string
  role: string
  period: string
  description: string
  result: string
  stack: string[]
  metrics?: ProjectMetric[]
  link?: string
  story?: ProjectStoryBeat[]
  media?: ProjectMedia[]
  charts?: ProjectChart[]
  visuals?: VisualCue[]
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
}

export type Article = {
  title: string
  description: string
  link: string
  year: string
}
