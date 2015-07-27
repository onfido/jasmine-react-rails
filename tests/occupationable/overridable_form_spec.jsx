require(react_helper_path);

var rewire = require("rewire");
var fixtures = require('../fixtures/occupationable');

var OverridableFormModule = rewire(__component_base + '/occupationable/overridable_form');
var OverridableForm = OverridableFormModule.component;

var stubDatePicker = React.createClass({
  getInitialState: function() {
    return { value: 'date_picker_value', confirmed: false };
  },
  render: function() {
    return <span className="dummy-date-span"></span>;
  }
});

var stubTextField = React.createClass({
  getInitialState: function() {
    return { value: 'text_field_value', confirmed: false };
  },
  render: function() {
    return <span className="dummy-text-span"></span>;
  }
});

var stubTextArea = React.createClass({
  getInitialState: function() {
    return { value: 'text_area_value', confirmed: false };
  },
  render: function() {
    return <span className="dummy-text-span"></span>;
  }
});

describe('OverridableForm', function(){
  var formElements = fixtures.store;

  beforeEach(function(done) {
    OverridableFormModule.__set__({
      'OverridableTextField': stubTextField,
      'OverridableDatePicker': stubDatePicker,
      'OverridableTextArea': stubTextArea
    });

    this.subject = jasmineReact.render(<OverridableForm store={formElements} fieldKey='override' flags={fixtures.flags} />);
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
      it('returns OverridableDatePicker', function(done) {
        expect(this.subject.elementType('date_picker')).toEqual(stubDatePicker);
        done();
      });
    });

    describe('when type is text_field', function() {
      it('returns OverridableTextField', function(done) {
        expect(this.subject.elementType('text_field')).toEqual(stubTextField);
        done();
      });
    });

    describe('when type is text_area', function() {
      it('returns OverridableTextArea', function(done) {
        expect(this.subject.elementType('text_area')).toEqual(stubTextArea);
        done();
      });
    });
  });

  describe('.reviewAllConfirmed', function() {
    describe('when all refs have been confirmed', function() {
      beforeEach(function(done) {
        var subject = this.subject;
        Object.keys(subject.refs).forEach(function(componentName) {
          subject.refs[componentName].state.confirmed = true
        });
        this.subject.reviewAllConfirmed();
        done();
      });

      it('returns true', function(done) {
        expect(this.subject.state.allConfirmed).toBe(true)
        done();
      });
    });

    describe('when all refs have not been confirmed', function() {
      it('returns false', function(done) {
        expect(this.subject.state.allConfirmed).toBe(false)
        done();
      });
    });
  });

  describe('.elementArgs', function(done) {
    var fieldName = 'first_name';
    var fieldGroupKey = 'dummy_key';
    var data = {
      name: 'field name',
      override: 'value123'
    };

    it('build valid elementArgs hash', function(done) {
      args = this.subject.elementArgs(fieldName, fieldGroupKey, data);

      expect(args.key).toEqual(fieldName);
      expect(args.ref).toEqual(fieldName);
      expect(args.name).toEqual(fieldName);
      expect(args.override).toEqual(data.override);
      expect(args.label).toEqual(data.name);
      expect(args.fieldGroupKey).toEqual(fieldGroupKey);

      done();
    });
  });
});
