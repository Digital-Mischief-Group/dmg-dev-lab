import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

export const SquareNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="flex flex-col items-center">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
      <div className={`w-5 h-5 border border-black flex items-center justify-center bg-white`}>
        {data.isPlus && <span className="text-xs">+</span>}
      </div>
      <div className={`text-center text-sm mt-2 whitespace-pre-line ${data.isGray ? "text-gray-500" : ""}`}>
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
    </div>
  )
})

SquareNode.displayName = "SquareNode"

