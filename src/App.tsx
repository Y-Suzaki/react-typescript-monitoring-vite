import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import theme from './thema/theme';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import Amplify from 'aws-amplify';
import AwsConfigAuth from './config/awsConfig';
import { UseAuthProvider } from './providers/UseAuthProvider';

Amplify.configure({ Auth: AwsConfigAuth });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <UseAuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UseAuthProvider>
    </ChakraProvider>
  );
}

export default App;
