import { Injectable } from '@nestjs/common';
import { UrlData } from 'src/shortener/entities/shortener.entity';
import { InjectModel } from '@nestjs/sequelize/dist/common/sequelize.decorators';
import { ModelCtor } from 'sequelize-typescript';
import { Op } from 'sequelize';

@Injectable()
export class RedirectRepository {
  constructor(@InjectModel(UrlData) private urlData: ModelCtor<UrlData>) {}

  async getByShortCode(shortUrl: string) {
    return await this.urlData.findOne({ where: { shortUrl } });
  }

  async clickCountIncrement(shortUrl: string) {
    return await this.urlData.increment('clickCount', {
      by: 1,
      where: { shortUrl },
    });
  }

  async findByMostClick() {
    const topUrls = await this.urlData.findAll({
      order: [['clickCount', 'DESC']],
      limit: 3,
      attributes: ['longUrl', 'shortUrl', 'clickCount'],
      where: {
        clickCount: {
          [Op.gt]: 0,
        },
      },
    });

    return topUrls;
  }
}
