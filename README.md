**TLDR;** Command-line unit testing of Rails React Components using Jasmine and Node. Code, installation and usage details below.

#### About React
[React](https://facebook.github.io/react/) is a very exciting Javacscript library (released by Facebook) that aims to solve a lot of the unfortunate aspects of client-side MVC frameworks. It champions a one-way data flow (as opposed to the magical two-way bindings used in Angular and Ember) that leads to more predicable rendering, a more declarative coding style, and simpler unit testing. It also requires considerably less bootstrapping than the MVCs, so dropping it in to an existing app is relatively painless.

> "This sounds great for my Rails app!" said the developer at 9:00am.

#### Plugging React into Rails
There's a very useful gem out there called [`react-rails`](https://github.com/reactjs/react-rails) that does the dirty work of plugging React into Rails. It instructs you to configure a `components` directory in `app/assets/javascripts` that you fill with `*.js.jsx` files. Then, through various wizardry it makes all variables defined in those files available in the browser's `window` namespace. It also provides a very useful view method for rendering React components. In short, it's a very clever and useful hack.

> "This feels a bit dirty, but it works!" said the developer, at 9:42am after running `bundle install` and configuring his app.

#### Unit Testing React in Rails
Because unit testing Ruby with Rspec is awesome, I was hoping to have a similar experience testing React. Here's the (relatively modest) list of features that I had in mind:

- The ability to run my specs from the command line
- The ability to run the specs in a specific file
- The ability to run a specific test within a file
- The ability to mock/stub dependencies
- Formated, coloured output similar the Rspec's that showed my passes/fails in realtime

You can use various test runners with React. I decided to use [Jasmine](http://jasmine.github.io/) because I became friends with it while using Node, and because there have been mixed reviews about Jest, the React test language (I'm sure it'll be great eventually, but for now it's still maturing).

> "Hm. Uhhhh... Uhhhh..." said the developer, whilst Googling for the above solution for the next 2-3 hours.

#### The Problem with Unit Testing React in Rails
`react-rails` uses the asset pipeline to make the React Components available. Unfortunately, this results in NSFW coupling between React and Rails that would make any unit-tester blush. Since the whole point was to unit test, there was no way I was going anywhere near Capybara to get access to my component. Capybara specs need to load both the rails app and a headless browser, so there's no way they could ever be fast enough.

With Capybara out of the running, it was becoming clear that Rails wasn't going to be able to solve my unit testing needs. So now what?

> "Well, maybe I can write a Node app for this!" said the developer, convinced that the benefits of unit testing outweighed the fact that he only had a week left in his sprint.

I had used Node a lot (albeit a few years back), so getting an environment up and running was not biggie. There are a few great npm packages out there for testing react, namely  `jasmine`, `jasmine-react-helpers` and `react-test-utils`. React requires a DOM for several of its behaviours, but fortunately [Hammerlab had a great article](http://www.hammerlab.org/2015/02/14/testing-react-web-apps-with-mocha/) that pointed me in the right direction for getting a DOM running within my test environment using the `jsdom` package.

> "Great! Let's write some tests!" said the sprightly if somewhat dishevelled developer, while sipping his 3:30pm tea.

#### Unit Testing Rails-ified React with Node
> "Uh Oh." said the developer - repeatedly - for the rest of the day.

Here's why.

Consider the following set up in a Jasmine spec file:
```
# /spec/path/component_spec.jsx
var MyComponent = require('path/to/component');
describe('MyComponent', function(){
   // Test test test
}):
```

Next, consider the way that `react-rails` gets you to define your components:
```
# /path/to/component.js.jsx
var MyComponent = React.createClass({
  render: function() {
    return <span>I am a component</span>;
  }
});
```

Here's where the difference between the Rails world and the Javascript world starts to hurt.

Because we don't define our React-Rails components as modules, invoking `require` in our tests doesn't actually get us what we need. The problem is, we can't add `module.exports` to our components because that would make Rails blow up. (If you're thinking Browserify, I did too - see **Shouldn't I have used Browserify?** below.)

> "Pint, anyone?" said the developer, as he wearily shut down his machine.

#### Two Hacks Make a Right, Right?

After a good night's sleep, I came up with a plan: write a pre-processor that compiles Rails-friendly React components into Jasmine-friendly modules. For example:

```
# /path/to/rails/component.js.jsx
var MyComponent = React.createClass({
  render: function() {
    return <span>I am a component</span>;
  }
});
```

Becomes:

```
# /secret/path/to/compiled/component.js
var React = require('react/addons');

var MyComponent = React.createClass({
  render: function() {
    return React.createElement("span", "I am a component");
  }
});

module.exports = { component: MyComponent };
```
These compiled components would go into a `.gitignored` directory that your specs would know the location of, and then we'd be able to test them just like regular Javascript modules, and it would be very fast.

#### The Pre-Processor

I decided to use Grunt for my pre-processing, mostly because I know it better than the other similar libraries. `grunt-wrap` was perfect for adding my `requires` at the top and `module.exports` at the bottom. All the dirty work is done with regex in a (creatively-named!) class called `Wrapper`, which I'm pround to announce was written with relatively small amounts of swearing.

I used `grunt-react` to compile both the wrapped components and my specs from `jsx` to `js` files, and `grunt-exec` to run the specs themselves.

#### Dependencies

Next, I needed to tackle dependencies. As I mentioned, `react-rails` adds everything to `window`, so you don't explicitly need to require anything. I went for a declaritive solution that is parsed by Grunt. It's not the prettiest girl in school, but it gets the job done. Note that the paths are relative to your React component within `app/assets/javascripts/components`:

```
// Dependencies: [../_mixins/form_input_mixin, ../_mixins/date_picker_mixin]
var DatePicker = React.createClass({
  mixins: [FormInputMixin, DatePickerMixin],
  render: function() {
    return (
      <div className="inline-field half">
        <label htmlFor={this.props.key}>{this.props.label}</label>
        <input onChange={this.onChange} />
      </div>
    );
  }
});
```

Becomes:

```
var React = require('react/addons');
var FormInputMixin = require('../_mixins/form_input_mixin').component;
var DatePickerMixin = require('../_mixins/date_picker_mixin').component;

// Dependencies: [../_mixins/form_input_mixin, ../_mixins/date_picker_mixin]
var DatePicker = React.createClass({displayName: "DatePicker",
  mixins: [FormInputMixin, DatePickerMixin],
  render: function() {
    return (
      React.createElement("div", {className: "inline-field half"},
        React.createElement("label", {htmlFor: this.props.key}, this.props.label),
        React.createElement("input", {onChange: this.onChange})
      )
    );
  }
});

module.exports = { component: DatePicker };
```

#### Writing the Specs

Each spec file is expected to be a `.jsx` file ending with `_spec`, ie. `text_field_spec.jsx`.
You need to include the React Helper in each file to set up dependencies.

A simple example:
```
// The React Helper sets up the Test DOM and handles dependencies
// react_helper_path and __component_base are globals set in the test runner,
// so you don't need to worry about relative paths
require(react_helper_path);

// The Components themselves are available as the `component` member of the compiled React module.
var TextField = require(__component_base + '/form_inputs/text_field').component;

describe('TextField', function(){
  var value = 'dummy_value';

  beforeEach(function(done) {
    this.subject = jasmineReact.render(<TextField value={value} />);
    done();
  });

  describe('.initialState', function(done) {
    it('sets value to value', function(done) {
      expect(this.subject.state.value).toEqual(value);
      done();
    });
  });
});
```

Use `rewire` to stub dependencies:
```
// Bootstrap tests
require(react_helper_path);

// Load rewire
var rewire = require("rewire");

// Load the Component module and set component as its own variable
// Note the use of 'rewire' instead of 'require'
var MyComponentModule = rewire(__component_base + '/path/to/my_component');
var MyComponent = MyComponentModule.component;

describe('MyComponent', function(){
  var testValue = 'Test Value';

  beforeEach(function(done) {
    // Replace MyDependecyComponent Dependency with a React Stub
    MyComponentModule.__set__({
      'MyDependecyComponent': jasmineReact.createStubComponent(window, "MyDependecyComponent")
    });

    this.subject = jasmineReact.render(<MyComponent value={testValue} />);
    done();
  });

  describe('.initialState', function(done) {
    it('sets value to value', function(done) {
      expect(this.subject.state.value).toEqual(value);
      done();
    });
  });
});
```

Simulate an Event:

Note that the easiest way to make this work is to give a CSS class to the DOM element you want to act on.
```
require(react_helper_path);
var TextField = require(__component_base + '/form_inputs/text_field').component;

describe('TextField', function(){
  var value = 'dummy_value';

  beforeEach(function(done) {
    this.subject = jasmineReact.render(<TextField value={value} />);
    done();
  });

  describe('on input change', function(done) {
    var updateValue = 'New Value';

    beforeEach(function(done) {
      // Requires the DOM element to have a className and to exist within the scope for this.subject
      // ie. <input className="react-text-field" onChange={this.props.onChange} />
      var domElement = TestUtils.findRenderedDOMComponentWithClass(this.subject, 'react-text-field');
      TestUtils.Simulate.change(domElement, { target: { value: updateValue } });
      done();
    });

    it('updates component state', function(done) {
      expect(subject.state.value).toEqual(updateValue);
      done();
    });
  });
});
```

#### Installation

- Visit the GIT REPO and download the source as a zip file.
- Unzip it and add the directory - `react_spec` - to your app root.
- Install Node.js and the Node Pacakge Manager (`npm`) if you haven't already.
- `cd` into `react_spec` and run `npm install`.
- Install the Grunt command line tool: `npm install -g grunt-cli`
- Set your `react-rails` component directory in the Gruntfile under `wrap.advanced.cwd`

#### Usage

From within the `react_spec` directory:
- Compile tests and components by running `grunt compile`
- Run specs by running `grunt test`
- Do both by running `grunt`

Running specific spec
- To run a group of specs, change `describe` to `fdescribe`
- To run an individual spec, change `it` to `fit`

#### Shouldn't I have used Browserify?

If you haven't read up on Browserify, you should. It allows you to use CommonJS includes in the *browser*, which is pretty awesome. There are a few articles out there about incorporating Browserify with `react-rails` using a gem called `browserify-rails` ([here's a good example](https://medium.com/technically-speaking/rails-react-browserify-e315001d5974)), but there is a pretty significant amount of config involved, and my only goal was to unit test the components. At risk of sounding like DHH, I didn't want my test requirements to influence my application.

Even with browserify I'd have to run my test via Node, so in the end I decided it was less intrusive to write a pre-compiler and leave my `react-rails` components alone.

#### Debugging

- The `grunt-react` package is unfortunately a bit secretive about where syntax errors are occuring with they exist. Running `grunt` with the `--verbose` flag helps with this.
- If you need to take a closer look at how the procompilation works, the files are in `react_spec/support/compiled` directory.
- Sometimes the `contextify` package decides to explode, resulting in errors like "Error: Module did not self-register". To fix, run `npm rebuild contextify`.

#### In Conclusion

> "Well, that was harder that I expected it to be" said the developer, 2 days later, looking at the beautiful output of unit-tested React components.

Once I got all of the setup out of the way, unit-testing React became simple and fast. Even with the asset precompilation, setting up the Node tests was much faster that setting up my Rails app to run Rspec. There's a decent amount of everhead when it comes to writing the specs themselves, but - in my experience - that's typical of Javascript testing in general, and well worth the peace of mind that comes from properly unit tested components.

As always, this is something I wrote to solve my specific problem, so there will be many cases that it *almost* fits. Feel free to submit an issue or pull request on the repo!
