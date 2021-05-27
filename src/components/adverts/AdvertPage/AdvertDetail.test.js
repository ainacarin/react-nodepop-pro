import React from 'react';
import { shallow } from 'enzyme';

import AdvertDetail from './AdvertDetail';
import { ConfirmationButton } from '../../shared'

describe('AdvertDetail', () => {
  const props = {
    name: 'advert detail',
    sale: true,
    price: 45.25,
    tags: ['tag1','tag2'],
    photo: null,
    onDelete: jest.fn()
  };

  const render = () => shallow(<AdvertDetail {...props} />);

  test('should render', () => {
    const wrapper = render();
    expect(wrapper.exists()).toBe(true);
  });

  test('snapshot testing', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  test('snapshot find element ConfirmationButton', () => {
    const expectedConfirmationText = 'Are you sure?';
    const wrapper = render();
    const confirmationButton = wrapper.find('ConfirmationButton');
    const { confirmation } = confirmationButton.props();
    expect(confirmation).toEqual(expectedConfirmationText);
  });

});
