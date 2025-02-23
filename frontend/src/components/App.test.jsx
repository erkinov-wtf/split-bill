// frontend/src/components/BillSplitter.test.jsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extra matchers like toBeInTheDocument
import BillSplitter from './BillSplitter';

describe('BillSplitter component', () => {
    test('renders the inputs and button', () => {
        render(<BillSplitter />);
        expect(screen.getByTestId('amount-input')).toBeInTheDocument();
        expect(screen.getByTestId('people-input')).toBeInTheDocument();
        expect(screen.getByTestId('split-button')).toBeInTheDocument();
    });

    test('splits the bill correctly for valid inputs', () => {
        render(<BillSplitter />);
        fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '100' } });
        fireEvent.change(screen.getByTestId('people-input'), { target: { value: '4' } });
        fireEvent.click(screen.getByTestId('split-button'));
        expect(screen.getByTestId('result')).toHaveTextContent('25.00');
    });

    test('shows "Invalid input" for bad input or zero people', () => {
        render(<BillSplitter />);
        fireEvent.change(screen.getByTestId('amount-input'), { target: { value: 'abc' } });
        fireEvent.change(screen.getByTestId('people-input'), { target: { value: '0' } });
        fireEvent.click(screen.getByTestId('split-button'));
        expect(screen.getByTestId('result')).toHaveTextContent('Invalid input');
    });
});
