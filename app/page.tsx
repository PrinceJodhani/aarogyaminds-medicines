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
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div> */}
      {/* <Profile/> */}
    </div>
  );
};

export default Dashboard;
