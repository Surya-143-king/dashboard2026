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

const basicInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  yearOfBirth: z.string().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  alternatePhone: z.string().optional(),
  address: z.string().optional(),
  pincode: z.string().optional(),
  domicileState: z.string().optional(),
  domicileCountry: z.string().optional(),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

interface BasicInfoTabProps {
  user: User;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export function BasicInfoTab({ user, isEditing, setIsEditing }: BasicInfoTabProps) {
  const { toast } = useToast();
  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      yearOfBirth: user.yearOfBirth || "",
      gender: user.gender || "",
      phone: user.phone || "",
      alternatePhone: user.alternatePhone || "",
      address: user.address || "",
      pincode: user.pincode || "",
      domicileState: user.domicileState || "",
      domicileCountry: user.domicileCountry || "",
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: BasicInfoFormData) => {
      return await apiRequest<User>("PATCH", `/api/users/${user.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", user.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Profile updated",
        description: "Your basic information has been updated successfully.",
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

  const onSubmit = (data: BasicInfoFormData) => {
    updateUserMutation.mutate(data);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Basic Details</h2>
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="text-primary"
            data-testid="button-edit-basic"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. John"
                      {...field}
                      disabled={!isEditing}
                      data-testid="input-first-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Doe"
                      {...field}
                      disabled={!isEditing}
                      data-testid="input-last-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email ID</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g. mrnobody@mail.com"
                      {...field}
                      disabled={!isEditing}
                      data-testid="input-email-id"
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
              name="yearOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of birth</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditing}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-year-of-birth">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i).map(
                        (year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditing}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-gender">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <div className="flex gap-2">
                    <div className="w-20">
                      <Input value="+91" disabled className="bg-muted" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="8332883854"
                        {...field}
                        disabled={!isEditing}
                        data-testid="input-phone"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter here"
                      className="resize-none"
                      rows={3}
                      {...field}
                      disabled={!isEditing}
                      data-testid="input-address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter here"
                      {...field}
                      disabled={!isEditing}
                      data-testid="input-pincode"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alternatePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Phone no</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 9876543210"
                      {...field}
                      disabled={!isEditing}
                      data-testid="input-alternate-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="domicileState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domicile state</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditing}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-domicile-state">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domicileCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domicile country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isEditing}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-domicile-country">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isEditing && (
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={updateUserMutation.isPending}
                data-testid="button-cancel-basic"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateUserMutation.isPending}
                className="gap-2"
                data-testid="button-save-basic"
              >
                <Check className="w-4 h-4" />
                {updateUserMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
