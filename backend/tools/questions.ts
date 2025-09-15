// AI-SDK Tool: Questions
// This tool will handle question-related AI functionality

import { tool } from 'ai';
import { z } from 'zod';

const Question_Bank = `

---

## 🟢 Easy (Basics)

1. What's the shortcut to select an **entire row** in Excel?
2. Which function would you use to **add numbers** in a range (A1\:A10)?
3. How do you make the text in a cell **bold**?
4. What's the difference between **Save** and **Save As**?
5. How do you **wrap text** inside a cell?
6. What function would you use to **find the highest value** in a range?
7. How do you **insert a new column** between column B and C?

---

## 🟡 Intermediate (Data handling & Lookups)

1. What's the difference between a **relative reference (A1)** and an **absolute reference (\$A\$1)**?
2. Which function would you use to **count only cells containing numbers** in a range?
3. How do you apply a **filter** to show only rows where the "Region" column = "West"?
4. Explain how the **IF function** works. Give an example.
5. Write a formula to **look up a value** in the first column of a table and return a value from the same row (using VLOOKUP).
6. How do you create a **pivot table** to summarize sales by product?
7. What's the difference between **COUNTIF** and **SUMIF**?

---

## 🔴 Advanced (Analysis & Automation)

1. Explain how to use **INDEX + MATCH** instead of VLOOKUP.
2. What's the advantage of **XLOOKUP** over VLOOKUP?
3. How do you use **Goal Seek** in Excel?
4. What's the difference between a **Pivot Chart** and a regular chart?
5. Explain what a **macro** is and how to record one.
6. How do you use **Power Query** to clean and transform data?
7. Write a formula that extracts the **last 3 characters** of a text string in cell A1.

`;

const QuestionsDescription = `This tool will be used to ask the user questions regarding Microsoft Excel.
   Take 3 questions from Easy, 4 from Difficult and 3 from Advanced EACH from the ${Question_Bank} provided and ask the user the questions.
   After every question, evaluate the user's response and give marks to the user in marks. Also add the marks to the Total_Marks. Begin Total_marks with 0 before the first question.
   
   Structure:
   Prefer asking questions based off off the user's response. Count them as a question using your own discretion.
   Ask the questions one by one.
   Let the user answer the questions one by one.
   
  After user answers a question, give it marks, feedback and ask the next question.
  Write Question number in the question.
   Evaluation:
   -> Evaluate the user's response out of 10 and give marks to the answer for that question. Also add the marks to the Total_Marks (maximum possible for 10 questions is 100)
   -> Give the answer "I don't know" 0 marks.
   -> If the answer is incorrect, but user has put thought into it, give marks based off how close the answer is to the correct answer. 
  
  Execute after the user has answered all the 10 questions.
   `;

const QuestionsSchema = z.object({
  marks: z
    .number()
    .optional()
    .describe('The marks obtained by the user out of 10 for the question'),
  Total_Marks: z.number().optional().describe('The total marks of the user out of 100'),
  Answers: z
    .array(z.string())
    .optional()
    .describe('The answers to the questions with question number as the index'),
});

type ToolSchemaType = z.infer<typeof QuestionsSchema>;

export function createQuestionsTool() {
  return tool<ToolSchemaType, string>({
    description: QuestionsDescription,
    inputSchema: QuestionsSchema,
    execute: async (data: ToolSchemaType): Promise<string> => {
      console.log('Questions tool executed\n', data);
      return `Questions tool executed. Move on to the conclusion tool`;
    },
  });
}
