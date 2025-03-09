import { useAuth } from '@clerk/nextjs';

export function ResumeList() {
  const { getToken } = useAuth();

  const fetchResumes = async () => {
    try {
      const token = await getToken();
      const response = await fetch('/api/resumes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // ... handle response
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  // ... rest of the component
} 