require(react_helper_path);

var rewire = require("rewire");
var fixtures = require('../fixtures/occupationable');

var ReportContentModule = rewire(__component_base + '/occupationable/report_content');
var ReportContent = ReportContentModule.component;

var documents = [
  '<div></div>',
  '<span></span>'
];

describe('ReportContent', function(){

  beforeEach(function(done) {
    ReportContentModule.__set__({
      'FieldBlock': jasmineReact.createStubComponent(window, "FieldBlock")
    });
    this.subject = jasmineReact.render(<ReportContent store={fixtures.store} type="employment" flags={fixtures.flags} takeAction={fixtures.takeAction} documents={documents} />);
    done();
  });

  describe('.areAnyFieldsOverriden', function() {
    describe('when overrides exist', function() {
      it('returns true', function(done) {
        expect(this.subject.areAnyFieldsOverriden()).toBe(true);
        done();
      });
    });

    describe('when no overrides exist', function() {
      beforeEach(function(done) {
        this.subject = jasmineReact.render(<ReportContent store={fixtures.storeNoOverrides} type="employment" flags={fixtures.flags} takeAction={fixtures.takeAction} documents={documents} />);
        done();
      });

      it('returns false', function(done) {
        expect(this.subject.areAnyFieldsOverriden()).toBe(false);
        done();
      });
    });
  });
});
