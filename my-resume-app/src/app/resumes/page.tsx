import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResumeCard } from "../../components/ResumeCard";
import { auth } from '@clerk/nextjs/server';

interface ResumeCardProps {
  id: number;
  userId: number;
  positionTitle: string;
  company: string;
  keywords: string[];
  created_at: string;
  fileUrl?: string;
  progress?: string;
  points?: number;
}

export default async function ResumesPage() {
  const authResult = await auth();
  const token = await authResult.getToken();
  
  if (!authResult.userId) {
    return <div>Please sign in to view resumes</div>;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resumes`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  console.log('API Response:', data); // Debugging line

  if (!Array.isArray(data)) {
    return <div>Error: Unable to load resumes.</div>;
  }

  // Convert keywords string to array
  const resumes = data.map((resume: ResumeCardProps) => ({
    ...resume,
    keywords: Array.isArray(resume.keywords) ? resume.keywords : [resume.keywords],
    progress: resume.progress || 'applied',
    points: resume.points || 0
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Resumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
      <Button asChild className="mt-4">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
} 