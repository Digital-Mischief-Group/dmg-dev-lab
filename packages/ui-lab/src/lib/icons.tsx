import type { LucideIcon } from "lucide-react"

export type IconName =
  | "target"
  | "agent"
  | "llm"
  | "book"
  | "tools"
  | "workflow"
  | "knowledge-base"
  | "unified-api"
  | "message"
  | "cloud"
  | "code"
  | "typescript"

export function getIcon(name: IconName): LucideIcon {
  // This would normally return actual Lucide icons
  // For this example, we're using placeholder icons in the components
  return null as unknown as LucideIcon
}
