import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';

import { queryClient } from './react-query/config';
import customTheme from './theme';

import './App.global.css';

render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={customTheme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
