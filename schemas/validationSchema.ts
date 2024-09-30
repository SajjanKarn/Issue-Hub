import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(1),
});

export default createIssueSchema;
