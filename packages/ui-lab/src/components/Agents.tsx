import { Card } from "@dmg/components/ui/card"
import { Badge } from "@dmg/components/ui/badge"

export function Agents() {
  return (
    <Card className="bg-gray-900 p-6 rounded-lg">
      <pre className="text-sm text-green-400">
        <code>{`const chefAgent = new Agent({
  name: 'Chef Agent',
  instructions:
    "You are Michel, a practical and experienced home chef" +
    "who helps people cook great meals."
  model: openai('gpt-4o-mini'),
  memory,
  workflow: { chefWorkflow }
});`}</code>
      </pre>
      <div className="mt-6 flex flex-wrap gap-4">
        <Badge variant="outline" className="bg-gray-800 text-white">
          input
        </Badge>
        <Badge variant="outline" className="bg-green-800 text-white">
          agent
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          output
        </Badge>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <Badge variant="outline" className="bg-green-800 text-white">
          llm
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          memory
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          tools
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          workflow
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          rag
        </Badge>
      </div>
    </Card>
  )
}
