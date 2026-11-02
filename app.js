import express from "express";
import session from "express-session";
import dotenv from "dotenv";

import { RedisStore } from "connect-redis";
import { redisClient } from "./config/redis.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());

app.use(
    session({
store: new RedisStore({
    client: redisClient,
    prefix: "sess:",
}),

        name: "sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 2, // 2 hours
        }
    })
)

app.use("/api/auth", authRoutes);

export default app;