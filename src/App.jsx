import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import { VideoPage } from "./pages/VideoPage";
import { ClientPage } from "./pages/ClientPage";
import { ProfilePage } from "./pages/Profile";
import { LoginPage } from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { BrandPage } from "./pages/BrandPage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<VideoPage />} />
          <Route path="video-management" element={<VideoPage />} />
          <Route path="client-management" element={<ClientPage />} />
          <Route path="brand-management" element={<BrandPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};
