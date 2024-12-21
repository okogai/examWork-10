import { Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Home page</h2>} />
      </Routes>
    </>
  );
};

export default App;
