'use server'
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {Profile} from "@/components/Profile";
import Link from "next/link";
import { FaPlus, FaList, FaCalendarAlt, FaTachometerAlt } from "react-icons/fa";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

const Dashboard: React.FC = async () => {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);
console.log(session);
  // Redirect to the built-in NextAuth sign-in page if not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
   
   <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        {/* New Blogs Button */}
        <Link href="/addblog">
          <button className="w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
            <FaPlus className="mr-2 text-xl" />
            New Blogs
          </button>
        </Link>

        {/* Your Blogs Button */}
        <Link href="/viewblogs">
          <button className="w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
            <FaList className="mr-2 text-xl" />
            Your Blogs
          </button>
        </Link>

        {/* Appointments Button (Disabled) */}
        <button
          disabled
          className="w-full flex items-center justify-center bg-gray-300 text-gray-500 font-semibold py-4 rounded-xl cursor-not-allowed"
        >
          <FaCalendarAlt className="mr-2 text-xl" />
          Appointments
        </button>

        {/* Dashboard Button (Disabled) */}
        <button
          disabled
          className="w-full flex items-center justify-center bg-gray-300 text-gray-500 font-semibold py-4 rounded-xl cursor-not-allowed"
        >
          <FaTachometerAlt className="mr-2 text-xl" />
          Dashboard
        </button>
      </div>
    </div>
   
  );
};

export default Dashboard;
