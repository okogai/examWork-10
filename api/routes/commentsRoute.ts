import express, {query} from "express";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";
import {IComment} from "../types";

const commentsRoute = express.Router();

commentsRoute.get("/", async (req, res) => {
    const { news_id } = req.query;
    const connection = await mysqlDb.getConnections();
    if (news_id) {
        const [result] = await connection.query("SELECT * FROM comments WHERE post_id = ?", [news_id]);
        const comments = result as IComment[];
        if (comments.length === 0) {
            res.status(404).send("Comments not found");
        } else {
            res.send(comments);
        }
    } else {
        const [result] = await connection.query("SELECT * FROM comments");
        const comments = result as IComment[];
        res.send(comments);
    }
});

commentsRoute.post("/", async (req, res) => {
    if (!req.body.comment) {
        res.status(400).send("Please send comment");
        return;
    }
    const comment = {
        post_id: req.body.post_id,
        author: req.body.author ? req.body.author : 'Anonymous',
        comment: req.body.comment,
    }
    const connection = await mysqlDb.getConnections();
    const [result] = await connection.query("INSERT INTO comments (post_id, author, comment) VALUES (?, ?, ?)",
        [comment.post_id, comment.author, comment.comment]);
    const resultHeader = result as ResultSetHeader;
    const [resultComment] =  await connection.query("SELECT * FROM comments WHERE id = ?", [resultHeader.insertId]);
    const addedComment = resultComment as IComment[];

    if (addedComment.length === 0) {
        res.status(404).send("Comment not found");
    } else {
        res.send(addedComment[0]);
    }
});

commentsRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnections();
    const [deleteResult] = await connection.query("DELETE FROM comments WHERE id = ?", [id]);
    const resultHeader = deleteResult as ResultSetHeader;

    if (resultHeader.affectedRows === 0) {
        res.status(404).send("Comment not found.");
    } else {
        res.send("Comment deleted successfully.");
    }
});

export default commentsRoute;