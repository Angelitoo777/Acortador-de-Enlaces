import { z } from 'zod';
export declare const CreateShortenerDtoSchema: z.ZodObject<{
    longUrl: z.ZodString;
}, z.core.$strip>;
export type CreateShortenerDto = z.infer<typeof CreateShortenerDtoSchema>;
