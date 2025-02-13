import React from 'react';

const Card = ({ item, onOrder }) => {
  const handleOrder = () => {
    onOrder(item);
  };

  return (
    <div className="card">
      <img src={item.img} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <button className="btn btn-warning" onClick={handleOrder}>Order Now</button>
        <p>{item.price} EGP</p>
      </div>
    </div>
  );
};

export default Card;