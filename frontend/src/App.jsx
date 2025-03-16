import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/routing/AppRouter";
import ContestState from "./context/contest/ContestState";
import AuthProvider from "./context/auth/AuthProvider"; // ✅ Use correct provider
import BookmarkState from "./context/bookmark/BookmarkState";
import AlertState from "./context/alert/AlertState";
import "./styles/index.css";

function App() {
  return (
    <AuthProvider>
      <ContestState>
        <BookmarkState>
          <AlertState>
            <Router>
              <AppRouter />
            </Router>
          </AlertState>
        </BookmarkState>
      </ContestState>
    </AuthProvider>
  );
}

export default App;
