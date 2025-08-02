// Base URL del backend
const API_BASE_URL = 'http://localhost:5000/api';

// Helper para hacer peticiones HTTP
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Añadir token si está disponible
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Servicios de autenticación
export const authService = {
  // Registro de usuario
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login de usuario
  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Guardar token en localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('spotifyUser', JSON.stringify(response.user));
    }

    return response;
  },

  // Obtener perfil del usuario
  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('spotifyUser');
  },

  // Verificar si hay token válido
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('spotifyUser');
    return !!(token && user);
  },

  // Obtener usuario del localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('spotifyUser');
    return user ? JSON.parse(user) : null;
  }
};

// Servicios de canciones (para futuro)
export const songService = {
  // Obtener canciones populares
  getPopularSongs: async () => {
    return apiRequest('/songs/popular');
  },

  // Buscar canciones
  searchSongs: async (query) => {
    return apiRequest(`/songs/search?q=${encodeURIComponent(query)}`);
  }
};

// Servicios de playlists (para futuro)
export const playlistService = {
  // Obtener playlists del usuario
  getUserPlaylists: async () => {
    return apiRequest('/playlists/my');
  },

  // Crear playlist
  createPlaylist: async (playlistData) => {
    return apiRequest('/playlists', {
      method: 'POST',
      body: JSON.stringify(playlistData),
    });
  }
};