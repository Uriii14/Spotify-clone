const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  artist: {
    type: String,
    required: [true, 'Artist is required'],
    trim: true,
    maxlength: [100, 'Artist name cannot exceed 100 characters']
  },
  album: {
    type: String,
    trim: true,
    maxlength: [100, 'Album name cannot exceed 100 characters']
  },
  duration: {
    type: Number, // En segundos
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 second']
  },
  imageUrl: {
    type: String,
    default: null
  },
  audioUrl: {
    type: String,
    required: [true, 'Audio URL is required']
  },
  genre: {
    type: String,
    trim: true,
    maxlength: [50, 'Genre cannot exceed 50 characters']
  },
  year: {
    type: Number,
    min: [1900, 'Year cannot be before 1900'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  playCount: {
    type: Number,
    default: 0,
    min: [0, 'Play count cannot be negative']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
songSchema.index({ title: 'text', artist: 'text', album: 'text' });
songSchema.index({ artist: 1 });
songSchema.index({ album: 1 });
songSchema.index({ genre: 1 });
songSchema.index({ playCount: -1 }); // Para canciones más populares

// Método para incrementar reproducciones
songSchema.methods.incrementPlayCount = function() {
  this.playCount += 1;
  return this.save();
};

// Método virtual para duración formateada (mm:ss)
songSchema.virtual('formattedDuration').get(function() {
  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Método estático para buscar canciones
songSchema.statics.searchSongs = function(query, limit = 20) {
  return this.find({
    $and: [
      { isPublic: true },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { artist: { $regex: query, $options: 'i' } },
          { album: { $regex: query, $options: 'i' } }
        ]
      }
    ]
  })
  .populate('uploadedBy', 'name')
  .limit(limit)
  .sort({ playCount: -1 });
};

// Método estático para obtener canciones populares
songSchema.statics.getPopularSongs = function(limit = 50) {
  return this.find({ isPublic: true })
    .populate('uploadedBy', 'name')
    .sort({ playCount: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Song', songSchema);