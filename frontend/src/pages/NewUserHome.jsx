import React from 'react';
import { Plus, Play, Music, Headphones} from 'lucide-react';

const NewUserHome = ({ user, onContinue }) => {

  const trendingSongs = [
    { id: 1, title: "Flowers", artist: "Miley Cyrus", cover: "🌸", plays: "1.2M" },
    { id: 2, title: "Anti-Hero", artist: "Taylor Swift", cover: "🎭", plays: "980K" },
    { id: 3, title: "As It Was", artist: "Harry Styles", cover: "🌅", plays: "875K" },
    { id: 4, title: "Unholy", artist: "Sam Smith", cover: "😈", plays: "750K" },
    { id: 5, title: "Bad Habit", artist: "Steve Lacy", cover: "🎸", plays: "650K" }
  ];

  const popularArtists = [
    { id: 1, name: "Bad Bunny", genre: "Reggaeton", cover: "🐰", followers: "2.1M" },
    { id: 2, name: "Taylor Swift", genre: "Pop", cover: "✨", followers: "1.9M" },
    { id: 3, name: "The Weeknd", genre: "R&B", cover: "🌙", followers: "1.7M" },
    { id: 4, name: "Dua Lipa", genre: "Pop", cover: "💎", followers: "1.5M" },
    { id: 5, name: "Drake", genre: "Hip Hop", cover: "🦉", followers: "1.8M" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Buenas tardes{user?.name ? ` ${user.name}` : ''}! 
          </h1>
          <p className="text-zinc-400 text-lg">
            Tu cuenta ha sido creada exitosamente. Comienza a explorar tu nueva experiencia musical.
          </p>
        </div>



        {/* Create First Playlist Section */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Crea tu primera lista</h2>
              <p className="text-zinc-300 mb-4">Es muy fácil, y te echaremos una mano.</p>
              <button className="bg-white hover:bg-zinc-100 text-black font-semibold py-3 px-6 rounded-full transition-colors inline-flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Crear lista</span>
              </button>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-zinc-700 rounded-xl flex items-center justify-center">
                <Music className="w-16 h-16 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Trending Songs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Canciones en tendencia</h2>
            <button className="text-zinc-400 hover:text-white text-sm font-medium">
              Mostrar todos
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {trendingSongs.map((song) => (
              <div 
                key={song.id}
                className="bg-zinc-800/30 hover:bg-zinc-800/60 rounded-xl p-4 cursor-pointer transition-all duration-300 group"
              >
                <div className="relative mb-4">
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-4xl mb-4">
                    {song.cover}
                  </div>
                  <button className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Play className="w-4 h-4 text-black ml-0.5" />
                  </button>
                </div>
                <h3 className="text-white font-semibold mb-1 truncate">{song.title}</h3>
                <p className="text-zinc-400 text-sm truncate">{song.artist}</p>
                <p className="text-zinc-500 text-xs mt-1">{song.plays} reproducciones</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Artists */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Artistas populares</h2>
            <button className="text-zinc-400 hover:text-white text-sm font-medium">
              Mostrar todos
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularArtists.map((artist) => (
              <div 
                key={artist.id}
                className="text-center group cursor-pointer"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform">
                    {artist.cover}
                  </div>
                  <button className="absolute bottom-2 right-8 bg-green-500 hover:bg-green-400 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Play className="w-5 h-5 text-black ml-0.5" />
                  </button>
                </div>
                <h3 className="text-white font-semibold mb-1">{artist.name}</h3>
                <p className="text-zinc-400 text-sm">{artist.genre}</p>
                <p className="text-zinc-500 text-xs">{artist.followers} seguidores</p>
              </div>
            ))}
          </div>
        </div>

        {/* Podcasts Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Encuentra pódcasts que quieras seguir</h2>
              <p className="text-zinc-300 mb-4">Te avisaremos cuando salgan nuevos episodios</p>
              <button className="bg-white hover:bg-zinc-100 text-black font-semibold py-3 px-6 rounded-full transition-colors">
                Explorar pódcasts
              </button>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-zinc-700 rounded-xl flex items-center justify-center">
                <Headphones className="w-16 h-16 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-8">
          <button
            onClick={onContinue}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold py-4 px-8 rounded-full transition-colors inline-flex items-center space-x-2 text-lg"
          >
            <span>Continuar explorando</span>
            <Play className="w-5 h-5 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewUserHome;