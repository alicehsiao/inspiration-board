import React from 'react';
import Card from '../Card';
import { shallow } from 'enzyme';

describe('card', () => {
  it('will match the Card Snapshot', () => {
    const wrapper = shallow(<Card
             text="My favorite winter activity is going back inside where it is warm."
             emoji="woozy"
             id={1}/>);

    expect(wrapper).toMatchSnapshot();
  });
});
