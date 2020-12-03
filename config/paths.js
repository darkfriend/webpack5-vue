const path = require('path')

module.exports = {
    // Source files
    src: path.resolve('src'),

    // Production build files
    build: path.resolve('dist'),

    // Static files that get copied to build folder
    public: path.resolve('assets'),
}