import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';


export default function Update() {
        const [categories, setCategories] = useState([]);
        useEffect(()=>{
          fetch('http://localhost:3500/api/expenses')
          .then(res => res.json())
          .then(data => {
            const uniqueCategories = [...new Set(data.map(exp=>exp.category))];
            setCategories(uniqueCategories)
            });
        },[]);
        const [notification, setNotification] = useState('');
        const [expense, setExpense] = useState({
            description: '',
            amount: '',
            category: '',
            date: '',
            employee: '',
            password:''
        });
        const handleChange = (event) => {
            const { name, value } = event.target;
                setExpense({
                    ...expense,
                    [name]: value
                });
        };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3500/api/expenses/${expense.id}`, 
            expense,{
                headers: {
                    'admin-password': expense.password
                }
            });
            setNotification('Expense updated successfully!');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
            setNotification(error.response.data.msg);
         } else {
            setNotification('Failed to update expense. Please try again.');
        }
        }
    };

    return (
        <div className="container">
        <h4>Update An Expense</h4>
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
            <ExpenseForm
            expense={expense}
            onChange={handleChange}
            onSubmit={handleSubmit}
            categories={categories}
            notification={notification}
        />
        </div>
    );
}
