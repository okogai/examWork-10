import { Route, Routes } from "react-router-dom";
import NewsList from './components/NewsList/NewsList.tsx';
import NewsForm from './components/NewsForm/NewsForm.tsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewsList/>} />
        <Route path="/add-news" element={<NewsForm/>} />
      </Routes>
    </>
  );
};

export default App;
