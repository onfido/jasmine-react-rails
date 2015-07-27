var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter');
var noop = function() {};

global.react_helper_path = __dirname + '/support/react_helper';

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({print: noop});
jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
jrunner.loadConfigFile('support/compiled/spec/support/jasmine.json');
jrunner.execute();
