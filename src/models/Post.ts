import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
    HasMany,
    BelongsToMany,
    AllowNull,
  } from 'sequelize-typescript';
import { User } from './User';
import { Comment } from './Comment';
import { Category } from './Category'
import { PostCategory } from './PostCategory';

@Table({
    tableName: 'posts',
    timestamps: true,
  })

export class Post extends Model<Post> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    title!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content!: string;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Comment)
    comments!: Comment[];

    @BelongsToMany(() => Category, () => PostCategory)
    categories!: Category[];
}
