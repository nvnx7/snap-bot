const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const autoprefix = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const useref = require("gulp-useref");
const browserSync = require("browser-sync").create();

gulp.task("scripts", () => {
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
});

gulp.task("styles", () => {
  return gulp
    .src("app/css/*.css")
    .pipe(autoprefix())
    .pipe(concat("concat.css"))
    .pipe(cleanCss())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("dist/css"));
  // .pipe(
  //   browserSync.reload({
  //     stream: true,
  //   })
  // );
});

gulp.task("copy", () => {
  return gulp
    .src("app/*.html")
    .pipe(useref({ noAssets: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("browserSync", () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
});

// gulp.task("watch", ["browserSync", "styles", "scripts", "copy"], () => {
//   gulp.watch("app/css/*.css", gulp.series(["styles"]));
//   gulp.watch("app/js/*.js", gulp.series(["scripts"]));
//   gulp.watch("app/*.html", gulp.series(["copy"]));
// });
