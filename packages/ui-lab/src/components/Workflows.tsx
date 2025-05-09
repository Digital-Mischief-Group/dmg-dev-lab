import { Card } from "@dmg/components/ui/card"
import { Badge } from "@dmg/components/ui/badge"

export function Workflows() {
  return (
    <Card className="bg-gray-900 p-6 rounded-lg">
      <pre className="text-sm text-blue-400">
        <code>{`testWorkflow
.step(llm)
.then(decider)
.then(agentOne)
.then(workflow)
.after(decider)
.then(agentTwo)
.then(workflow)
.commit();`}</code>
      </pre>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <Badge variant="outline" className="bg-blue-800 text-white mb-2">
            step()
          </Badge>
          <Badge variant="outline" className="bg-gray-800 text-white">
            llm
          </Badge>
        </div>
        <div>
          <Badge variant="outline" className="bg-blue-800 text-white mb-2">
            then()
          </Badge>
          <Badge variant="outline" className="bg-gray-800 text-white">
            decider
          </Badge>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <Badge variant="outline" className="bg-blue-800 text-white mb-2">
            then()
          </Badge>
          <Badge variant="outline" className="bg-green-800 text-white">
            agentOne
          </Badge>
        </div>
        <div>
          <Badge variant="outline" className="bg-blue-800 text-white mb-2">
            then()
          </Badge>
          <Badge variant="outline" className="bg-green-800 text-white">
            agentTwo
          </Badge>
        </div>
      </div>
      <div className="mt-4">
        <Badge variant="outline" className="bg-blue-800 text-white mb-2">
          after()
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          workflow
        </Badge>
      </div>
    </Card>
  )
}
