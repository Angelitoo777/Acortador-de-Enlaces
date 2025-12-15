import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlData } from './entities/shortener.entity';

@Module({
  imports: [SequelizeModule.forFeature([UrlData])],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
