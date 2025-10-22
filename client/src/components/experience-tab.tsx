import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Edit2, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User, WorkExperience } from "@shared/schema";

const experienceSchema = z.object({
  domain1: z.string().optional(),
  subdomain1: z.string().optional(),
  experience1: z.string().optional(),
  domain2: z.string().optional(),
  subdomain2: z.string().optional(),
  experience2: z.string().optional(),
  linkedIn: z.string().optional(),
  resume: z.string().optional(),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface ExperienceTabProps {
  user: User;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export function ExperienceTab({ user, isEditing, setIsEditing }: ExperienceTabProps) {
  const { toast } = useToast();

  // Parse work experience
  let workExperiences: WorkExperience[] = [];
  try {
    if (user.workExperience) {
      workExperiences = JSON.parse(user.workExperience);
    }
  } catch (e) {
    workExperiences = [];
  }

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      domain1: workExperiences[0]?.domain || "",
      subdomain1: workExperiences[0]?.subdomain || "",
      experience1: workExperiences[0]?.experience || "",
      domain2: workExperiences[1]?.domain || "",
      subdomain2: workExperiences[1]?.subdomain || "",
      experience2: workExperiences[1]?.experience || "",
      linkedIn: user.linkedIn || "",
      resume: user.resume || "",
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: ExperienceFormData) => {
      const experiences: WorkExperience[] = [];
      
      if (data.domain1 || data.subdomain1 || data.experience1) {
        experiences.push({
          domain: data.domain1 || "",
          subdomain: data.subdomain1 || "",
          experience: data.experience1 || "",
        });
      }
      
      if (data.domain2 || data.subdomain2 || data.experience2) {
        experiences.push({
          domain: data.domain2 || "",
          subdomain: data.subdomain2 || "",
          experience: data.experience2 || "",
        });
      }

      return await apiRequest<User>("PATCH", `/api/users/${user.id}`, {
        workExperience: JSON.stringify(experiences),
        linkedIn: data.linkedIn,
        resume: data.resume,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", user.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Profile updated",
        description: "Your experience information has been updated successfully.",
      });
      setIsEditing(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ExperienceFormData) => {
    updateUserMutation.mutate(data);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="text-primary"
              data-testid="button-edit-experience"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* First work experience */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="domain1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Technology"
                        {...field}
                        disabled={!isEditing}
                        data-testid="input-domain-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="subdomain1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-domain</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. MERN Stack"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-subdomain-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isEditing}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-experience-1">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Second work experience */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="domain2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Technology"
                        {...field}
                        disabled={!isEditing}
                        data-testid="input-domain-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="subdomain2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-domain</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. MERN Stack"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-subdomain-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isEditing}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-experience-2">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">LinkedIn</h3>
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="linkedin.com/in/mrbean"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-linkedin"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Resume</h3>
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        {field.value && !isEditing ? (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <FileText className="w-4 h-4" />
                            <span data-testid="text-resume">{field.value}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary"
                              data-testid="button-view-resume"
                            >
                              View
                            </Button>
                          </div>
                        ) : (
                          <FormControl>
                            <Input
                              placeholder="myresume.pdf"
                              {...field}
                              disabled={!isEditing}
                              data-testid="input-resume"
                            />
                          </FormControl>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={updateUserMutation.isPending}
                  data-testid="button-cancel-experience"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="gap-2"
                  data-testid="button-save-experience"
                >
                  <Check className="w-4 h-4" />
                  {updateUserMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
