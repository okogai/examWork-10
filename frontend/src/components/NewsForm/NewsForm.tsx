import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import React, { ChangeEvent, useState } from 'react';
import { selectAddNewsLoading } from '../../store/slices/newsSlice.ts';
import { NewsMutation } from '../../types';
import FileInput from '../UI/FileInput/FileInput.tsx';
import { createNews } from '../../store/thunks/newsThunk.ts';

const initialState = {
  title: '',
  text: '',
  image: null
};

const NewsForm = () => {
  const [form, setForm] = useState<NewsMutation>(initialState);
  const [filename, setFilename] = useState<string>('');
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAddNewsLoading);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState: NewsMutation) => ({
        ...prevState,
        [name]: files[0],
      }));
      setFilename(files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim() === '' || form.text.trim() === '') {
      alert("Please fill in all fields ");
    } else {
      await dispatch(createNews(form));
      setForm(initialState);
      setFilename('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-4 p-1">
          <h4 className="text-center">Add new post</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Enter title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Enter text
              </label>
              <textarea
                className="form-control"
                placeholder="Enter text"
                name="text"
                value={form.text}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <FileInput
                label="Image"
                name="image"
                filename={filename}
                onChange={fileInputChangeHandler}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsForm;