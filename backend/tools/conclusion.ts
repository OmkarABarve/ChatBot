// AI-SDK Tool: Conclusion
// This tool will handle conclusion-related AI functionality

import { tool } from 'ai';
import { z } from 'zod';

const ConclusionDescription = `Use this tool to make a conclusion about the user's proficiency in Microsoft Excel.
 Tell him what topics he performed well and what topics he needs to improve on.
  This tool is to be trigerred after the user has answered all the 10 questions.
  
  When user is asked about the conclusion and he replies, Write a Summary of the user's performance and execute this tool.`;

const ConclusionSchema = z.object({
  userresponse2: z.string().optional().describe("The user's response to the conclusion"),
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
    execute: async (data: ToolSchemaType): Promise<string> => {
      console.log('Conclusion tool executed\n', data);

      return `Conclusion tool executed`;
    },
  });
}
