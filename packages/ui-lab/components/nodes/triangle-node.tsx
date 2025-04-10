import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

export const TriangleNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="flex flex-col items-center">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
      <div className="w-5 h-5 relative">
        <div
          className="absolute inset-0 border border-black bg-white"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>
      </div>
      <div className="text-center text-sm mt-2 whitespace-pre-line">{data.label}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
    </div>
  )
})

TriangleNode.displayName = "TriangleNode"

