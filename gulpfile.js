const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const autoprefix = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const useref = require("gulp-useref");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

function scripts() {
  return gulp
    .src("app/js/*.js")
    .pipe(browserSync.stream())
    .pipe(concat("concat.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("dist/js"));
}

function styles() {
  return gulp
    .src("app/css/*.css")
    .pipe(autoprefix())
    .pipe(browserSync.stream())
    .pipe(concat("concat.css"))
    .pipe(cleanCss())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("dist/css"));
}

function copy() {
  return gulp
    .src("app/*.html")
    .pipe(browserSync.stream())
    .pipe(useref({ noAssets: true }))
    .pipe(gulp.dest("dist"));
}

function images() {
  return gulp
    .src("app/img/*.+(png|jpg|gif|svg)")
    .pipe(browserSync.stream())
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
}

function browserSyncInit() {
  browserSync.init({
    server: {
      baseDir: "app",
      index: "index.html",
    },
  });
}

function watch() {
  browserSyncInit();
  gulp.watch("app/css/*.css", styles);
  gulp.watch("app/js/*.js", scripts); //.on("change", browserSync.reload);
  gulp.watch("app/*.html", copy); //.on("change", browserSync.reload);
  gulp.watch("app/img/*.+(png|jpg|gif|svg)", images); //.on("change", browserSync.reload);
}

exports.watch = gulp.series(
  gulp.parallel(styles, scripts, copy, images),
  watch
);
