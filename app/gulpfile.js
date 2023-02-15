const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprites');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const path = require('path');
const rename = require("gulp-rename");

//  SVG Minify
//  -----------------------------------------------------------
gulp.task('sprites', function () {
    return gulp.src('./src/assets/icons/*.svg')
        .pipe(svgSprite({mode: "symbols"}))
        .pipe(gulp.dest("./src/assets/icons/sprite"));
});
// npm i gulp
// npm i gulp-svg-sprites
// npm i gulp-svgstore /yarn add svgstore
// npm i gulp-svgmin / yarn add gulp-svgmin
// npm i gulp-cheerio /yarn add gulp-cheerio
// npm i path / yarn add path
// npm i gulp-rename / yarn add gulp-rename
