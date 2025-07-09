import React from 'react';

const ExpenseForm = ({ expense, onChange, onSubmit, categories, notification }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-field">
        <select
          id="category"
          name="category"
          value={expense.category}
          onChange={onChange}
          className="browser-default"
        >
          <option value="">--Select Category--</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="input-field">
        <input
          type="text"
          id="description"
          name="description"
          value={expense.description}
          onChange={onChange}
          autoComplete='off'
        />
        <label htmlFor="description">Description</label>
      </div>

      <div className="input-field">
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={onChange}
          autoComplete='off'
        />
        <label htmlFor="amount">Amount</label>
      </div>

      <div className="input-field">
        <input
          type="date"
          id="date"
          name="date"
          value={expense.date}
          onChange={onChange}
          autoComplete='off'
        />
        <label htmlFor="date">Date</label>
      </div>

      <div className="input-field">
        <input
          type="text"
          id="employee"
          name="employee"
          value={expense.employee}
          onChange={onChange}
          autoComplete='off'
        />
        <label htmlFor="employee">Employee Submitting Expense</label>
      </div>
      
      <div className="input-field">
      <input
          type="password"
          id="password"
          name="password"
          value={expense.password}
          onChange={onChange}
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
  );
};

export default ExpenseForm;