import { render, screen } from '@testing-library/react';
import { QuestionaireBodyContent } from '../code/src/pages/QuestionairePage';

describe('QuestionaireBodyContent', () => {
  it('renders without crashing', () => {
    render(<QuestionaireBodyContent />);
    const questionText = screen.getByText(/How can I assist you?/i);
    expect(questionText).toBeInTheDocument();
  });
});
