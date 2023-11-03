import gulp from 'gulp';
import babel from 'gulp-babel';
//import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

gulp.task('css', function(){
  console.log('minifying css...');
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))
    .pipe(gulp.src('./assets/**/*.css'))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

// Transpile the code
gulp.task('transpile', function () {
  return gulp.src('yourfile.js') // Replace 'yourfile.js' with your entry file
    .pipe(babel())
    .pipe(gulp.dest('output')); // Specify an output directory
});

// Define a default task
gulp.task('default', gulp.series('transpile', 'css'));
