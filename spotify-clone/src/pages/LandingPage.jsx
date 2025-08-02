import { useNavigate } from 'react-router-dom'

// Iconos SVG simples
const PlayIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const SpotifyLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
      <span className="text-black font-bold text-lg">♪</span>
    </div>
    <span className="text-white text-xl font-bold">Spotify</span>
  </div>
)

export default function LandingPage() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <SpotifyLogo />
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRegister}
            className="text-zinc-300 hover:text-white font-medium transition-colors"
          >
            Sign up
          </button>
          <button
            onClick={handleLogin}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Log in
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Music for everyone.
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            Millions of songs. No credit card needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={handleRegister}
              className="bg-green-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-400 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <PlayIcon size={20} />
              <span>Get Spotify free</span>
            </button>
            
            <button
              onClick={handleLogin}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all"
            >
              Already have an account?
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Play millions of songs</h3>
            <p className="text-zinc-400">Listen to the songs you love, and discover new music and podcasts.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Playlists made easy</h3>
            <p className="text-zinc-400">We'll help you make playlists. Or enjoy playlists made by music experts.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Make it yours</h3>
            <p className="text-zinc-400">Tell us what you like, and we'll recommend music for you.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <SpotifyLogo />
          <p className="text-zinc-400 mt-4">
            © 2024 Spotify Clone - Practice Project
          </p>
        </div>
      </footer>
    </div>
  )
}