import React from "react";
import { shallow } from "enzyme";

import LoginForm from "./LoginForm";

describe("Test LoginForm", () => {
  const props = {
    onSubmit: jest.fn(),
  };
  const render = () => shallow(<LoginForm {...props} />);

  test("should render", () => {
    const wrapper = render();
    expect(wrapper.exists()).toBe(true);
  });

  test("should submit credentials", () => {
    const credentials = {
        email: 'email@example.com',
        password: '1234',
        remember: false
    }
    const targetChangeEmail = {
        target: {
            name: 'email',
            value: credentials.email,
        },
    };
    const targetChangePassword = {
        target: {
            name: 'password',
            value: credentials.password,
        },
    };

    const wrapper = render();
   
    const inputEmail = wrapper.find({ name: "email" });
    inputEmail.simulate("change", targetChangeEmail);
    
    const inputPassword = wrapper.find({ name: "password" });
    inputPassword.simulate("change", targetChangePassword);
    
    const form = wrapper.find("form");

    form.simulate("submit", { preventDefault() {} });

    expect(wrapper.find('button').props().disabled).toBe(false);
    
    expect(props.onSubmit).toHaveBeenCalledWith(credentials);
  });
});
