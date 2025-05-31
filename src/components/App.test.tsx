import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import * as api from '../api/api';
import React from 'react';
import tableStore from '../store/TableStore';

jest.mock('../api/api');
jest.mock('../store/TableStore', () => {
    const mockData = [
            { id: 1, name: 'Test item 1', description: 'Desc 1', price: 1000, quantity: 12, category: 'Cat 1'},
            { id: 2, name: 'Test item 2', description: 'Desc 2', price: 12000, quantity: 22, category: 'Cat 2'}
        ];
    return {
        __esModule: true,
        default: {
        data: mockData,
        loading: false,
        hasMore: false,
        columns: Object.keys(mockData[0]),
        loadMore: jest.fn(),
        addItem: jest.fn(),
        },
  };
});

describe('App async loading', () => {
    it('Инициализация', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.findByText('Test item 1')).toBeInTheDocument();
            expect(screen.getByText('Desc 2')).toBeInTheDocument();
        })
        
    })
})