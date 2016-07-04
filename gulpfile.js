var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
  return browserify('./source/main.jsx')
        .transform('babelify', {presets: ['es2015', 'es2016', 'react']})
        .bundle()
        .pipe(source('main.jsx'))
        .pipe(gulp.dest('./public/javascripts'))
});
