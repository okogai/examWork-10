import React from "react";
import { Link } from "react-router-dom";
import { News } from '../../types';
import dayjs from "dayjs";

interface Props {
  news: News;
  removeNews: (id: number) => void;
}

const NewsItem: React.FC<Props> = ({ news, removeNews }) => {

  const imageUrl = news.image? 'http://localhost:8000/' + news.image : 'https://vexpar.ru/wa-data/public/site/themes/insales/img/default.jpeg?v1630060161';

  return (
    <div className="card h-100 d-flex">
      <div className="row p-3 justify-content-between align-items-center">
        <div className="col-md-4">
          <img src={imageUrl} className="img-fluid rounded-start" alt="..."/>
        </div>
        <div className="col-md-7">
          <div className="card-body ps-0">
            <h5 className="card-title">{news.title}</h5>
            <p className="card-text"><small
              className="text-muted">Published: {dayjs(news.created_at).format('DD.MM.YYYY HH:mm')}</small></p>
          </div>
          <div>
            <Link to={`/news/${news.id}`} className="btn btn-primary btn-sm">
              Read more
            </Link>
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => removeNews(news.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;