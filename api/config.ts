import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    dataBase: {
        host: 'localhost',
        user: 'root',
        password: 'Rfgbnfyfvthbrf7',
        database: 'okogai_news_db',
    }
};

export default config;