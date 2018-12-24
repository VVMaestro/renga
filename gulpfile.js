var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", function () {
  return gulp.src("source/css/style.css")
    .pipe(plumber())    
    .pipe(server.stream());
});

gulp.task("prefix", function () {
  return gulp.src("source/css/style.css")
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
});

gulp.task("serve", function () {
  server.init({
    server: "source/"
  });

  gulp.watch("source/css/style.css", gulp.series("style"));
  gulp.watch("source/*.html").on("change", server.reload);
});