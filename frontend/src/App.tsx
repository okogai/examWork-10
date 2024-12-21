import { Route, Routes } from "react-router-dom";
import NewsList from "./components/NewsList/NewsList.tsx";
import NewsForm from "./components/NewsForm/NewsForm.tsx";
import Header from "./components/UI/Header/Header.tsx";
import NewsDetail from "./components/NewsDetails/NewsDetails.tsx";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/add-news" element={<NewsForm />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </>
  );
};

export default App;
