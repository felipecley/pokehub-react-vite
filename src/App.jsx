import { Routes, Route, Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  )
}
