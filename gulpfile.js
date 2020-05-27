const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const autoprefix = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const useref = require("gulp-useref");
const imagemin = require("gulp-imagemin");
const mergeStream = require("merge-stream");
const browserSync = require("browser-sync").create();

function scripts() {
  const homePageScripts = gulp
    .src(["src/js/home/main.js", "src/js/home/searchBox.js"], {
      base: "src/js/home",
    })
    .pipe(concat("concat.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename("home.min.js"))
    .pipe(gulp.dest("public/includes"))
    .pipe(browserSync.stream());

  const tweetPageScripts = gulp
    .src(
      [
        "src/js/tweet/captureTweet.js",
        "src/js/tweet/main.js",
        "src/js/tweet/tweetPreview.js",
      ],
      { base: "src/js/tweet" }
    )
    .pipe(concat("concat.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename("tweet.min.js"))
    .pipe(gulp.dest("public/includes"))
    .pipe(browserSync.stream());

  return mergeStream(homePageScripts, tweetPageScripts);
}

function styles() {
  const homePageStyles = gulp
    .src(["src/css/home/styles.css", "src/css/common.css"], { base: "src/css" })
    .pipe(autoprefix())
    .pipe(concat("concat.css"))
    .pipe(cleanCss())
    .pipe(rename("home.min.css"))
    .pipe(gulp.dest("public/includes"))
    .pipe(browserSync.stream());

  const tweetPageStyles = gulp
    .src(
      [
        "src/css/tweet/styles.css",
        "src/css/tweet/preview.css",
        "src/css/common.css",
      ],
      { base: "src/css" }
    )
    .pipe(autoprefix())
    .pipe(concat("concat.css"))
    .pipe(cleanCss())
    .pipe(rename("tweet.min.css"))
    .pipe(gulp.dest("public/includes"))
    .pipe(browserSync.stream());

  return mergeStream(homePageStyles, tweetPageStyles);
}

function copy() {
  return gulp
    .src("src/*.html")
    .pipe(useref({ noAssets: true }))
    .pipe(gulp.dest("view"))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src("src/img/*.+(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("public/img"))
    .pipe(browserSync.stream());
}

function browserSyncInit() {
  browserSync.init({
    server: {
      baseDir: "view",
      index: "index.html",
    },
  });
}

function watch() {
  browserSyncInit();
  gulp.watch("src/css/**/*.css", styles);
  gulp.watch("src/js/**/*.js", scripts); //.on("change", browserSync.reload);
  gulp.watch("src/*.html", copy); //.on("change", browserSync.reload);
  gulp.watch("src/img/*.+(png|jpg|gif|svg)", images); //.on("change", browserSync.reload);
}

exports.watch = gulp.series(
  gulp.parallel(styles, scripts, copy, images),
  watch
);
