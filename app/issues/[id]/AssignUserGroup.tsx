import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AssignUserGroup = () => {
  return (
    <Select>
      <SelectTrigger className="w-full xl:w-[200px]">
        <SelectValue placeholder="Assign a user..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Sajjan Karna</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AssignUserGroup;
