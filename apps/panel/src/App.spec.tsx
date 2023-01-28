import { describe } from 'vitest';
import App from './App';
import { render } from './utils/tests';

describe('App', () => {
  it('should render correctly', () => {
    render(<App />);
  });
});
