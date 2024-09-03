import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {Profile} from "@/components/Profile";


const Dashboard: React.FC = async () => {
  const session = await getServerSession(authOptions);

  // Redirect to the built-in NextAuth sign-in page if not authenticated
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div>
    
    </div>
  );
};

export default Dashboard;
