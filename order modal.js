import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const OrderModal = ({ show, onClose, item }) => {
  const handleConfirmOrder = () => {
    // handle order confirmation and payment
    alert('Order confirmed!');
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{item?.name}</h5>
        <p>{item?.price} EGP</p>
        <div>
          <label>Payment Method:</label>
          <select className="form-control">
            <option>Cash</option>
            <option>Credit Card</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleConfirmOrder}>Confirm Order</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;