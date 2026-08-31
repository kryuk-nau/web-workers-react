import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('index.html', () => {
  function setup(jsx) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  const cases = [
    ['5', 25],
    ['-2', 4],
    ['16', 256],
  ];

  test.each(cases)(
    'with given value %p renders result "Result %p"',
    async (given, result) => {
      const { user } = setup(<App />);
      const button = screen.getByRole('button', { name: 'Calculate' });
      const input = screen.getByPlaceholderText('Insert a number');
      const divResult = screen.getByTestId('result');

      input.value = given;
      await user.clear(input);
      await user.type(input, given);
      await user.click(button);
      user.click(button);

      expect(divResult).toHaveTextContent(`Result: ${result}`);        
    }
  );
});
