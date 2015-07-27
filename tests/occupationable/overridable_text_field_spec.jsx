require(react_helper_path);

var rewire = require("rewire");
var fixtures = require('../fixtures/occupationable');

var OverridableTextFieldModule = rewire(__component_base + '/occupationable/overridable_text_field');
var OverridableTextField = OverridableTextFieldModule.component;

describe('OverridableTextField', function(){

  var elementArgs = {
    fieldGroupKey: "occupationable_general_fields",
    label: "Job Title",
    name: "job_title",
    original: "Executive IT Consultant",
    override: "Sales Pro",
    override_id: 962,
    reviewAllConfirmed: function() { return true; },
    takeAction: function(constant, data) {
      return data.callback();
    }
  };

  beforeEach(function(done) {
    this.subject = jasmineReact.render(React.createElement(OverridableTextField, elementArgs));
    done();
  });

  describe('.getInitialState', function() {
    it('sets confirmed to false', function(done) {
      expect(this.subject.state.confirmed).toBe(false);
      done();
    });

    it('sets editing to false', function(done) {
      expect(this.subject.state.editing).toBe(false);
      done();
    });

    it('sets value to null', function(done) {
      expect(this.subject.state.value).toBe(null);
      done();
    });
  });

  describe('.updateConfirm', function() {
    describe('.setting to true', function() {
      beforeEach(function(done) {
        this.subject.updateConfirm(false);
        done();
      });

      it('sets confirmed state to true', function(done) {
        expect(this.subject.state.confirmed).toBe(false);
        done();
      });
    });

    describe('.setting to false', function() {
      beforeEach(function(done) {
        this.subject.state.confirmed = true;
        this.subject.updateConfirm(false);
        done();
      });

      it('sets confirmed state to false', function(done) {
        expect(this.subject.state.confirmed).toBe(false);
        done();
      });
    });
  });

  describe('.confirm', function() {
    beforeEach(function(done) {
      this.subject.confirm();
      done();
    });

    it('sets confirmed to true', function(done) {
      expect(this.subject.state.confirmed).toBe(true);
      done();
    });
  });

  describe('on input change', function(done) {
    var updateValue = 'New Value';

    beforeEach(function(done) {
      this.subject.state.confirmed = true;
      var domElement = TestUtils.findRenderedDOMComponentWithClass(this.subject, 'react-text-field');
      TestUtils.Simulate.change(domElement, { target: { value: updateValue } });
      done();
    });

    it('updates component state', function(done) {
      expect(this.subject.state.value).toEqual(updateValue);
      done();
    });

    it('sets confirmed to false', function(done) {
      expect(this.subject.state.confirmed).toBe(false);
      done();
    });
  });

  describe('on input focus', function(done) {
    beforeEach(function(done) {
      this.subject.state.confirmed = true;
      var domElement = TestUtils.findRenderedDOMComponentWithClass(this.subject, 'react-text-field');
      TestUtils.Simulate.focus(domElement, { target: {} });
      done();
    });

    it('sets editing to true', function(done) {
      expect(this.subject.state.editing).toBe(true);
      done();
    });

    it('sets confirmed to false', function(done) {
      expect(this.subject.state.confirmed).toBe(false);
      done();
    });
  });

  describe('on input blur', function(done) {
    var updateValue = 'New Value';

    describe('when editing is true', function(done) {
      beforeEach(function(done) {
        this.subject.state.editing = true;
        this.domElement = TestUtils.findRenderedDOMComponentWithClass(this.subject, 'react-text-field');
        done();
      });

      describe('when value is null', function(done) {
        beforeEach(function(done) {
          this.subject.state.value = null;
          TestUtils.Simulate.blur(this.domElement, { target: {} });
          done();
        });

        it('sets editing to false', function(done) {
          expect(this.subject.state.editing).toBe(false);
          done();
        });
      });

      describe('when value == props.original', function(done) {
        beforeEach(function(done) {
          this.subject.state.value = elementArgs.original;
          TestUtils.Simulate.blur(this.domElement, { target: {} });
          done();
        });

        it('sets editing to false', function(done) {
          expect(this.subject.state.editing).toBe(false);
          done();
        });
      });

      describe('when value == props.override', function(done) {
        beforeEach(function(done) {
          this.subject.state.value = elementArgs.override;
          TestUtils.Simulate.blur(this.domElement, { target: {} });
          done();
        });

        it('sets editing to false', function(done) {
          expect(this.subject.state.editing).toBe(false);
          done();
        });
      });

      describe('when value is new', function(done) {
        beforeEach(function(done) {
          this.subject.state.value = 'New value';
          TestUtils.Simulate.blur(this.domElement, { target: {} });
          done();
        });

        it('does not set editing to false', function(done) {
          expect(this.subject.state.editing).toBe(true);
          done();
        });
      });
    });
  });

  describe('.onConfirm', function(done) {
    beforeEach(function(done) {
      this.subject.state.confirmed = false;
      this.domElement = TestUtils.findRenderedDOMComponentWithClass(this.subject, 'override-confirm');
      done();
    });

    describe('when value has changed', function(done) {
      beforeEach(function(done) {
        this.subject.state.value = 'New value';
        TestUtils.Simulate.click(this.domElement, { target: {} });
        done();
      });

      it('submits form and sets confirmed to true', function(done) {
        expect(this.subject.state.confirmed).toBe(true);
        done();
      });
    });

    describe('when value has not changed and confirmed is true', function(done) {
      beforeEach(function(done) {
        this.subject.state.value = null;
        this.subject.state.confirmed = true;
        TestUtils.Simulate.click(this.domElement, { target: {} });
        done();
      });

      it('sets confirmed to false', function(done) {
        expect(this.subject.state.confirmed).toBe(false);
        done();
      });
    });

    describe('when value has not changed and confirmed is false', function(done) {
      beforeEach(function(done) {
        this.subject.state.value = null;
        this.subject.state.confirmed = false;
        TestUtils.Simulate.click(this.domElement, { target: {} });
        done();
      });

      it('sets confirmed to true', function(done) {
        expect(this.subject.state.confirmed).toBe(true);
        done();
      });
    });
  });
});
