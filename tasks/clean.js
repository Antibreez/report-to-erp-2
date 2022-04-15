const del = require("del");

module.exports = function clean() {
  return del("build");
  //return del(["build/**/*", "!build/stat.log"]);
};
