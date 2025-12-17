import { ShortenerService } from './shortener.service';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { UrlData } from './entities/shortener.entity';
export declare class ShortenerController {
    private readonly shortenerService;
    constructor(shortenerService: ShortenerService);
    findAll(): Promise<UrlData[]>;
    create(createShortenerDto: CreateShortenerDto): Promise<{
        message: string;
        data: {
            longUrl: string;
            shortUrl: string;
        };
    }>;
}
