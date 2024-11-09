import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    Unique,
    AllowNull,
    HasMany
} from 'sequelize-typescript'
import { Post} from './Post'
import { Comment } from  './Comment'

@Table({
    tableName: 'users',
    timestamps: true,
})

export class User extends Model<User> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    username!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;

    @HasMany(() => Post)
    posts!: [];

    @HasMany(() => Comment)
    comments!: [];
}