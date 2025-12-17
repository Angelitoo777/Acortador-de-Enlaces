"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerController = void 0;
const common_1 = require("@nestjs/common");
const shortener_service_1 = require("./shortener.service");
const create_shortener_dto_1 = require("./dto/create-shortener.dto");
const shortener_pipe_1 = require("./pipes/shortener.pipe");
const throttler_1 = require("@nestjs/throttler");
let ShortenerController = class ShortenerController {
    constructor(shortenerService) {
        this.shortenerService = shortenerService;
    }
    findAll() {
        return this.shortenerService.findAll();
    }
    async create(createShortenerDto) {
        const result = await this.shortenerService.createShortUrl(createShortenerDto);
        return {
            message: 'Url acortada exitosamente',
            data: result,
        };
    }
};
exports.ShortenerController = ShortenerController;
__decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShortenerController.prototype, "findAll", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 3 } }),
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new shortener_pipe_1.ZodValidationPipe(create_shortener_dto_1.CreateShortenerDtoSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShortenerController.prototype, "create", null);
exports.ShortenerController = ShortenerController = __decorate([
    (0, common_1.Controller)('shortener'),
    __metadata("design:paramtypes", [shortener_service_1.ShortenerService])
], ShortenerController);
//# sourceMappingURL=shortener.controller.js.map