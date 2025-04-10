import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

export const MainNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="flex flex-col items-center">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
      <div className="text-center mt-2">
        <p className="font-medium text-sm">{data.label}</p>
        <p className="text-xs text-gray-600">{data.sublabel}</p>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
      <Handle type="source" position={Position.Left} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-2 h-2 !bg-black" />
    </div>
  )
})

MainNode.displayName = "MainNode"

