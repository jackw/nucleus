/* global describe */
/* global it */

'use strict';

var assert = require('assert');
var Helpers = require('./helpers');
var Verbose = require('../src/Verbose.js');
var SassFunction = require('../src/entities/Function.js');

describe('Function', function() {

  it('should return nothing if the raw input is not valid', function() {
    Helpers.hook(Verbose, 'log');

    var m = new SassFunction({});
    assert.deepEqual(m, {});

    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should parse the parameters from the descriptor', function() {
    var m = new SassFunction({
      element: {
        params: "test ($param1, $param2: true)"
      },
      annotations: {
        description: 'A test description',
        param: [
          'param1 The first parameter',
          'param2 The second description'
        ]
      }
    });

    assert.deepEqual(m.parameters, [{
      name: 'param1',
      optional: false,
      description: 'The first parameter'
    }, {
      name: 'param2',
      optional: true,
      description: 'The second description'
    }]);

    m = new SassFunction({
      element: {
        params: "test ($param1)"
      },
      annotations: {
        description: 'A test description',
        param: 'param1 The only parameter'
      }
    });

    assert.deepEqual(m.parameters, [{
      name: 'param1',
      optional: false,
      description: 'The only parameter'
    }]);
  });

});
