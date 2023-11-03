import gulp from 'gulp';
import babel from 'gulp-babel';
//import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import * as gulpUglify from 'gulp-uglify-es';
const uglify = gulpUglify.default;

import imagemin from 'gulp-imagemin';
import {deleteAsync} from 'del';


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


gulp.task('js', function(done){
  console.log('minifying js...');
   gulp.src('./assets/**/*.js')
  .pipe(uglify.default())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
  done()
});


gulp.task('images', function(done){
  console.log('compressing images...');
  gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
  .pipe(imagemin())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
  done();
});


// empty the public/assets directory
gulp.task('clean:assets', async function(done){
  await deleteAsync(['./public/assets', '!./public/assets'])
  done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
  console.log('Building assets');
  done();
});

// Transpile the code
gulp.task('transpile', function () {
  return gulp.src('yourfile.js') // Replace 'yourfile.js' with your entry file
    .pipe(babel())
    .pipe(gulp.dest('output')); // Specify an output directory
});

// // Define a default task
// gulp.task('default', gulp.series('transpile', 'css'));
