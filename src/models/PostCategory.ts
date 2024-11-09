import { Model, Column, ForeignKey, Table } from 'sequelize-typescript';
import { Post } from './Post';
import { Category } from './Category';

@Table({ tableName: 'PostCategories', timestamps: true })
export class PostCategory extends Model<PostCategory> {
  @ForeignKey(() => Post)
  @Column
  postId!: number;

  @ForeignKey(() => Category)
  @Column
  categoryId!: number;
}
