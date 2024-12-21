import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { fetchOneNews } from "../../store/thunks/newsThunk.ts";
import {
  selectFullNews,
  selectFullNewsLoading,
} from "../../store/slices/newsSlice.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";
import {
  createNewComment,
  deleteComments,
  fetchComments,
} from "../../store/thunks/commentsThunk.ts";
import { selectComments } from "../../store/slices/commentsSlice.ts";
import dayjs from "dayjs";

const initialState = {
  author: "",
  comment: "",
};

interface Props {
  author: string;
  comment: string;
}

const NewsDetail = () => {
  const [form, setForm] = useState<Props>(initialState);
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectFullNews);
  const comments = useAppSelector(selectComments);
  const loading = useAppSelector(selectFullNewsLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNews(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  const removeComment = async (comment_id: number) => {
    await dispatch(deleteComments(comment_id));
    if (id) {
      dispatch(fetchComments(id));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.comment.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    const comment = {
      ...form,
      post_id: id,
    };
    await dispatch(createNewComment(comment));
    setForm(initialState);
    if (id) {
      dispatch(fetchComments(id));
    }
  };

  const imageUrl = post?.image
    ? "http://localhost:8000/" + post.image
    : "https://vexpar.ru/wa-data/public/site/themes/insales/img/default.jpeg?v1630060161";

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center mt-4">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {post && (
        <div className="card shadow-sm d-flex flex-row mb-3">
          <div className="col-md-3">
            <img
              src={imageUrl}
              className="card-img-top img-fluid"
              alt={post.title}
            />
          </div>
          <div className="card-body">
            <p className="card-text">
              <small className="text-muted">
                Published: {dayjs(post.created_at).format("DD.MM.YYYY HH:mm")}
              </small>
            </p>
            <h4>{post.title}</h4>
            <p className="card-text">{post.text}</p>
          </div>
        </div>
      )}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="card mb-3 shadow-sm">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h6 className="card-title text-primary">{comment.author}</h6>
                <p className="card-text">{comment.comment}</p>
              </div>
              <button
                className="btn btn-danger align-self-start"
                onClick={() => removeComment(comment.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No comments yet. Be the first to comment!</p>
      )}
      <div className="mt-4">
        <h5>Add Comment</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author (optional)
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="form-control"
              value={form.author}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea
              id="comment"
              className="form-control"
              rows={3}
              name="comment"
              value={form.comment}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsDetail;
