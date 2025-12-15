import { Injectable } from '@nestjs/common';
import { UrlData } from './entities/shortener.entity';
import { InjectModel } from '@nestjs/sequelize/dist/common/sequelize.decorators';
import { ModelCtor } from 'sequelize-typescript';

@Injectable()
export class ShortenerRepository {
  constructor(@InjectModel(UrlData) private urlData: ModelCtor<UrlData>) {}

  async findAll() {
    return this.urlData.findAll();
  }

  async createShortUrl(longUrl: string) {
    return this.urlData.create({ longUrl });
  }
}
