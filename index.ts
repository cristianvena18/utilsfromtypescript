import { config } from './config/config';

const dotenv = require('dotenv');
import {env} from "./config/environment";

dotenv.config();


console.log("should print 'root'");
console.log(env("DATABASE_USER", "secret"));
console.log("should print 'mysql'");
console.log(config("database.host", "secret"));
console.log("should print 'secret'");
console.log(env("DATABASEUSER", "secret"));