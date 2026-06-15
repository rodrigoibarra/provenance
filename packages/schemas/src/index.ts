import { z } from "zod";

export const CoffeeBagSchema = z.object({
  id: z.number().int().positive(),
  roaster: z.string().nullable(),
  origin: z.string().nullable(),
  variety: z.string().nullable(),
  process: z.string().nullable(),
  farm: z.string().nullable(),
  producer: z.string().nullable(),
  status: z.enum(["active", "finished"]),
  createdAt: z.number().int(),
  updatedAt: z.number().int(),
});

export const CreateCoffeeBagSchema = CoffeeBagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateCoffeeBagSchema = CreateCoffeeBagSchema.partial();

export type CoffeeBag = z.infer<typeof CoffeeBagSchema>;
export type CreateCoffeeBag = z.infer<typeof CreateCoffeeBagSchema>;
export type UpdateCoffeeBag = z.infer<typeof UpdateCoffeeBagSchema>;
