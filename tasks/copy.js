const gulp = require("gulp");

module.exports = function copy(done) {
  gulp
    .src(["source/fonts/*.{woff2,woff}", "source/*.ico", "source/stat.log"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};
