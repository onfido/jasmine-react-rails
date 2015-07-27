var ReactHelper = require(react_helper_path);
var TextField = require(__component_base + '/form_inputs/text_field').component;

describe('TextField', function(){

  var onInputChange = function(){};
  var name = 'dummy_key';
  var value = 'Dummy Value';
  var label = 'Dummy Label';
  var fieldGroupKey = 'dummy_group_key';
  var subject = null;

  beforeEach(function(done) {
    subject = jasmineReact.render(<TextField name={name} value={value} label={label} onInputChange={onInputChange} fieldGroupKey={fieldGroupKey} />);
    done();
  });

  describe('.initialState', function(done) {
    it('sets value to value', function(done) {
      expect(subject.state.value).toEqual(value);
      done();
    });
  });

  describe('on input change', function(done) {
    var updateValue = 'New Value';

    beforeEach(function(done) {
      var domElement = TestUtils.findRenderedDOMComponentWithClass(subject, 'react-text-field');
      TestUtils.Simulate.change(domElement, { target: { value: updateValue } });
      done();
    });

    it('updates component state', function(done) {
      expect(subject.state.value).toEqual(updateValue);
      done();
    });
  });
});
