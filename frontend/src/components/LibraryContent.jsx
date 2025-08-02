import { useState } from 'react'

// Iconos SVG
const PlayIcon = ({ size = 16, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const SearchIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const PlusIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function LibraryContent() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Library Header */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <button className="text-zinc-400 hover:text-white">
            <PlusIcon size={20} />
          </button>
          <button className="text-zinc-400 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 mb-4">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeFilter === 'all' 
                ? 'bg-zinc-700 text-white' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('playlists')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeFilter === 'playlists' 
                ? 'bg-zinc-700 text-white' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Playlists
          </button>
          <button 
            onClick={() => setActiveFilter('podcasts')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeFilter === 'podcasts' 
                ? 'bg-zinc-700 text-white' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Podcasts
          </button>
          <button 
            onClick={() => setActiveFilter('albums')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeFilter === 'albums' 
                ? 'bg-zinc-700 text-white' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Albums
          </button>
        </div>

        {/* Search in Library */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            placeholder="Search in Your Library"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800 text-white placeholder-zinc-400 rounded py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center text-zinc-400 hover:text-white text-sm">
            <span>Recents</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
              <path d="M3 6h18M7 12h10M10 18h4"/>
            </svg>
          </button>
          <button className="text-zinc-400 hover:text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Library Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 space-y-2">
          {/* Liked Songs - Show in All and Playlists */}
          {(activeFilter === 'all' || activeFilter === 'playlists') && (
            <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded mr-3 flex items-center justify-center">
                <span className="text-white text-lg">♥</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Liked Songs</p>
                <p className="text-zinc-400 text-xs">247 songs</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                <PlayIcon size={16} fill="currentColor" />
              </button>
            </div>
          )}

          {/* Your Episodes - Show in All, Playlists and Podcasts */}
          {(activeFilter === 'all' || activeFilter === 'podcasts' || activeFilter === 'playlists') && (
            <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded mr-3 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Your Episodes</p>
                <p className="text-zinc-400 text-xs">Saved & downloaded episodes</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                <PlayIcon size={16} fill="currentColor" />
              </button>
            </div>
          )}

          {/* User Playlists - Show in All and Playlists */}
          {(activeFilter === 'all' || activeFilter === 'playlists') && (
            <>
              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <div className="w-12 h-12 bg-zinc-600 rounded mr-3"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">My Playlist #1</p>
                  <p className="text-zinc-400 text-xs">Playlist • You • 32 songs</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <div className="w-12 h-12 bg-zinc-600 rounded mr-3"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Workout Mix</p>
                  <p className="text-zinc-400 text-xs">Playlist • You • 45 songs</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <div className="w-12 h-12 bg-zinc-600 rounded mr-3"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Chill Vibes</p>
                  <p className="text-zinc-400 text-xs">Playlist • You • 28 songs</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <div className="w-12 h-12 bg-zinc-600 rounded mr-3"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Road Trip Hits</p>
                  <p className="text-zinc-400 text-xs">Playlist • You • 67 songs</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <div className="w-12 h-12 bg-zinc-600 rounded mr-3"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Study Focus</p>
                  <p className="text-zinc-400 text-xs">Playlist • You • 89 songs</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>
            </>
          )}

          {/* Albums - Show in All and Albums */}
          {(activeFilter === 'all' || activeFilter === 'albums') && (
            <>
              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
                  alt="After Hours"
                  className="w-12 h-12 rounded mr-3 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">After Hours</p>
                  <p className="text-zinc-400 text-xs">Album • The Weeknd • 2020</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <img
                  src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop"
                  alt="Positions"
                  className="w-12 h-12 rounded mr-3 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Positions</p>
                  <p className="text-zinc-400 text-xs">Album • Ariana Grande • 2020</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
                  alt="Certified Lover Boy"
                  className="w-12 h-12 rounded mr-3 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Certified Lover Boy</p>
                  <p className="text-zinc-400 text-xs">Album • Drake • 2021</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>
            </>
          )}

          {/* Podcasts - Show only in Podcasts filter */}
          {activeFilter === 'podcasts' && (
            <>
              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <div className="w-12 h-12 bg-orange-600 rounded mr-3 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="11" r="1"/>
                    <path d="M11 17a1 1 0 0 1 2 0c0 .5-.5 3-.5 3s-.5-2.5-.5-3z"/>
                    <path d="M8 14a5 5 0 1 1 8 0"/>
                    <path d="M8 11a1 1 0 0 0-1-1 1 1 0 0 0 0 2 1 1 0 0 0 1-1"/>
                    <path d="M17 11a1 1 0 0 0-1-1 1 1 0 0 0 0 2 1 1 0 0 0 1-1"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Tech Talks Daily</p>
                  <p className="text-zinc-400 text-xs">Podcast • 45 episodes</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center p-2 rounded hover:bg-zinc-800 cursor-pointer group">
                <div className="w-12 h-12 bg-blue-600 rounded mr-3 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="11" r="1"/>
                    <path d="M11 17a1 1 0 0 1 2 0c0 .5-.5 3-.5 3s-.5-2.5-.5-3z"/>
                    <path d="M8 14a5 5 0 1 1 8 0"/>
                    <path d="M8 11a1 1 0 0 0-1-1 1 1 0 0 0 0 2 1 1 0 0 0 1-1"/>
                    <path d="M17 11a1 1 0 0 0-1-1 1 1 0 0 0 0 2 1 1 0 0 0 1-1"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Startup Stories</p>
                  <p className="text-zinc-400 text-xs">Podcast • 23 episodes</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white">
                  <PlayIcon size={16} fill="currentColor" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}