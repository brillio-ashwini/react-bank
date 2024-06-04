import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editAge, setEditAge] = useState(0);
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8888/customers/read');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setEditName(customer.name);
    setEditEmail(customer.email);
    setEditAddress(customer.address);
    setEditAge(customer.age);
    setEditPhoneNumber(customer.phoneNumber);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8888/customers/editprofile/${editingCustomer.id}`, {
        name: editName,
        email: editEmail,
        address: editAddress,
        age: editAge,
        phoneNumber: editPhoneNumber
      });
      
      // Resetting editingCustomer state and input fields
      setEditingCustomer(null);
      setEditName('');
      setEditEmail('');
      setEditAddress('');
      setEditAge(0);
      setEditPhoneNumber('');

      // Fetch updated customer data
      fetchCustomers(); 
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      await axios.post('http://localhost:8888/customers/add', {
        name: newName,
        email: newEmail,
        address: newAddress,
        age: newAge,
        phoneNumber: newPhoneNumber
      });
      setNewName('');
      setNewEmail('');
      setNewAddress('');
      setNewAge(0);
      setNewPhoneNumber('');
      fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleButtonClick = (action, id) => {
    if (action === 'edit') {
      handleEditCustomer(id);
    } else if (action === 'delete') {
      deleteCustomer(id);
    } else if (action === 'save') {
    handleSaveEdit(); // Add this line to call handleSaveEdit
  }
  };

  return (
    <div>
      <h2>Customer List</h2>
      <div className="customer-table">
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.age}</td>
                <td>{customer.phoneNumber}</td>
                <td>
                  {editingCustomer && editingCustomer.id === customer.id ? (
                    <div className="edit-form">
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                      <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                      <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
                      <input type="number" value={editAge} onChange={(e) => setEditAge(parseInt(e.target.value))} />
                      <input type="text" value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)} />
                      <button onClick={() => handleButtonClick('save', editingCustomer.id)} className="save-button">Save</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => handleButtonClick('edit', customer.id)} className="edit-button">Edit</button>
                      <button onClick={() => handleButtonClick('delete', customer.id)} className="delete-button">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="new-customer">
        <h3>Add New Customer</h3>
        <div className='showdata'>
          <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <input type="text" placeholder="Address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
          <input type="number" placeholder="Age" value={newAge} onChange={(e) => setNewAge(parseInt(e.target.value))} />
          <input type="text" placeholder="Phone Number" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
          <button onClick={handleAddCustomer} className="add-button">Add Customer</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
