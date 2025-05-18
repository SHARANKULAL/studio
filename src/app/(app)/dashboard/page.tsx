// src/app/(app)/dashboard/page.tsx
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, Send, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-none bg-gradient-to-r from-primary to-sky-400 text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold">Welcome back, {user?.name || 'Employee'}!</CardTitle>
          <CardDescription className="text-lg text-primary-foreground/80">
            Manage your leave requests, view team availability, and get policy insights all in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/leave-request">
            <Button variant="secondary" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Request Leave <Send className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Submit a New Leave Request"
          description="Easily request time off with our simple form."
          href="/leave-request"
          icon={<Send className="h-8 w-8 text-accent" />}
          imageSrc="https://placehold.co/600x400.png"
          imageAlt="Leave request form illustration"
          dataAiHint="planning travel"
        />
        <FeatureCard
          title="View Team Calendar"
          description="Check your team's approved leave days at a glance."
          href="/team-calendar"
          icon={<CalendarCheck2 className="h-8 w-8 text-accent" />}
          imageSrc="https://placehold.co/600x400.png"
          imageAlt="Team calendar illustration"
          dataAiHint="team collaboration"
        />
        <FeatureCard
          title="Vacation Policy Advisor"
          description="Get AI-powered summaries of relevant vacation policies."
          href="/policy-advisor"
          icon={<Lightbulb className="h-8 w-8 text-accent" />}
          imageSrc="https://placehold.co/600x400.png"
          imageAlt="AI policy advisor illustration"
          dataAiHint="artificial intelligence"
        />
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  dataAiHint: string;
}

function FeatureCard({ title, description, href, icon, imageSrc, imageAlt, dataAiHint }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
       <div className="relative h-48 w-full">
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          layout="fill" 
          objectFit="cover" 
          data-ai-hint={dataAiHint}
        />
      </div>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={href} passHref>
          <Button variant="outline" className="w-full">
            Go to {title.split(' ')[0]} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

