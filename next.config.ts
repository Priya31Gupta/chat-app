module.exports = {
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: '/api/socket', // Ensure this is correct
      },
    ];
  },
};
