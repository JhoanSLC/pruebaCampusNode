import express from 'express';
import 'dotenv/config';
import { PORT } from './src/config.js';
import { dbConnection } from './src/database/dbConnection.js';
import userRouter from './src/routes/user.routes.js';
import cors from 'cors';

import { User } from './src/models/Users.model.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

dbConnection.sync({force: false});


app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
