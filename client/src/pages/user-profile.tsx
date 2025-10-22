import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BasicInfoTab } from "@/components/basic-info-tab";
import { EducationSkillsTab } from "@/components/education-skills-tab";
import { ExperienceTab } from "@/components/experience-tab";
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Email copied successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
          <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 flex items-center justify-center min-h-full">
        <div className="text-center">
          <p className="text-destructive mb-2 font-semibold">Failed to load user profile</p>
          <p className="text-sm text-muted-foreground mb-4">{error?.message || "An error occurred"}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>Go back</Button>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/users", params?.id] })}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-full">
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
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
          <p className="text-muted-foreground mt-1">
            View and manage user information
          </p>
        </div>
      </div>

      <div className="bg-card rounded-md border border-card-border p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.gender && (
                  <Badge variant="secondary">{user.gender}</Badge>
                )}
                {user.yearOfBirth && (
                  <Badge variant="secondary">
                    <Calendar className="w-3 h-3 mr-1" />
                    Born {user.yearOfBirth}
                  </Badge>
                )}
              </div>
            </div>
            <div className="grid gap-2 text-sm">
              {user.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{user.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic" data-testid="tab-basic">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="education" data-testid="tab-education">
            Education & Skills
          </TabsTrigger>
          <TabsTrigger value="experience" data-testid="tab-experience">
            Experience
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <BasicInfoTab
            user={user}
            isEditing={isEditingBasic}
            setIsEditing={setIsEditingBasic}
          />
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <EducationSkillsTab
            user={user}
            isEditing={isEditingEducation}
            setIsEditing={setIsEditingEducation}
          />
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <ExperienceTab
            user={user}
            isEditing={isEditingExperience}
            setIsEditing={setIsEditingExperience}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
