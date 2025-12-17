import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShortenerModule } from './shortener/shortener.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlData } from './shortener/entities/shortener.entity';
import { RedisModule } from './redis/redis.module';
import { RedirectModule } from './redirect/redirect.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { RedisService } from './redis/redis.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        uri: config.getOrThrow<string>('DATABASE_URL'),
        synchronize: true,
        autoLoadModels: true,
        models: [UrlData],
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      inject: [RedisService],
      useFactory: (redisService: RedisService) => ({
        storage: new ThrottlerStorageRedisService(redisService.getClient()),

        throttlers: [
          {
            ttl: 60000,
            limit: 10,
          },
        ],
      }),
    }),
    ShortenerModule,
    RedisModule,
    RedirectModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
