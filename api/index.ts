import express from 'express';
import cors from 'cors';
import mysqlDb from "./mysqlDb";
import newsRoute from "./routes/newsRoute";
import commentsRoute from "./routes/commentsRoute";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/news', newsRoute);
app.use('/comments', commentsRoute);

const run = async () => {
    await mysqlDb.init();
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch((err) => {console.error(err)});
