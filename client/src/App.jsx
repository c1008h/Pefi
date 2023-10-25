// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import store from './store';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { authService } from './utils/auth';
import { loginUser,logoutUser } from './features/auth/authSlice';
import { useEffect } from 'react';

export default function App() {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3006/graphql' || 'https://pefi-cb4de0d6766a.herokuapp.com/graphql',
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

  const initializeAuth =() => {
    const token = authService.getToken()
    if (token && authService.isTokenExpired(token)) {
      store.dispatch(logoutUser());
    } else if (token) {
      const userData = authService.getProfile()
      store.dispatch(loginUser(userData))
    }
  }

  useEffect(() => {
    initializeAuth()
  }, [])
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    // cache: cache
  });
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ApolloProvider client={client}>
        <div className='app-container'>
          <Provider store={store}>
            <Navbar />
            <Outlet />
            <Footer />
          </Provider>
        </div>
      </ApolloProvider>
    </LocalizationProvider>
  );
}

