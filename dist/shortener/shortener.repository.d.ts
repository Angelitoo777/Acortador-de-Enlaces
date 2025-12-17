import { UrlData } from './entities/shortener.entity';
import { ModelCtor } from 'sequelize-typescript';
import { CreateShortenerDto } from './dto/create-shortener.dto';
export declare class ShortenerRepository {
    private urlData;
    constructor(urlData: ModelCtor<UrlData>);
    findAll(): Promise<UrlData[]>;
    createShortUrl(longUrl: CreateShortenerDto): Promise<UrlData>;
}
