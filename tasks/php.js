const gulp = require("gulp");

const php = () => {
  return gulp.src("source/*.php").pipe(gulp.dest("build"));
};

module.exports = php;
