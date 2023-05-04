import { render, screen } from '@testing-library/react';
import Home from '../index';

describe('Home', () => {
  test('renders QuestionaireBodyContent component', () => {
    render(<Home />);
    const questionairePage = screen.getByTestId('questionaire-page');
    expect(questionairePage).toBeInTheDocument();
  });
  
  // add more tests as needed
});

