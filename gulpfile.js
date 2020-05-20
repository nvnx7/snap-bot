const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

gulp.task("scripts", () => {
  return gulp
    .src("app/js/*.js")
    .pipe(
      babel({
        presets: ["es2015"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});
