import { Routes, Route } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Contests from "../../pages/Contests";
import Bookmarks from "../../pages/Bookmarks";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Correct Private Route usage */}
        <Route element={<PrivateRoute />}>
          <Route path="/contests" element={<Contests />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
