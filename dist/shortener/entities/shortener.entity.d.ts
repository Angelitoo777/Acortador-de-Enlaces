import { Model } from 'sequelize-typescript';
export declare class UrlData extends Model<UrlData> {
    id: string;
    shortUrl: string;
    longUrl: string;
    clickCount: number;
}
