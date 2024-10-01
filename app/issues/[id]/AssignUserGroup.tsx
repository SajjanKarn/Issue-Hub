"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const AssignUserGroup = () => {
  const [user, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/api/user");
      if (res.status === 200) {
        setUsers(res.data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Select>
      <SelectTrigger className="w-full xl:w-[200px]">
        <SelectValue placeholder="Assign a user..." />
      </SelectTrigger>
      <SelectContent>
        {user.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssignUserGroup;
