import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import logo from './burgeralize.jpg.png';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import Card from './Card';
import OrderModal from './OrderModal';
import LoginModal from './LoginModal';

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

const Items = ({ onOrder }) => {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.items.map(item => (
    <div className="col-md-4 mb-4" key={item.id}>
      <Card item={item} onOrder={onOrder} />
    </div>
  ));
};

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOrder = (item) => {
    setSelectedItem(item);
    setShowOrderModal(true);
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handleOrderClose = () => {
    setShowOrderModal(false);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <img src={logo} id="logo" alt="Burgeralize Logo" />
            <a className="navbar-brand" href="#">Burgeralize</a>
            <button className="btn btn-outline-primary" onClick={handleLogin}>Login</button>
          </div>
        </nav>

        <div className="container mt-4">
          <div className="row">
            <Items onOrder={handleOrder} />
          </div>
        </div>

        <OrderModal
          show={showOrderModal}
          onClose={handleOrderClose}
          item={selectedItem}
        />

        <LoginModal
          show={showLoginModal}
          onClose={handleLoginClose}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;