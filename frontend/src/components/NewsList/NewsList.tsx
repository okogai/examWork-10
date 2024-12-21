import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import NewsItem from './NewsItem.tsx';
import { selectNewsList, selectNewsListLoading } from '../../store/slices/newsSlice.ts';
import { useEffect } from 'react';
import { deleteNews, fetchAllNews } from '../../store/thunks/newsThunk.ts';
import { useNavigate } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner.tsx';

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
      <div className="d-flex justify-content-between align-items-center mb-4 px-5">
        <h2 className="ms-5">News</h2>
        <button className="btn btn-primary me-5" onClick={() => navigate('/add-news')}>
          Add News
        </button>
      </div>

      <div className="row justify-content-center">
        {loading ? (
          <div className="text-center">
            <Spinner/>
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
