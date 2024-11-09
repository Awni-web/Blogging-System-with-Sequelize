import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { Category } from '../models/Category';
import { configDotenv } from "dotenv";
import { PostCategory } from '../models/PostCategory';

configDotenv();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    models: [User, Post, Comment, Category, PostCategory], // Register models here
});

export default sequelize;
