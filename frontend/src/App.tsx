import { Routes, Route } from "react-router-dom";
import "./App.css";

import OnboardingPage from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage"
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerified from "./pages/EmailVerified";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful";

function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Routes>
        <Route path="/" element={<div>Welcome to GIVVA</div>} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password-successful" element={<PasswordResetSuccessful />} />
      </Routes>
    </div>
  );
}

export default App;
