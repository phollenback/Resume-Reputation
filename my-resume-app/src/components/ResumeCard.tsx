import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProgressTracker } from "./ProgressTracker";

interface ResumeCardProps {
  resume: {
    id: number;
    positionTitle: string;
    company: string;
    keywords: string[];
    created_at: string;
    fileUrl?: string;
    progress: string;
    points: number;
  };
}

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow border border-border/50">
      <CardHeader>
        <CardTitle className="text-primary">{resume.positionTitle}</CardTitle>
        <CardDescription className="text-secondary">{resume.company}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">Keywords:</span> {resume.keywords.join(', ')}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">Uploaded:</span> {new Date(resume.created_at).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">Points:</span>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full">
            {resume.points}
          </span>
        </div>
        <ProgressTracker completed={calculateCompletion(resume.progress)} />
        <div className="flex gap-2 w-full">
          {resume.fileUrl && (
            <Button 
              variant="secondary" 
              className="flex-1"
              asChild
            >
              <Link href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                View Resume
              </Link>
            </Button>
          )}
          <Button 
            variant="default" 
            className="flex-1"
            asChild
          >
            <Link href={`/resumes/${resume.id}`}>Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function calculateCompletion(progress: string) {
  const steps = ['applied', 'phone_screen', 'technical_test', 'interview_1', 'interview_2', 'offer_received', 'hired'];
  const index = steps.indexOf(progress);
  return Math.round(((index + 1) / steps.length) * 100);
} 