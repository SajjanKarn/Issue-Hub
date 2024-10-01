"use client";
import Skeleton from "@/components/shared/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssignUserGroup = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });

  if (isLoading) return <Skeleton width="10rem" height="2rem" />;

  if (error) return null;

  return (
    <Select>
      <SelectTrigger className="w-full xl:w-[200px]">
        <SelectValue placeholder="Assign a user..." />
      </SelectTrigger>
      <SelectContent>
        <p className="p-2 text-xs text-gray-500">Suggestions</p>
        {users?.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssignUserGroup;
