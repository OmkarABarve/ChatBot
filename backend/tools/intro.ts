import { tool } from 'ai';
import { z } from 'zod';

const IntroDescription = `This is the first tool that you will use to introduce the user to the interviewer. 
  >Tell the user that you are an interviewer and you will be asking them questions regarding Microsoft Excel.
  >Ask user if he's understood.
  >Then explain the user about the interview process:
  "This is a ChatBot based Interview. You'll be asked questions regarding Microsoft Excel. You have to answer the questions based on your knowledge of Microsoft Excel."
  >Ask user if he's understood.
  Execute only after the user has responded twice.`;

const IntroSchema = z.object({
  userresponse1: z.string().optional().describe("The user's response to the introduction"),
  userresponse2: z.string().optional().describe("The user's response to the explanation"),
});
type ToolSchemaType = z.infer<typeof IntroSchema>;
export function createIntroductionTool() {
  return tool<ToolSchemaType, string>({
    description: IntroDescription,
    inputSchema: IntroSchema,
    execute: async () => {
      console.log('Intro & Explanation tool executed'); // Check BT
      return `Intro & Explanation tool executed, start asking interview questions`;
    },
  });
}
