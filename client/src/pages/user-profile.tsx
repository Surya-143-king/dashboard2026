import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BasicInfoTab } from "@/components/basic-info-tab";
import { EducationSkillsTab } from "@/components/education-skills-tab";
import { ExperienceTab } from "@/components/experience-tab";
import { UserMenu } from "@/components/user-menu";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export default function UserProfile() {
  const [, params] = useRoute("/users/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);

  const { data: user, isLoading, isError, error } = useQuery<User>({
    queryKey: ["/api/users", params?.id],
    enabled: !!params?.id,
  });

  // Get all users to find the "logged-in" user (first user in the list)
  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });
  const currentUser = users?.[0];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Email copied successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load user profile</p>
          <p className="text-sm text-muted-foreground mb-4">{error?.message || "An error occurred"}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>Go back</Button>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/users", params?.id] })}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">User not found</p>
          <Button onClick={() => navigate("/")}>Go back</Button>
        </div>
      </div>
    );
  }

  const getInitials = () => {
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xl font-bold shadow-lg">
              SR
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" data-testid="button-search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </Button>
            {currentUser && (
              <UserMenu
                currentUserId={currentUser.id}
                currentUserName={`${currentUser.firstName} ${currentUser.lastName}`}
              />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="bg-card rounded-lg border border-card-border p-8 mb-6">
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="w-32 h-32 mb-4 border-4 border-primary shadow-xl">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent text-primary text-3xl font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-semibold mb-2" data-testid="text-user-name">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <span data-testid="text-user-email">{user.email}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(user.email)}
                data-testid="button-copy-email"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            {user.phone && (
              <p className="text-muted-foreground" data-testid="text-user-phone">
                +91 {user.phone}
              </p>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="basic"
                className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 transition-colors"
                data-testid="tab-basic-info"
              >
                Basic Info
                {activeTab === "basic" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 transition-colors"
                data-testid="tab-education"
              >
                Education & Skills
                {activeTab === "education" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 transition-colors"
                data-testid="tab-experience"
              >
                Experience
                {activeTab === "experience" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
                )}
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="basic" className="mt-0">
                <BasicInfoTab
                  user={user}
                  isEditing={isEditingBasic}
                  setIsEditing={setIsEditingBasic}
                />
              </TabsContent>

              <TabsContent value="education" className="mt-0">
                <EducationSkillsTab
                  user={user}
                  isEditing={isEditingEducation}
                  setIsEditing={setIsEditingEducation}
                />
              </TabsContent>

              <TabsContent value="experience" className="mt-0">
                <ExperienceTab
                  user={user}
                  isEditing={isEditingExperience}
                  setIsEditing={setIsEditingExperience}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
