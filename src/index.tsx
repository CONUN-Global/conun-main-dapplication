import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';

import './App.global.css';

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
