"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShortenerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_shortener_dto_1 = require("./create-shortener.dto");
class UpdateShortenerDto extends (0, mapped_types_1.PartialType)(create_shortener_dto_1.CreateShortenerDto) {
}
exports.UpdateShortenerDto = UpdateShortenerDto;
//# sourceMappingURL=update-shortener.dto.js.map