import { Injectable } from '@nestjs/common';
import { ShortenerRepository } from './shortener.repository';
import Hashids from 'hashids';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { ResponseShortenerDto } from './dto/response-shortener.dto';

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

  async findAll() {
    return this.shortenerRepository.findAll();
  }

  async createShortUrl(
    longUrl: CreateShortenerDto,
  ): Promise<ResponseShortenerDto> {
    console.log(longUrl);
    const newUrlData = await this.shortenerRepository.createShortUrl(longUrl);

    const numericId = newUrlData.id;

    const shortUrl = this.hashids.encode(numericId);

    await newUrlData.update({ shortUrl });

    await newUrlData.save();

    await this.redisService.set(`url:${shortUrl}`, longUrl.longUrl, 3600);

    return {
      longUrl: newUrlData.longUrl,
      shortUrl: newUrlData.shortUrl,
    };
  }
}
