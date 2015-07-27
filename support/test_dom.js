// Thanks to http://www.hammerlab.org/2015/02/14/testing-react-web-apps-with-mocha/
var setup = function() {
  if (typeof document !== 'undefined') return;
  var jsdom = require('jsdom').jsdom;
  global.document = jsdom("<html><body><div id='jasmine_content'></div></body></html>");
  global.window = document.parentWindow;
  global.navigator = {
    userAgent: 'node.js'
  };
};

module.exports = {
  setup: setup
};
