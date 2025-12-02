import { UrlData } from './entities/shortener.entity';
export declare class ShortenerRepository {
    private urlData;
    constructor(urlData: typeof UrlData);
    createShortUrl(shortUrl: string, longUrl: string): Promise<UrlData>;
}
