require(react_helper_path);

var rewire = require("rewire");
var fixtures = require('../fixtures/occupationable');

var OccupationableFormModule = rewire(__component_base + 'occupationable/occupationable_form');
var OccupationableForm = OccupationableFormModule.component;

var stubDatePicker = React.createClass({
  getInitialState: function() {
    return { value: 'date_picker_value' };
  },
  render: function() {
    return <span className="dummy-date-span"></span>;
  }
});

var stubTextField = React.createClass({
  getInitialState: function() {
    return { value: 'text_field_value' };
  },
  render: function() {
    return <span className="dummy-text-span"></span>;
  }
});

var stubTextArea = React.createClass({
  getInitialState: function() {
    return { value: 'text_area_value' };
  },
  render: function() {
    return <span className="dummy-text-span"></span>;
  }
});

describe('OccupationableForm', function(){
  var formElements = fixtures.store;

  beforeEach(function(done) {
    OccupationableFormModule.__set__({
      'TextField': stubTextField,
      'DatePicker': stubDatePicker,
      'TextArea': stubTextArea
    });

    this.subject = jasmineReact.render(<OccupationableForm store={formElements} fieldKey='original' flags={fixtures.flags} />);
    done();
  });

  describe('.refs', function(done) {
    it('assigns each form element to refs', function(done) {
      expect(this.subject.refs.length).toEqual(formElements.length);
      done();
    });
  });

  describe('.elementType', function(done) {
    describe('when type is date_picker', function() {
      it('returns Datepicker', function(done) {
        expect(this.subject.elementType('date_picker')).toEqual(stubDatePicker);
        done();
      });
    });

    describe('when type is text_field', function() {
      it('returns Datepicker', function(done) {
        expect(this.subject.elementType('text_field')).toEqual(stubTextField);
        done();
      });
    });

    describe('when type is text_area', function() {
      it('returns TextArea', function(done) {
        expect(this.subject.elementType('text_area')).toEqual(stubTextArea);
        done();
      });
    });
  });

  describe('.elementArgs', function(done) {
    var fieldName = 'first_name';
    var fieldGroupKey = 'dummy_key';
    var data = {
      name: 'field name',
      original: 'value123'
    };

    it('build valid elementArgs hash', function(done) {
      args = this.subject.elementArgs(fieldName, fieldGroupKey, data);
      expect(args.key).toEqual(fieldName);
      expect(args.ref).toEqual(fieldName);
      expect(args.name).toEqual(fieldName);
      expect(args.value).toEqual(data.original);
      expect(args.label).toEqual(data.name);
      expect(args.fieldGroupKey).toEqual(fieldGroupKey);

      done();
    });
  });

  describe('.handleSubmit', function() {
    beforeEach(function(done) {
      this.subject.refs.start_date.state.value = 'MY_START_DATE';
      done()
    });

    it('clones store and updates with new values', function(done) {
      updated = this.subject.updatedState();
      expect(updated.occupation_fields.start_date.original).toEqual('MY_START_DATE');
      done()
    });
  });
});
