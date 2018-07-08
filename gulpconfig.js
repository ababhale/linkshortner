var path = {
	HTML: ['public/*.html'],
	COPY_ASSETS: ['./src/assets/**/*'],
	ALL: ['src/app/*.js*', 'src/app/**/*.js*', 'public/app/index.html'],
	JS: ['src/app/.js*', 'src/app/**/*.js*'],
	VENDOR_JS: 'src/vendors/vendors.js',
	MINIFIED_OUT: 'build.min.js',
	DEST_SRC: 'dist1/src',
	DEST_BUILD: 'dist1/build',
	DEST: 'dist1',
	ENTRY_POINT: './src/app/index.js',
	FOUNDATION_PATH: './src/vendors/build-foundation.scss',
	PROJECT_SCSS: './src/app/**/*.scss'
};

module.exports = path;