import { render, screen } from '@testing-library/react';
import QuestionaireBodyContent from '../QuestionairePage'
import '@testing-library/jest-dom'; // import this line to fix the error


describe('QuestionaireBodyContent', () => {
  test('renders page title', () => {
    render(<QuestionaireBodyContent />);
    const pageTitle = screen.getByText(/home/i);
    expect(pageTitle).toBeInTheDocument();
  });

  test('renders question title', () => {
    render(<QuestionaireBodyContent />);
    const questionTitle = screen.getByText(/how can i assist you\?/i);
    expect(questionTitle).toBeInTheDocument();
  });

  test('renders choices', () => {
    render(<QuestionaireBodyContent />);
    const choice1 = screen.getByText(/home/i);
    const choice2 = screen.getByText(/communication/i);
    expect(choice1).toBeInTheDocument();
    expect(choice2).toBeInTheDocument();
  });

  // add more tests as needed
});
