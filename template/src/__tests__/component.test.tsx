import React from 'react';
import { render } from '@testing-library/react';
import Component from '../component';

describe('test component', () => {
  it('should render', () => {
    const wrapper = render(<Component />);
    const element = wrapper.getByText('Component');
    expect(element).toBeInTheDocument();
  });
});
