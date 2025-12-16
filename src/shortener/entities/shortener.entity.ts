import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';

interface UrlAttributes {
  id: string;
  shortUrl?: string;
  longUrl: string;
  clickCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UrlCreationAttributes = Optional<
  UrlAttributes,
  'id' | 'clickCount' | 'createdAt' | 'updatedAt' | 'shortUrl'
>;

@Table({ tableName: 'url_data' })
export class UrlData extends Model<UrlAttributes, UrlCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataTypes.STRING, allowNull: true, unique: true })
  shortUrl: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  longUrl: string;

  @Column({ type: DataTypes.INTEGER, defaultValue: 0, allowNull: false })
  clickCount: number;
}
