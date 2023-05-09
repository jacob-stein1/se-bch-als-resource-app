import { render, screen } from '@testing-library/react';
import QuestionaireBodyContent from '../QuestionairePage'
// import '@testing-library/jest-dom'; // import this line to fix the error


describe('QuestionaireBodyContent', () => {
  it('renders without crashing', () => {
    render(<QuestionaireBodyContent />);
    const pageTitle = screen.getByText(/home/i);
    expect(pageTitle).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<QuestionaireBodyContent />);
    const questionTitle = screen.getByText(/how can i assist you\?/i);
    expect(questionTitle).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<QuestionaireBodyContent />);
    const choice1 = screen.getByText(/communication/i);
    expect(choice1).toBeInTheDocument();
  });

  // add more tests as needed
});
