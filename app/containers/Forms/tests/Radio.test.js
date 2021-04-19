import React from 'react';
import { assert } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import Radio from '@material-ui/core/Radio';

describe('<Radio />', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<Radio />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.root, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });
});
