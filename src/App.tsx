import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// Secondary routes are code-split so their JS (and react-markdown, which only
// the Safari guide uses) stays out of the initial home-page bundle.
const Safari = lazy(() => import("./pages/Safari"));
const Privacy = lazy(() => import("./pages/Privacy"));

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/ai-chat-speed-booster">
      <ScrollManager />
      <Nav />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/safari" element={<Safari />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
