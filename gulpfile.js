const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const autoprefix = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const useref = require("gulp-useref");
const browserSync = require("browser-sync").create();

function scripts() {
  return gulp
    .src("app/js/*.js")
    .pipe(concat("concat.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("dist/js"));
  // .pipe(
  //   browserSync.reload({
  //     stream: true,
  //   })
  // );
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
    .pipe(useref({ noAssets: true }))
    .pipe(gulp.dest("dist"));
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
  gulp.watch("app/js/*.js").on("change", browserSync.reload);
  gulp.watch("app/*.html").on("change", browserSync.reload);
}

exports.watch = watch;
