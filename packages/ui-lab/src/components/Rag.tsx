import { Card } from "@dmg/components/ui/card"
import { Badge } from "@dmg/components/ui/badge"

export function Rag() {
  return (
    <Card className="bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-between mb-6">
        <Badge variant="outline" className="bg-gray-800 text-white">
          .embed()
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          .query()
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          .rerank()
        </Badge>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Badge variant="outline" className="bg-gray-800 text-white">
          input
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          embedding model
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          retrieval
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          llm
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          output
        </Badge>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 items-center">
        <Badge variant="outline" className="bg-red-800 text-white">
          knowledge base
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          embedding model
        </Badge>
        <Badge variant="outline" className="bg-gray-800 text-white">
          vector stores
        </Badge>
      </div>
    </Card>
  )
}
