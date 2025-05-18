// src/components/policy/PolicyAdvisorClient.tsx
"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPolicySummary } from '@/lib/actions/policy.actions';
import type { SummarizePolicyOutput } from '@/ai/flows/summarize-policy';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const policyAdvisorFormSchema = z.object({
  employeeName: z.string().min(1, "Employee name is required."),
  department: z.string().min(1, "Department is required."),
  leaveType: z.string().min(1, "Leave type is required (e.g., Vacation, Sick)."),
  companyPolicy: z.string().min(50, "Company policy text must be at least 50 characters long."),
});

export function PolicyAdvisorClient() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [summary, setSummary] = useState<SummarizePolicyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof policyAdvisorFormSchema>>({
    resolver: zodResolver(policyAdvisorFormSchema),
    defaultValues: {
      employeeName: user?.name || "",
      department: "",
      leaveType: "",
      companyPolicy: "",
    },
  });
  
  React.useEffect(() => {
    if (user?.name && !form.getValues("employeeName")) {
      form.setValue("employeeName", user.name);
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof policyAdvisorFormSchema>) {
    setIsLoading(true);
    setSummary(null);
    setError(null);
    try {
      const result = await getPolicySummary(values);
      if (result.success && result.data) {
        setSummary(result.data);
        toast({
          title: "Policy Summary Generated",
          description: "The AI has summarized the policy for you.",
        });
      } else {
        setError(result.error || "Failed to get summary.");
        toast({
          title: "Error",
          description: result.error || "Could not generate policy summary.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching the summary.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-semibold">Vacation Policy Advisor</CardTitle>
          </div>
          <CardDescription>
            Enter employee details and the company's leave policy text to get an AI-powered summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="employeeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Engineering, Marketing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leave Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Vacation, Sick Leave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyPolicy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Policy Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the relevant company leave policy text here..."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide the full text of the company's leave policy.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  <>
                    Get AI Summary <Sparkles className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-lg lg:sticky lg:top-20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
             <Sparkles className="h-6 w-6 text-accent" />
            AI Policy Summary
          </CardTitle>
          <CardDescription>The generated summary will appear below.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] prose dark:prose-invert prose-sm max-w-none">
          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Generating your policy summary...</p>
              <p className="text-xs">This may take a moment.</p>
            </div>
          )}
          {error && !isLoading && (
             <Alert variant="destructive">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Error Generating Summary</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!isLoading && !error && summary && (
            <div className="p-4 bg-muted rounded-md">
              <p className="whitespace-pre-wrap">{summary.summary}</p>
            </div>
          )}
          {!isLoading && !error && !summary && (
            <p className="text-muted-foreground italic">
              Submit the form to see the AI-generated policy summary.
            </p>
          )}
        </CardContent>
        {summary && !isLoading && (
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              This summary is AI-generated and for informational purposes only. Always refer to the official company policy.
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
