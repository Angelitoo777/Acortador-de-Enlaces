import { Injectable } from '@nestjs/common';
import { ShortenerRepository } from './shortener.repository';
import Hashids from 'hashids';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ShortenerService {
  constructor(
    private shortenerRepository: ShortenerRepository,
    private configService: ConfigService,
    private redisService: RedisService,
  ) {}
  private readonly hashids = new Hashids(
    this.configService.getOrThrow('HASHIDS_SALTS'),
    7,
  );

  findAll() {
    return this.shortenerRepository.findAll();
  }

  async createShortUrl(longUrl: string) {
    const newUrlData = await this.shortenerRepository.createShortUrl(longUrl);

    const numericId = newUrlData.id;

    const shortUrl = this.hashids.encode(numericId);

    await newUrlData.update({ shortUrl });

    await this.redisService.set(`url:${shortUrl}`, longUrl, 3600);

    return newUrlData;
  }
}
