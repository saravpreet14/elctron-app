module.exports = {
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
  images: {
    loader: 'cloudinary',
    domains: ['rickandmortyapi.com'],
    path: 'https://rickandmortyapi.com/api/character/avatar/'
  }
};
