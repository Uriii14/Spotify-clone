const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // No incluir password en queries por defecto
  },
  avatar: {
    type: String,
    default: null
  },
  likedSongs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  }],
  followedArtists: [{
    type: String, // Por ahora string, después podría ser ObjectId si tienes modelo Artist
    trim: true
  }],
  isPremium: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Middleware para hashear password antes de guardar
userSchema.pre('save', async function(next) {
  // Solo hashear si la password fue modificada
  if (!this.isModified('password')) return next();
  
  try {
    // Hash de la password con salt de 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para obtener datos públicos del usuario (sin password)
userSchema.methods.getPublicProfile = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    isPremium: this.isPremium,
    createdAt: this.createdAt,
    likedSongs: this.likedSongs?.length || 0,
    playlists: this.playlists?.length || 0
  };
};

module.exports = mongoose.model('User', userSchema);