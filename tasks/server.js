const sync = require("browser-sync").create();

const server = {
  init: (done) => {
    sync.init({
      // server: {
      //   baseDir: "build"
      // },
      cors: true,
      notify: false,
      ui: false,
      proxy: "report-to-erp",
    });
    done();
  },
  reload: (done) => {
    sync.reload();
    done();
  },
  stream: sync.stream,
};

module.exports = server;
