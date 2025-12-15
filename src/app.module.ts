import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShortenerModule } from './shortener/shortener.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlData } from './shortener/entities/shortener.entity';
import { RedisModule } from './redis/redis.module';

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
    ShortenerModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
