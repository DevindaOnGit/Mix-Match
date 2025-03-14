import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import AdminNavBar from "../global-components/adminNavBar";

const ClothesReturn = ({
  clothes,
  searchQuery,
  handleSearch,
  handleOpenAddModal,
  showAddModal,
  setShowAddModal,
  handleFormSubmit,
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
  handleImageUpload,
  showUpdateModal,
  setShowUpdateModal,
  selectedItemForDelete,
  handleCancelDelete,
  handleConfirmDelete,
  filteredClothes,
  handleOpenUpdateModal,
  handleOpenDeleteConfirmationModal,
  generateReportPDF,
  generateReport
}) => {
  return (
    <div>
      <AdminNavBar />
      <div className="container mx-auto p-4 w-3/4 ml-80">
        <h1 className="text-2xl font-bold mb-4">Manage Clothes</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Total Items: <span className="font-bold">{clothes.length}</span></h2>
        </div>
        <Row className="mb-3">
          <Col>
            <Card className="bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <Card.Body>
                <Card.Title className="font-bold">Generate Clothes Report</Card.Title>
                <Card.Text>Generate a detailed report of clothes by<br/>category and most purchased items.</Card.Text>
                <Button className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded mb-4 mt-4 ml-2" onClick={generateReport}>Generate Report</Button>
                <Button className="bg-green-500 text-white hover:bg-green-700 ml-2 p-2 rounded mb-4 mt-4 mr-2" onClick={generateReportPDF}>Download PDF Report</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Search input */}
        <div className="mb-4">
          <div className="flex mb-2">
            <input type="text" className="form-control w-full p-2 border rounded" placeholder="Search by Item Code" value={searchQuery} onChange={handleSearch} />
          </div>
          <div>
            <button onClick={handleOpenAddModal} className="bg-blue-600 text-white p-2 rounded">Add New Clothes</button>
          </div>
        </div>

        {/* Modal for adding new clothes */}
        {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="modal-header p-4 border-b">
                <h5 className="modal-title text-lg font-semibold">Add New Clothes</h5>
                <button
                type="button"
                className="close text-gray-400 hover:text-gray-600"
                onClick={() => setShowAddModal(false)}
                >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body p-4">
                <form onSubmit={handleFormSubmit}>
                {error && (
                    <div className="alert alert-danger bg-red-500 text-white p-2 rounded mb-4" role="alert">
                    {error}
                    </div>
                )}
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Code</label>
                    <input
                    type="text"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                    type="text"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category: F-Female M-Male</label>
                    <select
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="">Select One</option>
                    <option value="F">F</option>
                    <option value="M">M</option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                    type="number"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                    type="number"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Alert Quantity</label>
                    <input
                    type="number"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={alertQuantity}
                    onChange={(e) => setAlertQuantity(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Supplier ID</label>
                    <input
                    type="text"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={supplier_id}
                    onChange={(e) => setSupplierId(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                    type="file"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    />
                </div>
                <div className="modal-footer flex justify-end p-4 border-t">
                    <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                    Add Clothes
                    </button>
                    <button
                    type="button"
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200 ml-2"
                    onClick={() => setShowAddModal(false)}
                    >
                    Close
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        )}


        {/* Modal for updating clothes */}
        {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="modal-header p-4 border-b">
                <h5 className="modal-title text-lg font-semibold">Update Clothes</h5>
                <button
                type="button"
                className="close text-gray-400 hover:text-gray-600"
                onClick={() => setShowUpdateModal(false)}
                >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body p-4">
                <form onSubmit={handleFormSubmit}>
                {error && (
                    <div className="alert alert-danger bg-red-500 text-white p-2 rounded mb-4" role="alert">
                    {error}
                    </div>
                )}
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Code</label>
                    <input
                    type="text"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                    type="text"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category: F-Female M-Male</label>
                    <select
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="">Select One</option>
                    <option value="F">F</option>
                    <option value="M">M</option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                    type="number"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                    type="number"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Alert Quantity</label>
                    <input
                    type="number"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={alertQuantity}
                    onChange={(e) => setAlertQuantity(e.target.value)}
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                    type="file"
                    className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    />
                </div>
                <div className="modal-footer flex justify-end p-4 border-t">
                    <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                    Update Clothes
                    </button>
                    <button
                    type="button"
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200 ml-2"
                    onClick={() => setShowUpdateModal(false)}
                    >
                    Close
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        )}


        {/* Modal for delete confirmation */}
        {selectedItemForDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="modal-header p-4 border-b">
                <h5 className="modal-title text-lg font-semibold">Confirm Delete</h5>
                <button
                type="button"
                className="close text-gray-400 hover:text-gray-600"
                onClick={handleCancelDelete}
                >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body p-4">
                <p className="text-gray-700">Are you sure you want to delete this item?</p>
            </div>
            <div className="modal-footer p-4 border-t">
                <button
                type="button"
                className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-200"
                onClick={handleConfirmDelete}
                >
                Delete
                </button>
                <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition duration-200 ml-2"
                onClick={handleCancelDelete}
                >
                Cancel
                </button>
            </div>
            </div>
        </div>
        )}


        {/* Product cards */}
        <Row>
          {filteredClothes.map((clothes, index) => (
            <Col md={4} key={index}>
              <Card className="mb-4 border border-gray-300 rounded-lg shadow-md">
                <Card.Img variant="top" src={`http://localhost:8070${clothes.imageUrl}`} className="w-full h-64 object-cover" />
                <Card.Body>
                  <Card.Title className="font-bold">{clothes.item_name}</Card.Title>
                  <Card.Text>
                    <strong>Item Code:</strong> {clothes.item_code} <br />
                    <strong>Category:</strong> {clothes.category} <br />
                    <strong>Price:</strong> ${clothes.price} <br />
                    <strong>Quantity:</strong> {clothes.quantity} <br />
                    <strong>Alert Quantity:</strong> {clothes.alert_quantity} <br />
                    <strong>Supplier ID:</strong> {clothes.supplier_id} <br />
                  </Card.Text>
                  <Button className="bg-green-500 text-white hover:bg-green-700 p-2 rounded mb-4" onClick={() => handleOpenUpdateModal(clothes)}>Update</Button>
                  <Button className="bg-red-500 text-white hover:bg-red-700 ml-2 p-2 rounded mb-4" onClick={() => handleOpenDeleteConfirmationModal(clothes)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ClothesReturn;
