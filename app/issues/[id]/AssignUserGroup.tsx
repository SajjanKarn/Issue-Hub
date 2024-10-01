"use client";
import Skeleton from "@/components/shared/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AssignUserGroup = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUser();

  if (isLoading) return <Skeleton width="10rem" height="2rem" />;

  if (error) return null;

  const handleAssignUser = async (userId: string) => {
    try {
      const result = await axios.patch(`/api/issue/${issue.id}`, {
        assignedToUserId: userId === "null" ? null : userId,
      });
      if (result.status === 200 && userId === "null") {
        toast.success("User unassigned successfully");
        return;
      }
      if (result.status === 200) {
        toast.success("User assigned successfully");
      }
      // eslint-disable-next-line
    } catch (error) {
      toast.error("Failed to assign user");
    }
  };

  return (
    <Select
      onValueChange={handleAssignUser}
      defaultValue={issue.assignedToUserId || "null"}
    >
      <SelectTrigger className="w-full xl:w-[200px]">
        <SelectValue placeholder="Assign a user..." />
      </SelectTrigger>
      <SelectContent>
        <p className="p-2 text-xs text-gray-500">Suggestions</p>
        <SelectItem value="null">Unassign</SelectItem>
        {users?.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
      <Toaster />
    </Select>
  );
};

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });

export default AssignUserGroup;
