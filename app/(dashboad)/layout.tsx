import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SidePanel from "@/components/SidePanel";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";
import ClientProvider from "@/components/ClientProvider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Dashboard",
  description: "Dashboard view",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <SidePanel />
              <div className="flex flex-col">
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
