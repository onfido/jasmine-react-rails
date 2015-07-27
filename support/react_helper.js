require('./core_extensions');
require('./test_dom').setup();

global.__base = __dirname + '/compiled/';
global.__component_base = __dirname + '/compiled/components/';

global.React = require('react/addons');
require('react-test-utils');
global.jasmineReact = require('jasmine-react-helpers');
global.TestUtils = React.addons.TestUtils;
