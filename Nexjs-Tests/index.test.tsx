import { render, screen } from '@testing-library/react';
import Home from '../code/src/pages/index';

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
    const questionairePage = screen.getByTestId('questionaire-body-content');
    expect(questionairePage).toBeInTheDocument();
  });
});
