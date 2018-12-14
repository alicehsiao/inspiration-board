import React from 'react';
import NewCardForm from '../NewCardForm';
import { shallow } from 'enzyme';

describe('new card form', () => {
  it('will match the NewCardForm Snapshot', () => {
    const wrapper = shallow(<NewCardForm sendSubmissionCallback={() => {} } />);

    expect(wrapper).toMatchSnapshot();
  });
});
