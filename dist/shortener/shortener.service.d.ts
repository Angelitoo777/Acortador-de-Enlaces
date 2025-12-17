import { ShortenerRepository } from './shortener.repository';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { ResponseShortenerDto } from './dto/response-shortener.dto';
export declare class ShortenerService {
    private shortenerRepository;
    private configService;
    private redisService;
    constructor(shortenerRepository: ShortenerRepository, configService: ConfigService, redisService: RedisService);
    private readonly hashids;
    findAll(): Promise<import("./entities/shortener.entity").UrlData[]>;
    createShortUrl(longUrl: CreateShortenerDto): Promise<ResponseShortenerDto>;
}
