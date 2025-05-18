// src/lib/actions/policy.actions.ts
"use server";

import { summarizePolicy, type SummarizePolicyInput, type SummarizePolicyOutput } from '@/ai/flows/summarize-policy';
import { z } from 'zod';

const PolicyAdvisorSchema = z.object({
  employeeName: z.string().min(1, "Employee name is required"),
  department: z.string().min(1, "Department is required"),
  leaveType: z.string().min(1, "Leave type is required"),
  companyPolicy: z.string().min(50, "Company policy text must be at least 50 characters"),
});

export async function getPolicySummary(
  input: z.infer<typeof PolicyAdvisorSchema>
): Promise<{ success: boolean; data?: SummarizePolicyOutput; error?: string }> {
  
  const validatedInput = PolicyAdvisorSchema.safeParse(input);

  if (!validatedInput.success) {
    // Collect all error messages
    const errorMessages = validatedInput.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n');
    return { success: false, error: `Invalid input:\n${errorMessages}` };
  }

  try {
    // Simulate some delay as AI processing can take time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const summaryOutput: SummarizePolicyOutput = await summarizePolicy(validatedInput.data);
    return { success: true, data: summaryOutput };

  } catch (error) {
    console.error("Error in getPolicySummary:", error);
    return { success: false, error: "Failed to generate policy summary. Please try again." };
  }
}
