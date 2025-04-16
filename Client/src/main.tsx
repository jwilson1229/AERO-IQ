import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router } from 'react-router-dom';  
import App from './App';


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', 
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


client.resetStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
        <Router>  
          <App />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
