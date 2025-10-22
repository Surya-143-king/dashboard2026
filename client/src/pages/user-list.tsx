import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Eye, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddUserModal } from "@/components/add-user-modal";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export default function UserList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { data: users, isLoading, isError, error } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/users/${id}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "User deleted",
        description: "The user has been deleted successfully.",
      });
      setDeleteUserId(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    },
  });

  const handleDeleteClick = (userId: string) => {
    setDeleteUserId(userId);
  };

  const handleDeleteConfirm = () => {
    if (deleteUserId) {
      deleteUserMutation.mutate(deleteUserId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="border-2 border-foreground px-4 py-2 text-sm font-bold tracking-wider">
              LOGO
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
            <Button variant="ghost" size="icon" className="text-primary" data-testid="button-user-menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Users</h1>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="gap-2"
            data-testid="button-add-user"
          >
            <UserPlus className="w-4 h-4" />
            Add user
          </Button>
        </div>

        {isLoading ? (
          <div className="bg-card rounded-lg border border-card-border p-8">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-64 bg-muted animate-pulse rounded" />
                  <div className="ml-auto h-4 w-20 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : isError ? (
          <div className="bg-card rounded-lg border border-card-border p-12 text-center">
            <p className="text-destructive mb-4">Failed to load users</p>
            <p className="text-sm text-muted-foreground mb-4">{error?.message || "An error occurred"}</p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/users"] })}>
              Retry
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-card-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Sr. No</TableHead>
                  <TableHead className="text-foreground font-semibold">User name</TableHead>
                  <TableHead className="text-foreground font-semibold">E-mail</TableHead>
                  <TableHead className="text-right text-foreground font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className="border-b border-border last:border-0 hover-elevate"
                      data-testid={`row-user-${user.id}`}
                    >
                      <TableCell className="text-foreground">{index + 1}</TableCell>
                      <TableCell className="text-foreground" data-testid={`text-username-${user.id}`}>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell className="text-foreground" data-testid={`text-email-${user.id}`}>
                        {user.email}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/users/${user.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              data-testid={`button-view-${user.id}`}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteClick(user.id)}
                            data-testid={`button-delete-${user.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      No users found. Click "Add user" to create your first user.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AddUserModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />

      <AlertDialog open={deleteUserId !== null} onOpenChange={(open) => !open && setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
