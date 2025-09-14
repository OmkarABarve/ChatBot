// AI-SDK Tool: Conclusion
// This tool will handle conclusion-related AI functionality

import { tool } from 'ai';
import { z } from 'zod';

const ConclusionDescription = `Use this tool to make a conclusion about the user's proficiency in Microsoft Excel.
  This tool is to be trigerred after the user has answered all the 10 questions.`;

const ConclusionSchema = z.object({
  conclusion: z
    .string()
    .optional()
    .describe("The conclusion about the user's proficiency in Microsoft Excel"),

});

type ToolSchemaType = z.infer<typeof ConclusionSchema>;

export function createConclusionTool() {
  return tool<ToolSchemaType, string>({
    description: ConclusionDescription,
    inputSchema: ConclusionSchema,
    execute: async () => {
      console.log('Conclusion tool executed');
      return `Conclusion tool executed`;
    },
  });
}
