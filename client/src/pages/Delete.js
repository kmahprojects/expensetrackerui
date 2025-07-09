import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function Delete() {
    const [expense, deleteExpense] = useState({
        id:'',
        password:''
    });
    const [notification, setNotification] = useState('');
    const handleChange = (event) => {
        const { name, value } = event.target;
            deleteExpense({
                ...expense,
                [name]: value
            });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3500/api/expenses/${expense.id}`, 
            {
                headers: {
                    'admin-password': expense.password
                }
            });
            setNotification('Expense deleted successfully!');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
            setNotification(error.response.data.msg);
         } else {
            setNotification('Failed to delete expense. Please try again.');
        }
        }
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
        <h4>Delete An Expense</h4>
        <div className="input-field">
        <input
                type="text"
                id="id"
                name="id"
                value={expense.id}
                onChange={handleChange}
            />
        <label htmlFor="id">Expense ID</label>
        </div>
        <div className="input-field">
      <input
          type="password"
          id="password"
          name="password"
          value={expense.password}
          onChange={handleChange}
          autoComplete="off"
          />
        <label htmlFor="password">Password</label>
      </div>
        <button className="btn waves-effect waves-light" type="submit">
        Submit
        </button>

      {notification && (
        <div style={{
          marginBottom: '1rem',
          color: notification.includes('Failed') || 
          notification.includes('Please fill') || 
          notification.includes('No expense') ||
          notification.includes('password')
            ? 'red'
            : 'green'
        }}>
          {notification}
        </div>
      )}
      </form>
        </div>
        
    )
}
         

                  
         


