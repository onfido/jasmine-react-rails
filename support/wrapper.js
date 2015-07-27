// Extract module names and dependencies of React components from Rails
function Wrapper(filepath) {
  var fs = require('fs');
  this.file = fs.readFileSync(filepath, 'utf8');
}
Wrapper.prototype.extractComponent = function() {
  return this.file.match(/.*var\s(.*)\s=.*/)[1];
};
Wrapper.prototype.extractRawDependencies = function() {
  var raw_dependencies = this.file.match(/.*\/\/\sDependencies:\s\[(.+)\].*/);

  if (raw_dependencies !== null) {
    return raw_dependencies[1].split(/,\s*/);
  } else {
    return [];
  }
};
Wrapper.prototype.parseDependency = function(rawDependency) {
  var parts = rawDependency.match(/(^\.\.?.*\/)(.*)/);
  return {
    path: parts[1],
    component: parts[2]
  };
};
Wrapper.prototype.outputDependency = function(parsed) {
  return "var " + parsed.component.toCamelCase().titleize() + " = require('" + parsed.path + parsed.component +  "').component;";
};
Wrapper.prototype.dependencies = function() {
  var that = this;
  return this.extractRawDependencies().map(function(rawDependency) {
    return that.outputDependency(that.parseDependency(rawDependency));
  }).join('\n');
};
Wrapper.prototype.beforeText = function() {
  return [
    "var React = require('react/addons');",
    this.dependencies()
  ].join('\n');
};
Wrapper.prototype.afterText = function() {
  return 'module.exports = { component: ' + this.extractComponent() + ' };';
};
module.exports = Wrapper;
