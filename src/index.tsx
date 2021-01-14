import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';

import './App.global.css';

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
