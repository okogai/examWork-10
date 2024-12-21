import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import NewsItem from './NewsItem.tsx';
import { selectNewsList, selectNewsListLoading } from '../../store/slices/newsSlice.ts';
import { useEffect } from 'react';
import { deleteNews, fetchAllNews } from '../../store/thunks/newsThunk.ts';
import { useNavigate } from 'react-router-dom';

const NewsList = () => {
  const newsList = useAppSelector(selectNewsList);
  const loading = useAppSelector(selectNewsListLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeNews = async (id: number) => {
    await dispatch(deleteNews(id));
    dispatch(fetchAllNews());
  };

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>News</h2>
        <button className="btn btn-primary" onClick={() => navigate('/add-news')}>
          Add News
        </button>
      </div>

      <div className="row justify-content-center">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          newsList.map((news) => (
            <div className="col-md-5 mb-3" key={news.id}>
              <NewsItem news={news} removeNews={removeNews} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsList;