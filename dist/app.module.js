"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const shortener_module_1 = require("./shortener/shortener.module");
const sequelize_1 = require("@nestjs/sequelize");
const shortener_entity_1 = require("./shortener/entities/shortener.entity");
const redis_module_1 = require("./redis/redis.module");
const redirect_module_1 = require("./redirect/redirect.module");
const throttler_1 = require("@nestjs/throttler");
const nestjs_throttler_storage_redis_1 = require("nestjs-throttler-storage-redis");
const redis_service_1 = require("./redis/redis.service");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    dialect: 'mysql',
                    uri: config.getOrThrow('DATABASE_URL'),
                    synchronize: true,
                    autoLoadModels: true,
                    models: [shortener_entity_1.UrlData],
                }),
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [redis_module_1.RedisModule],
                inject: [redis_service_1.RedisService],
                useFactory: (redisService) => ({
                    storage: new nestjs_throttler_storage_redis_1.ThrottlerStorageRedisService(redisService.getClient()),
                    throttlers: [
                        {
                            ttl: 60000,
                            limit: 10,
                        },
                    ],
                }),
            }),
            shortener_module_1.ShortenerModule,
            redis_module_1.RedisModule,
            redirect_module_1.RedirectModule,
        ],
        controllers: [],
        providers: [{ provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map