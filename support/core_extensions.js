String.prototype.toUnderscore = function() {
  return this.replace(/(^[A-Z])/, function(match) {
    return match.toLowerCase();
  }).replace(/([A-Z])/g, function(match){
    return "_" + match.toLowerCase();
  });
};

String.prototype.toCamelCase = function(){
  return this.replace(/[-_]([a-z])/g, function (g) { return g[1].toUpperCase(); });
};

String.prototype.titleize = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
};
