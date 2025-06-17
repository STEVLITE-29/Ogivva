import { Routes, Route } from 'react-router-dom'
import './App.css';
import OnboardingPage from "./pages/OnboardingPage"
// import { useEffect } from 'react'
// import SignUpPage from './pages/SignUpPage'
// import LoginPage from './pages/LoginPage'
// import EmailVerificationPage from './pages/EmailVerificationPage'
// import { Toaster } from 'react-hot-toast'
// import { useAuthStore } from './store/authStore'

function App() {
  // const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore()

  // useEffect(() => {
  //   checkAuth?.()
  // },[checkAuth])

  // console.log('isAuthenticated', isAuthenticated);; // R
  // console.log("user", user)

  return (
    <div className=" min-h-screen bg-ivory-100 flex items-center justify-center">
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        {/* <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} /> */}
      </Routes>
      {/* <Toaster /> */}
    </div>
  )
}

export default App