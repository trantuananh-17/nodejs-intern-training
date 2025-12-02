import { z } from "zod";

const bookSchema = z.object({
  id: z.string({ required_error: "Id is required" }),
  name: z.string({ required_error: "Name is required" }),
  author: z.string({ required_error: "Author is required" }),
});

export default bookSchema;
