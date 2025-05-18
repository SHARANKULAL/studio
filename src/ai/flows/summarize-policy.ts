'use server';

/**
 * @fileOverview Summarizes the leave policies applicable to a user.
 *
 * - summarizePolicy - A function that summarizes the leave policies.
 * - SummarizePolicyInput - The input type for the summarizePolicy function.
 * - SummarizePolicyOutput - The return type for the summarizePolicy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePolicyInputSchema = z.object({
  employeeName: z.string().describe('The name of the employee.'),
  department: z.string().describe('The department of the employee.'),
  leaveType: z.string().describe('The type of leave being requested (e.g., vacation, sick leave).'),
  companyPolicy: z.string().describe('The company leave policy document.'),
});

export type SummarizePolicyInput = z.infer<typeof SummarizePolicyInputSchema>;

const SummarizePolicyOutputSchema = z.object({
  summary: z.string().describe('A summary of the leave policies applicable to the employee.'),
});

export type SummarizePolicyOutput = z.infer<typeof SummarizePolicyOutputSchema>;

export async function summarizePolicy(input: SummarizePolicyInput): Promise<SummarizePolicyOutput> {
  return summarizePolicyFlow(input);
}

const summarizePolicyPrompt = ai.definePrompt({
  name: 'summarizePolicyPrompt',
  input: {schema: SummarizePolicyInputSchema},
  output: {schema: SummarizePolicyOutputSchema},
  prompt: `You are an HR expert specializing in leave policy interpretation.

  Given the following information, summarize the leave policies applicable to the employee.

  Employee Name: {{{employeeName}}}
  Department: {{{department}}}
  Leave Type: {{{leaveType}}}
  Company Policy: {{{companyPolicy}}}

  Provide a concise summary of the policies relevant to the employee's leave request.`,
});

const summarizePolicyFlow = ai.defineFlow(
  {
    name: 'summarizePolicyFlow',
    inputSchema: SummarizePolicyInputSchema,
    outputSchema: SummarizePolicyOutputSchema,
  },
  async input => {
    const {output} = await summarizePolicyPrompt(input);
    return output!;
  }
);
