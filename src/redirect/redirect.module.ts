import { Module } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectController } from './redirect.controller';
import { RedirectRepository } from './redirect.repository';
import { RedisService } from 'src/redis/redis.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlData } from 'src/shortener/entities/shortener.entity';
@Module({
  imports: [SequelizeModule.forFeature([UrlData])],
  controllers: [RedirectController],
  providers: [RedirectService, RedirectRepository, RedisService],
})
export class RedirectModule {}
