import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import {
  CreateShortenerDto,
  CreateShortenerDtoSchema,
} from './dto/create-shortener.dto';

import { ZodValidationPipe } from './pipes/shortener.pipe';
import { UrlData } from './entities/shortener.entity';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @SkipThrottle()
  @Get()
  findAll(): Promise<UrlData[]> {
    return this.shortenerService.findAll();
  }

  @Throttle({ default: { ttl: 60000, limit: 3 } })
  @Post()
  @UsePipes(new ZodValidationPipe(CreateShortenerDtoSchema))
  async create(@Body() createShortenerDto: CreateShortenerDto) {
    const result =
      await this.shortenerService.createShortUrl(createShortenerDto);

    return {
      message: 'Url acortada exitosamente',
      data: result,
    };
  }
}
