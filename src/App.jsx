import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import BodyComponent from "./BodyComponent";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<BodyComponent />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
