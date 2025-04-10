import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

export const CircleNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="flex flex-col items-center">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
      <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center bg-white">
        {data.isDot ? <span className="text-xs">•</span> : <span className="text-xs">{data.number}</span>}
      </div>
      <div className="text-center text-sm mt-2 whitespace-pre-line">{data.label}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
    </div>
  )
})

CircleNode.displayName = "CircleNode"

