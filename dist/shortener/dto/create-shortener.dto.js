"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShortenerDtoSchema = void 0;
const zod_1 = require("zod");
exports.CreateShortenerDtoSchema = zod_1.z.object({
    longUrl: zod_1.z.string().url(),
});
//# sourceMappingURL=create-shortener.dto.js.map