import { Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';
interface UrlAttributes {
    id: string;
    shortUrl?: string;
    longUrl: string;
    clickCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export type UrlCreationAttributes = Optional<UrlAttributes, 'id' | 'clickCount' | 'createdAt' | 'updatedAt' | 'shortUrl'>;
export declare class UrlData extends Model<UrlAttributes, UrlCreationAttributes> {
    id: number;
    shortUrl: string;
    longUrl: string;
    clickCount: number;
}
export {};
