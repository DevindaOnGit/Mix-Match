import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'; 
import './returnHome.css';
import axios from 'axios';

import Navbar from '../NavBar'
import Footer from "../global-components/footer";

const ClothesReturn = ({
  clothes,
  error,
  itemCode,
  setItemCode,
  itemName,
  setItemName,
  category,
  setCategory,
  price,
  setPrice,
  quantity,
  setQuantity,
  alertQuantity,
  setAlertQuantity,
  supplier_id,
  setSupplierId,
}) => {

  const [searchQuery, setSearchQuery] = useState(''); // Use state to manage search query
  const [filteredClothes, setFilteredClothes] = useState(clothes); // Store filtered clothes

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter clothes based on the search query
  useEffect(() => {
    setFilteredClothes(
      clothes.filter((item) => 
        item.item_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, clothes]); // Apply filtering whenever searchQuery or clothes changes

  // Function to handle Add to Cart
  const handleAddToCart = (item) => {
    const cartItem = {
      cItemCode: item.item_code,
      cItemName: item.item_name,
      cPrice: item.price,
      cImage: item.imageUrl,
      cQuantity: 1, // Default quantity as 1
    };

    // Add the item to the cart
    axios.post('http://localhost:8070/cart/add', cartItem)
      .then((response) => {
        alert('Item added to cart successfully!');

        // After adding to cart, decrease the quantity
        axios.put(`http://localhost:8070/home/decrease/${item.item_code}`, {
          quantity: 1, // Decrease quantity by 1
        })
        .then((response) => {
          console.log('Quantity decreased successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error decreasing quantity:', error);
        });

      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };

  return (
    <div>
      <Navbar/>
    
    <div className="container-shopping">
      <div className="row">
        <div className="col-md-6 text-md-end mb-3"></div>
      </div>
      <Row className="mb-3">
        <div className="col-md-4">
          <div className="cardTotal">
            <div className="card-body-total">
              {/* Total items display if needed */}
            </div>
          </div>
        </div>
      </Row>

      <div>
        <div className="search-container">
          <div className="search-box d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Item Code or Name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="cardSection">
        <Row xs={1} sm={2} md={3} className="g-4 mt-4">
          {filteredClothes.map((clothes) => (
            <Col key={clothes.item_code}>
              <Card className="cardItems">
                <Card.Body>
                  <Card.Title className="text-center">{clothes.item_name}</Card.Title>
                  <div className="text-center">
                    {clothes.imageUrl && (
                      <img
                        src={`http://localhost:8070${clothes.imageUrl}`}
                        alt={clothes.item_name}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <Card.Text>
                    <div className="fw-light">Item Code: {clothes.item_code}</div>
                    <div className="fw-light">Category: {clothes.category}</div>
                    <div className="fw-light">Price: {clothes.price}</div>
                  </Card.Text>
                  {/* Button Container */}
                  <div className="button-container">
                    <Button className="add-to-cart-btn" onClick={() => handleAddToCart(clothes)}>Add to Cart</Button>
                    <Link to={`/item/${clothes.item_code}`}>
                      <Button className="view-btn">View</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ClothesReturn;
