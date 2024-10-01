import { z } from "zod";

const issueSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(1),
});

const patchIssueSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long.")
    .max(255, "Title must be at most 255 characters long.")
    .optional(),
  description: z
    .string()
    .min(1, "Description must be at least 1 character long.")
    .max(65000, "Title must not be greater than 65000 characters")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned to user ID must be at least 1 character long.")
    .max(255)
    .optional()
    .nullable(),
});

export { patchIssueSchema };

export default issueSchema;
