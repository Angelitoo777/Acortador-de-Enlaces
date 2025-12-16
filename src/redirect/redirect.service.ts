import { Injectable, NotFoundException } from '@nestjs/common';
import { RedirectRepository } from './redirect.repository';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RedirectService {
  constructor(
    private redirectRepository: RedirectRepository,
    private redisService: RedisService,
  ) {}

  async findByShortCode(shortUrl: string) {
    const cacheData = await this.redisService.get(`url:${shortUrl}`);

    if (cacheData) {
      await this.redirectRepository.clickCountIncrement(shortUrl);

      await this.redisService.del('top');

      return cacheData;
    }

    const shortCodeData =
      await this.redirectRepository.getByShortCode(shortUrl);

    if (!shortCodeData) {
      throw new NotFoundException('No se ha encontrado esta url');
    }

    await this.redisService.set(shortUrl, shortCodeData.longUrl, 3600);

    await this.redirectRepository.clickCountIncrement(shortUrl);

    await this.redisService.del('top');

    return shortCodeData.longUrl;
  }

  async findTopUrls() {
    const cacheData = await this.redisService.get('top');

    if (cacheData) {
      return await this.redisService.get('top');
    }

    const topUrl = await this.redirectRepository.findByMostClick();

    await this.redisService.setArray('top', topUrl, 3600);

    return topUrl;
  }
}
