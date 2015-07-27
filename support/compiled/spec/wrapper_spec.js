require('../../react_helper');
var Wrapper = require('../../wrapper');

describe('Wrapper', function(){

  beforeEach(function() {
    this.wrapper = new Wrapper(__base + 'spec/fixtures/dependencies.js');
  });

  describe('.extractRawDependencies', function () {
    it('extracts array of paths', function(done) {
      expect(this.wrapper.extractRawDependencies()).toEqual([ './header', './report_content', '../modals/modal_ctrl', './constants', './occupationable_form' ]);
      done();
    });
  });

  describe('.parseDependency', function () {
    describe('path in same directory', function() {
      it('separates path from component name', function(done) {
        var parsed = this.wrapper.parseDependency('./overridable');
        expect(parsed.path).toEqual('./');
        expect(parsed.component).toEqual('overridable');
        done();
      });
    });

    describe('path in parent directory', function() {
      it('separates path from component name', function(done) {
        var parsed = this.wrapper.parseDependency('../another_component');
        expect(parsed.path).toEqual('../');
        expect(parsed.component).toEqual('another_component');
        done();
      });
    });

    describe('path in different directory', function() {
      it('separates path from component name', function(done) {
        var parsed = this.wrapper.parseDependency('../components/my_dir/my_component');
        expect(parsed.path).toEqual('../components/my_dir/');
        expect(parsed.component).toEqual('my_component');
        done();
      });
    });
  });

  describe('.outputDependency', function () {
    beforeEach(function() {
      this.parsed = {
        path: '../path/to/components/',
        component: 'my_component'
      };
    });
    it('extracts array of paths', function(done) {
      expect(this.wrapper.outputDependency(this.parsed)).toEqual("var MyComponent = require('../path/to/components/my_component').component;");
      done();
    });
  });
});
