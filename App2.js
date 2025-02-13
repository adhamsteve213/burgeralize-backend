import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './burgeralize.jpg.png';
import Card from './Card';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
      price
      img
    }
  }
`;

const Items = () => {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.items.map(item => (
    <div className="col-md-4 mb-4" key={item.id}>
      <Card item={item} />
    </div>
  ));
};

function App() {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <img src={logo} id="logo" alt="Burgeralize Logo" />
            <a className="navbar-brand" href="#">Burgeralize</a>
            <form className="d-flex" role="search">
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                value={searchText}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <div className="container mt-4">
          <div className="row">
            <Items />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;