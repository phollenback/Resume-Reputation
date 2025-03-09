import { db } from "@/lib/db";
import { resumeTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DetailedProgress } from "@/components/DetailedProgress";

export default async function ResumeDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  
  const resume = await db.select().from(resumeTable)
    .where(eq(resumeTable.id, Number(id)))
    .then(res => res[0]);

  if (!resume) return <div>Resume not found</div>;

  return (
    <div className="container mx-auto p-8 space-y-8 font-['Times_New_Roman'] text-center">
      <div className="flex justify-between items-start border-b border-gray-200 pb-6">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-2">{resume.positionTitle}</h1>
          <h2 className="text-xl text-muted-foreground italic">{resume.company}</h2>
        </div>
        <Button asChild variant="secondary" className="shadow-sm hover:shadow-md transition-all">
          <Link href="/resumes">Back to Resumes</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-primary">Details</h3>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {resume.details || "No additional details provided"}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <DetailedProgress 
            resumeId={resume.id}
            initialProgress={resume.progress || 'applied'}
            completed={calculateCompletion(resume.progress || 'applied')}
          />
        </div>
      </div>
    </div>
  );
}

function calculateCompletion(progress: string) {
  const steps = [
    'applied', 'phone_screen', 'technical_test', 
    'interview_1', 'interview_2', 'offer_received', 'hired'
  ];
  const index = steps.indexOf(progress);
  return Math.round(((index + 1) / steps.length) * 100);
} 