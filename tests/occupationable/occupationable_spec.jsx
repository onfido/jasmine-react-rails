require(react_helper_path);

var rewire = require("rewire");
var fixtures = require('../fixtures/occupationable');

var OccupationableModule = rewire(__component_base + 'occupationable/occupationable');
var Occupationable = OccupationableModule.component;
var Constants = require(__base + 'components/occupationable/constants').component;

describe('Occupationable', function(){

  var ids = {
    applicant_id: 5636,
    occupation_id: 1354,
    occupationable_id: 1136,
    questionnaire_id: 981
  };
  var title = "Edit Casper-Funk";
  var type = "nonemployment";
  var data = fixtures.store;

  beforeEach(function(done) {
    OccupationableModule.__set__({
      'Header': jasmineReact.createStubComponent(window, "Header"),
      'ReportContent': jasmineReact.createStubComponent(window, "ReportContent"),
      'ModalCtrl': jasmineReact.createStubComponent(window, "ModalCtrl")
    });
    this.subject = jasmineReact.render(<Occupationable ids={ids} title={title} type={type} data={data} flags={fixtures.flags} overall_status="completed" />);
    done();
  });

  describe('.getInitialState', function () {
    it('sets store to data', function(done) {
      expect(this.subject.state.store).toEqual(data);
      done();
    });
  });

  describe('.takeAction', function() {
    describe('UPDATE_STORE', function () {
      beforeEach(function(done) {
        this.formStore = this.subject.state.store;

        this.formStore.occupationable_general_fields.job_title.original = 'Lord of the World';
        this.formStore.occupationable_general_fields.reason_leaving.original = 'Those peasants were beneath me';

        this.subject.takeAction(Constants.UPDATE_STORE, this.formStore);
        done();
      });

      it('sets referenceModalDisplay false', function(done) {
        expect(this.subject.state.store).toEqual(this.formStore);
        done();
      });
    });

    describe('UPDATE_STORE_FOR_OVERRIDABLE', function () {
      beforeEach(function(done) {
        this.formStore = this.subject.state.store;

        this.formStore.occupationable_general_fields.job_title.original = 'Lord of the World';
        this.formStore.occupationable_general_fields.reason_leaving.original = 'Those peasants were beneath me';

        this.subject.takeAction(Constants.UPDATE_STORE, this.formStore);
        done();
      });

      it('sets referenceModalDisplay false', function(done) {
        expect(this.subject.state.store).toEqual(this.formStore);
        done();
      });
    });
  });
});
