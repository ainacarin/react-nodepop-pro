import React from 'react';
import { shallow } from 'enzyme';

import { AuthButtonTest } from './AuthButton';

describe('AuthButtonTest', () => {
  const props = {
    isLogged: true,
    onLogout: jest.fn()
  };

  const render = () => shallow(<AuthButtonTest {...props} />);
  test('should render', () => {
    const wrapper = render();
    expect(wrapper.exists()).toBe(true);
  });

  test('snapshot testing', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  test('snapshot find element ConfirmationButton', () => {
    const wrapper = render();
    const confirmationButton = wrapper.find('ConfirmationButton');
    confirmationButton.props().onConfirm();
    expect(props.onLogout).toHaveBeenCalled()
  });

});
