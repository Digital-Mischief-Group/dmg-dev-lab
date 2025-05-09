import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

export const HexagonNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="flex flex-col items-center">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
      <div className="w-6 h-6 border border-black rotate-45 flex items-center justify-center bg-white">
        <span className="text-xs -rotate-45">{data.number}</span>
      </div>
      <div className="text-center text-sm mt-2 whitespace-pre-line">{data.label}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
    </div>
  )
})

HexagonNode.displayName = "HexagonNode"

