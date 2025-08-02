const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Playlist name is required'],
    trim: true,
    maxlength: [100, 'Playlist name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  imageUrl: {
    type: String,
    default: null
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required']
  },
  songs: [{
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  isCollaborative: {
    type: Boolean,
    default: false
  },
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permissions: {
      type: String,
      enum: ['edit', 'view'],
      default: 'edit'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  playCount: {
    type: Number,
    default: 0,
    min: [0, 'Play count cannot be negative']
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
playlistSchema.index({ name: 'text', description: 'text' });
playlistSchema.index({ owner: 1 });
playlistSchema.index({ isPublic: 1 });
playlistSchema.index({ playCount: -1 });
playlistSchema.index({ 'songs.song': 1 });

// Virtual para contar canciones
playlistSchema.virtual('songCount').get(function() {
  return this.songs ? this.songs.length : 0;
});

// Virtual para duración total de la playlist
playlistSchema.virtual('totalDuration').get(function() {
  if (!this.songs || !this.populated('songs.song')) return 0;
  
  return this.songs.reduce((total, item) => {
    return total + (item.song.duration || 0);
  }, 0);
});

// Método para añadir una canción
playlistSchema.methods.addSong = function(songId, userId) {
  // Verificar si la canción ya existe
  const songExists = this.songs.some(item => 
    item.song.toString() === songId.toString()
  );
  
  if (songExists) {
    throw new Error('Song already exists in playlist');
  }
  
  this.songs.push({
    song: songId,
    addedBy: userId,
    addedAt: new Date()
  });
  
  return this.save();
};

// Método para remover una canción
playlistSchema.methods.removeSong = function(songId) {
  this.songs = this.songs.filter(item => 
    item.song.toString() !== songId.toString()
  );
  
  return this.save();
};

// Método para verificar si un usuario puede editar
playlistSchema.methods.canUserEdit = function(userId) {
  // El owner siempre puede editar
  if (this.owner.toString() === userId.toString()) {
    return true;
  }
  
  // Si es colaborativa, verificar permisos
  if (this.isCollaborative) {
    const collaborator = this.collaborators.find(collab => 
      collab.user.toString() === userId.toString()
    );
    return collaborator && collaborator.permissions === 'edit';
  }
  
  return false;
};

// Método estático para buscar playlists públicas
playlistSchema.statics.searchPublicPlaylists = function(query, limit = 20) {
  return this.find({
    $and: [
      { isPublic: true },
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  })
  .populate('owner', 'name avatar')
  .populate('songs.song', 'title artist duration imageUrl')
  .sort({ playCount: -1 })
  .limit(limit);
};

// Método estático para obtener playlists populares
playlistSchema.statics.getPopularPlaylists = function(limit = 20) {
  return this.find({ isPublic: true })
    .populate('owner', 'name avatar')
    .populate('songs.song', 'title artist duration imageUrl')
    .sort({ playCount: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Playlist', playlistSchema);