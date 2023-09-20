import React, { useState } from 'react';
import './App.css';
function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSaveProduct = () => {
    
    if (!name || !description || !price || !quantity) {
      alert('Please fill in all fields.');
      return;
    }

  
    if (isNaN(price) || isNaN(quantity)) {
      alert('Price and quantity must be numeric values.');
      return;
    }

    
    const productData = {
      name: name,
      description: description,
      price: parseFloat(price), 
      quantity: parseInt(quantity), 
    };

    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (response.status === 201) {
          alert('Product added successfully!');
          setName('');
          setDescription('');
          setPrice('');
          setQuantity('');
        } else {
          alert('Failed to add product.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while adding the product.');
      });
  };

  return (
    <div className="add-product-container">
      <div className="form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />

        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />

        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /><br />

        <label>Quantity:</label>
        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} /><br />

        <button className="save-button" onClick={handleSaveProduct}>Save</button>
      </div>
    </div>
  );
}

export default AddProduct;
