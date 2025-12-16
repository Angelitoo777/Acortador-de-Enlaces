import { z } from 'zod';

export const CreateShortenerDtoSchema = z.object({
  longUrl: z.string().url(),
});

export type CreateShortenerDto = z.infer<typeof CreateShortenerDtoSchema>;
