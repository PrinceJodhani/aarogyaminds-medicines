// "use client";

// import { Inter as FontSans } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider";
// import SidePanel from "@/components/SidePanel";
// import TopBar from "@/components/TopBar";
// import { cn } from "@/lib/utils";
// import ClientProvider from "@/components/ClientProvider";
// import { Toaster } from "@/components/ui/toaster";
// import { useState } from "react";
// import { Menu } from "lucide-react";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// // export const metadata = {
// //   title: "Dashboard",
// //   description: "Dashboard view",
// // };

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <html lang="en">
//       <body
//         className={cn(
//           "min-h-screen bg-background font-sans antialiased",
//           fontSans.variable
//         )}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <ClientProvider>
//             <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//               <button
//                 className="fixed top-4 left-4 z-50 md:hidden"
//                 onClick={toggleSidebar}
//               >
//                 <Menu className="h-6 w-6" />
//               </button>
//               <SidePanel isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//               <div className="flex flex-col w-full">
//                 <TopBar />
//                 <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
//                   {children}
//                 </main>
//                 <Toaster />
//               </div>
//             </div>
//           </ClientProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }




//////////////////////////////////

"use client";

import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SidePanel from "@/components/SidePanel";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";
import ClientProvider from "@/components/ClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Handle clicking outside of the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProvider>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
              {!isSidebarOpen && (
                <button
                  className="fixed top-4 left-4 z-50 md:hidden"
                  onClick={toggleSidebar}
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
              <SidePanel
                ref={sidebarRef}
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
              />
              <div className="flex flex-col w-full">
                <TopBar />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                  {children}
                </main>
                <Toaster />
              </div>
            </div>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

