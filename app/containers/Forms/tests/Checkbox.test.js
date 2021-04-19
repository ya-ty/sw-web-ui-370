import React from 'react';
import { assert } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import Checkbox from '@material-ui/core/Checkbox';

describe('<Checkbox />', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<Checkbox />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should have the classes required for Checkbox', () => {
    assert.strictEqual(typeof classes.root, 'string');
    assert.strictEqual(typeof classes.checked, 'string');
    assert.strictEqual(typeof classes.disabled, 'string');
  });

  it('should mount without issue', () => {
    mount(<Checkbox checked />);
  });
});
