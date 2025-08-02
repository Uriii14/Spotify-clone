import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import LibraryContent from '../components/LibraryContent'

// Iconos SVG
const HomeIcon = ({ size = 24, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
)

// Icono Librería
const LibraryIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
  </svg>
)

// Icono Cerca
const SearchIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

// Icono Usuario
const UserIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

// Icono añadir
const PlusIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function MainLayout({ user, onLogout, children }) {
  const location = useLocation()
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  console.log('isUserMenuOpen:', isUserMenuOpen) // Para debug

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      {/* Sidebar Delgada */}
      <aside className={`bg-black transition-all duration-300 flex flex-col ${
        isLibraryExpanded ? 'w-80' : 'w-20'
      }`}>
        {/* Logo Area */}
        <div className={`p-6 flex items-center ${isLibraryExpanded ? 'justify-start' : 'justify-center'}`}>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">♪</span>
          </div>
        </div>

        {/* Library Toggle */}
        <div className="px-4 mb-4">
          <button
            onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
            className={`w-full flex items-center hover:text-white transition-colors p-3 rounded-lg hover:bg-zinc-800 text-zinc-300 ${isLibraryExpanded ? 'justify-start' : 'justify-center'}`}
          >
            <LibraryIcon size={24} />
            {isLibraryExpanded && (
              <span className="ml-4 font-medium">Your Library</span>
            )}
          </button>
        </div>

        {/* Expanded Library Content */}
        {isLibraryExpanded && <LibraryContent />}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header Sticky */}
        <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-md z-10 border-b border-zinc-800">
          <div className="flex items-center justify-between p-4">
            {/* Left: Spacer */}
            <div className="w-10"></div>

            {/* Center: Home + Search */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`p-3 rounded-full hover:bg-zinc-800 transition-colors ${
                  location.pathname === '/' ? 'text-white bg-zinc-800' : 'text-zinc-300'
                }`}
              >
                <HomeIcon size={24} fill={location.pathname === '/' ? 'currentColor' : 'none'} />
              </Link>

              {/* Search Bar */}
              <div className="relative w-96">
                <input
                  type="text"
                  placeholder="What do you want to listen to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-800 text-white placeholder-zinc-400 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-zinc-700 transition-all duration-200"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none">
                  <SearchIcon size={20} />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Right: User Profile Dropdown */}
            <div className="relative">
              {/* User Avatar Button */}
              <button
                onClick={() => {
                  console.log('Avatar clicked!') // Para debug
                  setIsUserMenuOpen(!isUserMenuOpen)
                }}
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
              >
                <span className="text-black font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  {/* Overlay to close menu */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  
                  {/* Dropdown Content */}
                  <div className="absolute right-0 top-12 w-48 bg-zinc-800 rounded-lg shadow-lg border border-zinc-700 z-20">
                    {/* Menu Items */}
                    <div className="py-2">
                      <button 
                        className="w-full text-left px-4 py-2 text-white hover:bg-zinc-700 transition-colors flex items-center justify-between"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span>Cuenta</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </button>
                      
                      <button 
                        className="w-full text-left px-4 py-2 text-white hover:bg-zinc-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Perfil
                      </button>
                      
                      <button 
                        className="w-full text-left px-4 py-2 text-white hover:bg-zinc-700 transition-colors flex items-center justify-between"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span>Asistencia</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </button>
                      
                      <button 
                        className="w-full text-left px-4 py-2 text-white hover:bg-zinc-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sesión privada
                      </button>
                      
                      <button 
                        className="w-full text-left px-4 py-2 text-white hover:bg-zinc-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Configuración
                      </button>
                      
                      <hr className="border-zinc-700 my-2" />
                      
                      <button 
                        className="w-full text-left px-4 py-2 text-white hover:bg-zinc-700 transition-colors"
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          onLogout()
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  )
}