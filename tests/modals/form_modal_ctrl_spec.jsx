require(react_helper_path);

var rewire = require("rewire");
var fixtures = require('../fixtures/occupationable');

var FormModalCtrlModule = rewire(__component_base + '/modals/modal_ctrl');
var FormModalCtrl = FormModalCtrlModule.component;

describe('FormModalCtrl', function(){

  beforeEach(function(done) {
    FormModalCtrlModule.__set__({'Modal': jasmineReact.createStubComponent(window, "Modal")});
    this.subject = jasmineReact.render(<FormModalCtrl buttonText="Dummy Title" store={fixtures.store} fieldKey='original'  />);
    done();
  });

  describe('.getInitialState', function () {
    it('hidden is false', function(done) {
      expect(this.subject.state.hidden).toBe(true);
      done();
    });
  });

  describe('.showModal', function () {
    it('hidden is false', function(done) {
      this.subject.showModal();
      expect(this.subject.state.hidden).toBe(false);
      done();
    });
  });

  describe('.hideModal', function () {
    it('hidden is true', function(done) {
      this.subject.state.hidden = false;
      this.subject.hideModal();
      expect(this.subject.state.hidden).toBe(true);
      done();
    });
  });
});
