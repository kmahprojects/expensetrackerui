import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';


const Create = () => {
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
            const response = await axios.post('http://localhost:3500/api/expenses/', expense,{
                headers: {
                    'admin-password': expense.password
                }
            });
            setNotification('Expense Added Successfully!');
            setTimeout(()=>setNotification(''), 3000)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setNotification(error.response.data.msg);
            } else {
                setNotification('Failed to add expense. Please try again.');
            }console.error(error);
        }
    };

  return (
    <div className="container">
        <h4>Create A New Expense</h4>
        <ExpenseForm
            expense={expense}
            onChange={handleChange}
            onSubmit={handleSubmit}
            categories={categories}
            notification={notification}
        />
        </div>
        );
    };

    export default Create;
