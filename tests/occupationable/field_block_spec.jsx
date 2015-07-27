require(react_helper_path);

var rewire = require("rewire");
var fixtures = require('../fixtures/occupationable');

var FieldBlockModule = rewire(__component_base + '/occupationable/field_block');
var FieldBlock = FieldBlockModule.component;

describe('TextField', function(){

  var store = fixtures.store;
  var title = "Test Title";

  describe('Normal width', function() {
    beforeEach(function(done) {
      FieldBlockModule.__set__({'Override': jasmineReact.createStubComponent(window, "Override")});
      this.subject = jasmineReact.render(<FieldBlock title={title} fieldGroups={[store.occupation_fields]} />);
      done();
    });

    describe('.wrapperClassName', function() {
      it('returns "field-block"', function(done) {
        expect(this.subject.wrapperClassName()).toEqual('field-block');
        done();
      });
    });
  });

  describe('Long Text', function() {
    beforeEach(function(done) {
      FieldBlockModule.__set__({'Override': jasmineReact.createStubComponent(window, "Override")});
      this.subject = jasmineReact.render(<FieldBlock title={title} fieldGroups={[store.occupation_fields]} longText="true"/>);
      done();
    });

    describe('.wrapperClassName', function() {
      it('returns "field-block long-text"', function(done) {
        expect(this.subject.wrapperClassName()).toEqual('field-block long-text');
        done();
      });
    });


  });
});
