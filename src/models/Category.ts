import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    BelongsToMany,
    AllowNull
  } from 'sequelize-typescript';
  import { Post } from './Post';
import { PostCategory } from './PostCategory';
  
  @Table({
    tableName: 'categories',
    timestamps: true,
  })
  export class Category extends Model<Category> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;
  
    @BelongsToMany(() => Post, () => PostCategory)
    posts!: Post[];
  }
  