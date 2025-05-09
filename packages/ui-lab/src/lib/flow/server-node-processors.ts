import { generateAIText } from "@dmg/lib/flow/generate-ai-text";
import type { FlowNode } from "@dmg/lib/flow/workflow";
import type { NodeProcessor } from "@dmg/lib/flow/workflow-execution-engine";
import type { GenerateTextNode } from "@dmg/components/flow/generate-text-node";
import type { PromptCrafterNode } from "@dmg/components/flow/prompt-crafter-node";
import type { TextInputNode } from "@dmg/components/flow/text-input-node";

export const serverNodeProcessors: Record<FlowNode["type"], NodeProcessor> = {
	"text-input": async (node) => {
		const textNode = node as TextInputNode;
		return {
			result: textNode.data.config.value,
		};
	},

	"prompt-crafter": async (node, targetsData) => {
		const promptNode = node as PromptCrafterNode;
		if (!targetsData) {
			throw new Error("Targets data not found");
		}

		let parsedTemplate = promptNode.data.config.template;
		for (const [targetId, targetValue] of Object.entries(targetsData)) {
			const tag = promptNode.data.dynamicHandles["template-tags"].find(
				(handle) => handle.id === targetId,
			);
			if (!tag) {
				throw new Error(`Tag with id ${targetId} not found`);
			}
			parsedTemplate = parsedTemplate.replaceAll(
				`{{${tag.name}}}`,
				targetValue,
			);
		}
		return {
			result: parsedTemplate,
		};
	},

	"generate-text": async (node, targetsData) => {
		const generateNode = node as GenerateTextNode;
		const system = targetsData?.system;
		const prompt = targetsData?.prompt;
		if (!prompt) {
			throw new Error("Prompt not found");
		}

		const result = await generateAIText({
			prompt,
			system,
			model: generateNode.data.config.model,
			tools: generateNode.data.dynamicHandles.tools,
		});

		return result.parsedResult;
	},

	"visualize-text": async () => {
		return undefined;
	},
};
