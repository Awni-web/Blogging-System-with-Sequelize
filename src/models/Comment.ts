import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
    AllowNull
  } from 'sequelize-typescript';
  import { User } from './User';
  import { Post } from './Post';
  
  @Table({
    tableName: 'comments',
    timestamps: true,
  })
  export class Comment extends Model<Comment> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;
  
    @AllowNull(false)
    @ForeignKey(() => Post)
    @Column(DataType.UUID)
    postId!: string;
  
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId!: string;
  
    @AllowNull(false)
    @Column(DataType.TEXT)
    content!: string;
  
    // Associations
    @BelongsTo(() => User)
    user!: User;
  
    @BelongsTo(() => Post)
    post!: Post;
  }
  