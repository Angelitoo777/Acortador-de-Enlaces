import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlData } from './entities/shortener.entity';
import { ShortenerRepository } from './shortener.repository';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [SequelizeModule.forFeature([UrlData])],
  controllers: [ShortenerController],
  providers: [ShortenerService, ShortenerRepository, RedisService],
})
export class ShortenerModule {}
