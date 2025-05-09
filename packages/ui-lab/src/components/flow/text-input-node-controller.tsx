"use client";

import { useWorkflow } from "@dmg/hooks/flow/use-workflow";
import type { NodeExecutionState } from "@dmg/lib/flow/workflow-execution-engine";
import { TextInputNode } from "@dmg/components/flow/text-input-node";
import type { NodeProps } from "@xyflow/react";
import { useCallback } from "react";

export type TextInputNodeController = Omit<TextInputNode, "data"> & {
	type: "text-input";
	data: Omit<TextInputNode["data"], "status"> & {
		executionState?: NodeExecutionState;
	};
};

export function TextInputNodeController({
	id,
	data,
	...props
}: NodeProps<TextInputNodeController>) {
	const updateNode = useWorkflow((state) => state.updateNode);
	const deleteNode = useWorkflow((state) => state.deleteNode);

	const handleTextChange = useCallback(
		(value: string) => {
			updateNode(id, "text-input", { config: { value } });
		},
		[id, updateNode],
	);

	const handleDeleteNode = useCallback(() => {
		deleteNode(id);
	}, [id, deleteNode]);

	return (
		<TextInputNode
			id={id}
			data={{
				status: data.executionState?.status,
				config: data.config,
			}}
			{...props}
			onTextChange={handleTextChange}
			onDeleteNode={handleDeleteNode}
		/>
	);
}
