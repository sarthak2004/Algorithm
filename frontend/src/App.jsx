import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Tech_news from "./pages/Tech_news";
import ProfileForm from "./pages/ProfileForm";
import Projects from "./pages/Projects";
import UserProfile from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import EmailVerify from "./pages/EmailVerify";
import './App.css';
import NotFound from "./pages/NotFound";
import PasswordReset from "./pages/PasswordReset";


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/technews" element={<Tech_news />} />
          <Route path="/join-us" element={<ProfileForm />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify/:id" element={<EmailVerify />} />
          <Route path="/resetpass/:id" element={<PasswordReset />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};


const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
