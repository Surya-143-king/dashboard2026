import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import UserList from "@/pages/user-list";
import UserProfile from "@/pages/user-profile";
import NotFound from "@/pages/not-found";
import vegaLogo from "@assets/generated_images/Vega_organization_professional_logo_ade0e9ad.png";
import type { User } from "@shared/schema";

function Router() {
  return (
    <Switch>
      <Route path="/" component={UserList} />
      <Route path="/users/:id" component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });
  const currentUser = users?.[0];

  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-4">
          <SidebarTrigger data-testid="button-sidebar-toggle" />
          <div className="flex items-center gap-3">
            <img
              src={vegaLogo}
              alt="Vega Logo"
              className="w-8 h-8 rounded-md"
            />
            <h1 className="text-xl font-bold text-foreground">Vega</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {currentUser && (
            <UserMenu
              currentUserId={currentUser.id}
              currentUserName={`${currentUser.firstName} ${currentUser.lastName}`}
            />
          )}
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Router />
      </main>
    </div>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <AppContent />
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
