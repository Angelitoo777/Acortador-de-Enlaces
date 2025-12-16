import { z } from 'zod';

export const ResponseShortenerDtoSchema = z.object({
  longUrl: z.string().url(),
  shortUrl: z.string(),
});

export type ResponseShortenerDto = z.infer<typeof ResponseShortenerDtoSchema>;
