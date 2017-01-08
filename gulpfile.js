const gulp = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('scss', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./styles'))
})

gulp.task('browserSync', () => {
  browserSync.init(['./'], {
    server: {
      baseDir: './'
    }
  })
})

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./scss/**/*.scss', ['scss'])
})

gulp.task('default', ['watch', 'scss'])
