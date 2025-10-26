import {
  BrainCircuit,
  Bot,
  CircuitBoard,
  Cpu,
  Database,
  Layers,
  Network,
  ServerCog,
  Sparkles,
  Workflow,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

const icons = {
  BrainCircuit,
  Bot,
  CircuitBoard,
  Cpu,
  Database,
  Layers,
  Network,
  ServerCog,
  Sparkles,
  Workflow,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons

export const iconRegistry: Record<IconName, LucideIcon> = icons
