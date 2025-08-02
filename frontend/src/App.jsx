import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { authService } from './services/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)

  // Verificar si hay sesión guardada al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const savedUser = authService.getCurrentUser()
          if (savedUser) {
            setUser(savedUser)
            setIsLoggedIn(true)
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        // Si hay error, limpiar datos inválidos
        authService.logout()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Función para hacer register
  const handleRegister = (userData) => {
    console.log('🎯 handleRegister called with:', userData)
    setUser(userData)
    setIsLoggedIn(true)
    setIsNewUser(true)
    localStorage.setItem('justRegistered', 'true')
    console.log('🎯 Set justRegistered to localStorage')
  }
  
  // Función para hacer login
  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  // Función para redirigir al login desde la landing page
  const handleLoginRedirect = () => {
    // No hacer login automático, solo mostrar el formulario
    setIsLoggedIn(false)
  }

  // Función para redirigir al register desde la landing page
  const handleRegisterRedirect = () => {
    // No hacer login automático, solo mostrar el formulario
    setIsLoggedIn(false)
  }

  // Función para hacer logout
  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setIsLoggedIn(false)
  }

  // Mostrar loading mientras verifica autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {!isLoggedIn ? (
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                onLogin={handleLoginRedirect}
                onRegister={handleRegisterRedirect}
              />
            } 
          />
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={<Register onRegister={handleRegister} />} 
          />
        </Routes>
      ) : (
        <MainLayout user={user} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/*" element={<Home user={user} />} />
          </Routes>
        </MainLayout>
      )}
    </>
  )
}

export default App