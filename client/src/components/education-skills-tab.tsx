import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Edit2, Check } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User } from "@shared/schema";

const educationSkillsSchema = z.object({
  school: z.string().optional(),
  degree: z.string().optional(),
  course: z.string().optional(),
  yearOfCompletion: z.string().optional(),
  grade: z.string().optional(),
  skills: z.string().optional(),
  projects: z.string().optional(),
});

type EducationSkillsFormData = z.infer<typeof educationSkillsSchema>;

interface EducationSkillsTabProps {
  user: User;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export function EducationSkillsTab({ user, isEditing, setIsEditing }: EducationSkillsTabProps) {
  const { toast } = useToast();
  const form = useForm<EducationSkillsFormData>({
    resolver: zodResolver(educationSkillsSchema),
    defaultValues: {
      school: user.school || "",
      degree: user.degree || "",
      course: user.course || "",
      yearOfCompletion: user.yearOfCompletion || "",
      grade: user.grade || "",
      skills: user.skills || "",
      projects: user.projects || "",
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: EducationSkillsFormData) => {
      return await apiRequest<User>("PATCH", `/api/users/${user.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", user.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Profile updated",
        description: "Your education and skills information has been updated successfully.",
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

  const onSubmit = (data: EducationSkillsFormData) => {
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
          <h2 className="text-xl font-semibold">Education Details</h2>
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="text-primary"
              data-testid="button-edit-education"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School / College</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Lincoln College"
                        {...field}
                        disabled={!isEditing}
                        data-testid="input-school"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highest degree or equivalent</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Bachelors in Technology"
                        {...field}
                        disabled={!isEditing}
                        data-testid="input-degree"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Computer science engineering"
                        {...field}
                        disabled={!isEditing}
                        data-testid="input-course"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearOfCompletion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of completion</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!isEditing}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-year-of-completion">
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from(
                          { length: 50 },
                          (_, i) => new Date().getFullYear() - i + 10
                        ).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter here"
                        {...field}
                        disabled={!isEditing}
                        data-testid="input-grade"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-6">
              <h2 className="text-xl font-semibold mb-6">Skills & Projects</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter here"
                          className="resize-none min-h-[120px]"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-skills"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projects</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter here"
                          className="resize-none min-h-[120px]"
                          {...field}
                          disabled={!isEditing}
                          data-testid="input-projects"
                        />
                      </FormControl>
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
                  data-testid="button-cancel-education"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="gap-2"
                  data-testid="button-save-education"
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
