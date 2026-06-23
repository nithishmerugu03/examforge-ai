import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Pricing from "./pages/Pricing";

import { getCurrentUser } from "./services/api.js";

export const serverUrl = "http://localhost:8000";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/notes"
          element={userData ? <Notes /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
