import React, { useCallback, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./all.css";
import { nanoid } from "nanoid";

import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Home } from "./Home/home";
import { Alarms } from "./Alarms/Alarms";
import { Calendar } from "./Calendar/Calendar";
import { Login } from "./Login/login";
import { PDFextractor } from "./PdFextractor/Pdfextractor";
import { ProductivityCalendar } from "./ProductivityCalendar/ProductivityCalendar";
import { SignUpPage } from "./SignUpPage/SignUpPage";
import { URLholder } from "./URLholder/URLholder";

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/Home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/PDFextractor">PDF Extractor</NavLink>
        </li>
        <li>
          <NavLink to="/ProductivityCalendar">Productivity Calendar</NavLink>
        </li>
        <li>
          <NavLink to="/Calendar">Calendar</NavLink>
        </li>
        <li>
          <NavLink to="/Alarms">Alarms</NavLink>
        </li>
        <li>
          <NavLink to="/URLholder">URL holder</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default function App() {
  console.trace("Made it to app.jsx");
  const [authState, setAuthState] = useState("Not Authenticated");
  const [username, setUsername] = useState("");
  const [buttonText, setButtonText] = useState("Continue as Guest");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "delete" });
      if (response?.status === 200) {
        setAuthState("Not Authenticated");
        setButtonText("Continue as Guest");
        setUsername("");
        navigate("/");
      } else {
        const body = await response.json();
        console.error(`Logout Error: ${body.msg}`);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [navigate]);

  const handleHome = () => {
    if (authState === "Authenticated") {
      navigate("/Home");
    } else {
      navigate("/");
    }
  };

  const handleGuest = useCallback(async () => {
    if (username === "") {
      const guestUser = `Guest-${nanoid(10)}`;
      try {
        const response = await fetch("/api/auth/create", {
          method: "post",
          body: JSON.stringify({ username: guestUser, password: "guest" }),
          headers: {
            "Content-type": "application/json",
          },
        });

        if (response?.status === 200) {
          const plaintextResponse = await response.json();
          setAuthState(plaintextResponse.authState);
          setUsername(plaintextResponse.username);
          setButtonText("Welcome Guest!");
          navigate("/Home");
        } else {
          const body = await response.json();
          console.error(`Guest Error: ${body.msg}`);
        }
      } catch (error) {
        console.error("Guest creation failed:", error);
      }
    } else {
      handleHome();
    }
  }, [navigate, username]);

  function ProtectedRoute({ authState, children }) {
    if (authState !== "Authenticated") {
      return <Login />;
    }
    return children;
  }

  return (
    <div>
      <header>
        <NavLink to="/Home">
          <button id="profile" onClick={handleGuest}>
            {buttonText}
          </button>
        </NavLink>
        <h1>
          <a id="homeNav" onClick={handleHome}>
            Won Stop
          </a>
        </h1>
        <NavLink to="/">
          <button id="logOut" onClick={handleLogOut}>
            Log out
          </button>
        </NavLink>{" "}
        <br />
      </header>
      {authState === "Authenticated" && <NavigationBar />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setAuthState={setAuthState}
                setUsername={setUsername}
                username={username}
                setButtonText={setButtonText}
              />
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoute authState={authState}>
                <Home setButtonText={setButtonText} />
              </ProtectedRoute>
            }
          />
          <Route path="/PDFextractor" element={<PDFextractor />} />
          <Route
            path="/ProductivityCalendar"
            element={
              <ProtectedRoute authState={authState}>
                <ProductivityCalendar username={username} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Calendar"
            element={
              <ProtectedRoute authState={authState}>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Alarms"
            element={
              <ProtectedRoute authState={authState}>
                <Alarms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/URLholder"
            element={
              <ProtectedRoute authState={authState}>
                <URLholder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SignUpPage"
            element={
              <SignUpPage
                setAuthState={setAuthState}
                setButtonText={setButtonText}
                setUsername={setUsername}
                username={username}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <span id="authorName">Author Name(s): Jordan Hiatt</span>
        <NavLink id="github" to="https://github.com/jhiatt19/startup">
          Github
        </NavLink>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
