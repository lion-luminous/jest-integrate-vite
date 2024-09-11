import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Update the path to your store
import AddTask from './AddTask';

test('renders AddTask component', () => {
  render(
    <Provider store={store}>
      <AddTask />
    </Provider>
  );
  const linkElement = screen.getByText(/Add Task/i);
  expect(linkElement).toBeInTheDocument();
});