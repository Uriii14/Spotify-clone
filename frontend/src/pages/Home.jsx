import { useState, useEffect } from 'react'

// Iconos SVG como componentes
const PlayIcon = ({ size = 16, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const HeartIcon = ({ size = 16, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const MoreHorizontalIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

const ClockIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

// Datos ficticios para usuarios existentes
const recentlyPlayedData = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    duration: "3:20"
  },
  {
    id: 2,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    duration: "2:54"
  },
  {
    id: 3,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    duration: "2:58"
  },
  {
    id: 4,
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    duration: "2:21"
  },
  {
    id: 5,
    title: "Industry Baby",
    artist: "Lil Nas X, Jack Harlow",
    album: "MONTERO",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    duration: "3:32"
  }
]

const madeForYouData = [
  {
    id: 1,
    title: "Discover Weekly",
    description: "Your weekly mixtape of fresh music",
    image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop",
    type: "playlist"
  },
  {
    id: 2,
    title: "Release Radar",
    description: "Catch all the latest music from artists you follow",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
    type: "playlist"
  },
  {
    id: 3,
    title: "Daily Mix 1",
    description: "The Weeknd, Post Malone, Travis Scott and more",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    type: "playlist"
  },
  {
    id: 4,
    title: "Your Top Songs 2024",
    description: "Your most played songs this year",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    type: "playlist"
  }
]

const popularArtists = [
  {
    id: 1,
    name: "The Weeknd",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    followers: "88M"
  },
  {
    id: 2,
    name: "Ariana Grande",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    followers: "85M"
  },
  {
    id: 3,
    name: "Drake",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    followers: "82M"
  },
  {
    id: 4,
    name: "Taylor Swift",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    followers: "79M"
  },
  {
    id: 5,
    name: "Ed Sheeran",
    image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop",
    followers: "75M"
  }
]

// Componente para las cards de canciones
function SongCard({ song, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div 
      className="flex items-center p-2 rounded-lg hover:bg-zinc-800 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center w-8 mr-4">
        {isHovered ? (
          <button className="text-white hover:text-green-500">
            <PlayIcon size={16} fill="currentColor" />
          </button>
        ) : (
          <span className="text-zinc-400 text-sm">{index + 1}</span>
        )}
      </div>
      
      <div className="flex items-center flex-1 min-w-0">
        <img
          src={song.image}
          alt={song.title}
          className="w-10 h-10 rounded mr-3 object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{song.title}</p>
          <p className="text-zinc-400 text-sm truncate">{song.artist}</p>
        </div>
      </div>
      
      <div className="hidden md:block flex-1 min-w-0 mx-4">
        <p className="text-zinc-400 text-sm truncate">{song.album}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`${isLiked ? 'text-green-500' : 'text-zinc-400'} hover:text-white opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          <HeartIcon size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>
        <span className="text-zinc-400 text-sm w-12 text-right">{song.duration}</span>
        <button className="text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontalIcon size={16} />
        </button>
      </div>
    </div>
  )
}

// Componente para las cards de playlists
function PlaylistCard({ playlist }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-all duration-300 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img
          src={playlist.image}
          alt={playlist.title}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        {isHovered && (
          <button className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full shadow-lg hover:bg-green-400 transition-colors">
            <PlayIcon size={20} fill="currentColor" />
          </button>
        )}
      </div>
      <h3 className="text-white font-semibold mb-2 truncate">{playlist.title}</h3>
      <p className="text-zinc-400 text-sm line-clamp-2">{playlist.description}</p>
    </div>
  )
}

// Componente para las cards de artistas
function ArtistCard({ artist }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-all duration-300 group cursor-pointer text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full shadow-lg mx-auto"
        />
        {isHovered && (
          <button className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full shadow-lg hover:bg-green-400 transition-colors">
            <PlayIcon size={20} fill="currentColor" />
          </button>
        )}
      </div>
      <h3 className="text-white font-semibold mb-1 truncate">{artist.name}</h3>
      <p className="text-zinc-400 text-sm">{artist.followers} followers</p>
    </div>
  )
}

// Componente para usuarios nuevos
function NewUserHome({ user }) {
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Spotify, {user.name}! 🎵
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Let's find some music you'll love. Start by exploring popular artists and playlists.
        </p>
      </section>

      {/* Popular Artists for New Users */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Popular artists</h2>
          <button className="text-zinc-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {popularArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Recommended Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Start with these playlists</h2>
          <button className="text-zinc-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {madeForYouData.slice(0, 4).map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>
    </div>
  )
}

// Componente para usuarios existentes
function ExistingUserHome({ user }) {
  return (
    <div className="space-y-8">
      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recently played</h2>
          <button className="text-zinc-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="bg-zinc-900 rounded-lg p-4">
          <div className="flex items-center text-zinc-400 text-sm font-medium mb-4 px-2">
            <div className="w-8 mr-4">#</div>
            <div className="flex-1">TITLE</div>
            <div className="hidden md:block flex-1 mx-4">ALBUM</div>
            <div className="w-16 text-right mr-8">
              <ClockIcon size={16} />
            </div>
          </div>
          
          <div className="space-y-1">
            {recentlyPlayedData.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Made for You */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button className="text-zinc-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {madeForYouData.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Popular artists</h2>
          <button className="text-zinc-400 hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {popularArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default function Home({ user, isNewUser = false }) {
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-zinc-400">Loading...</p>
      </div>
    )
  }

  return isNewUser ? (
    <NewUserHome user={user} />
  ) : (
    <ExistingUserHome user={user} />
  )
}