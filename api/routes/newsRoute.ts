import mysqlDb from "../mysqlDb";
import express from "express";
import {INews} from "../types";
import {imagesUpload} from "../multer";
import {ResultSetHeader} from "mysql2";

const newsRoute = express.Router();

newsRoute.get("/", async (_req, res) => {
    const connection = await mysqlDb.getConnections();
    const [result] = await connection.query("SELECT id, title, image, created_at FROM posts");
    const news = result as INews[];
    res.send(news);
});

newsRoute.get("/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnections();
    const [result] = await connection.query("SELECT * FROM posts WHERE id = ?", [id]);
    const news = result as INews[];
    if (news.length === 0) {
        res.status(404).send("News not found");
    } else {
        res.send(news);
    }
});

newsRoute.post("/", imagesUpload.single('image'), async (req, res) => {
    const {title, text} = req.body;
    if (!title || !text) {
        res.status(400).send("Please send name and description");
        return;
    }
    const connection = await mysqlDb.getConnections();

    const post = {
        title: title,
        text: text,
        image: req.file ? `images/${req.file.filename}` : null
    }

    const [result] = await connection.query("INSERT INTO posts (title, text, image) VALUES (?, ?, ?)",
        [post.title, post.text, post.image]);
    const resultHeader = result as ResultSetHeader;
    const [resultNews] =  await connection.query("SELECT * FROM posts WHERE id = ?", [resultHeader.insertId]);
    const addedPost = resultNews as INews[];

    if (addedPost.length === 0) {
        res.status(404).send("News not found");
    } else {
        res.send(addedPost[0]);
    }
});

newsRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnections();

    const [deleteResult] = await connection.query("DELETE FROM posts WHERE id = ?", [id]);
    const resultHeader = deleteResult as ResultSetHeader;

    if (resultHeader.affectedRows === 0) {
        res.status(404).send("News not found.");
    } else {
        res.send("News deleted successfully.");
    }
});


export default newsRoute;