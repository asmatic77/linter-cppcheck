'use strict';

var path = require('path');
var fs = require('fs');

module.exports.niceName = 'Custom file (.cppcheck-cfg.json)';

module.exports.settings = function () {
  // atom.notifications.addInfo( "inside settings function", { detail: "inside settings function" } );

  var cwd = atom.project.getPaths()[0]
  if (!cwd) { return; }
  var cppcConfig = path.join(cwd,'/.cppcheck-cfg.json');

  if ( !(fs.existsSync(cppcConfig) ) ) {
      return;
 }
  cppcConfig = fs.realpathSync(path.join(cwd,'/.cppcheck-cfg.json'));

  delete require.cache[cppcConfig];

  var createConfig = function(config) {
    return {
      execPath: config.execPath,
      cppcheckEnabledChecks: config.cppcheckEnabledChecks,
      cppcheckSomeFlag: config.cppcheckSomeFlag
    };
  };

  var configData = require(cppcConfig);
  var conf = createConfig(configData);

  // Debugging messages
  // atom.notifications.addInfo( "execPath", { detail: conf.execPath } );
  // atom.notifications.addInfo( "cppcheckEnabledChecks", { detail: conf.cppcheckEnabledChecks } );
  // atom.notifications.addInfo( "cppcheckSomeFlag", { detail: conf.cppcheckSomeFlag } );

  atom.config.set("linter-cppcheck.execPath", conf.execPath);
  atom.config.set("linter-cppcheck.gccDefaultCFlags", conf.cppcheckEnabledChecks);
  atom.config.set("linter-cppcheck.gccDefaultCppFlags", conf.cppcheckSomeFlag);
};
