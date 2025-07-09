import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = (props) => {
  const { expenses, isLoading } = props;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  if (!expenses || expenses.length === 0) {
    return <p>No items to display</p>;
  }
  const moneyConvert= new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD'
  })
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  // Get all categories
  const categories = [...new Set(expenses.map(expense => expense.category))];

  // Filter expenses once
  const filteredExpenses = expenses.filter(item =>
    (selectedCategory === '' || item.category === selectedCategory) &&
    (selectedID === '' || item.id === selectedID) &&
    (selectedMonth === '' || item.date.split("-")[1] === selectedMonth) &&
    (String(selectedYear) === '' || item.date.split("-")[0] === String(selectedYear))
  );

  // Calculate total amount
  const totalAmount = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

  // Handlers
  const handleCategoryChange = (event) => setSelectedCategory(event.target.value);
  const handleIDChange = (event) => setSelectedID(event.target.value);
  const handleMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleYearChange = (event) => setSelectedYear(event.target.value);

  return (
    <div className="container row">
      <h2 className='list-head'>List of expenses</h2>
      <div>
        <fieldset>
          <legend>Filter Options</legend>
          <div>
            <label htmlFor="category">Filter by Category</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="browser-default">
              <option value="">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="idSelect">Filter by ID</label><br />
            <input type="text" id="idSelect" value={selectedID} onChange={handleIDChange} className="browser-default" />
          </div>
          <div>
            <label htmlFor="month">Filter by Month</label><br />
            <select id="month" value={selectedMonth} onChange={handleMonthChange} className="browser-default">
              <option value="">All</option>
              {months.map((month, index) => {
                const monthNumber = String(index + 1).padStart(2, '0');
                return <option key={index} value={monthNumber}>{month}</option>;
              })}
            </select>
          </div>
          <div>
            <label htmlFor="yearSelect">Filter by Year</label><br />
            <input type="number" id="yearSelect" value={selectedYear} onChange={handleYearChange} className="browser-default" />
          </div>
        </fieldset>
      </div>
      <br />
      <table className="expenseTable">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Submitted By</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && filteredExpenses.map(item => (
            <ExpenseItem key={item.id} item={item} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td colSpan="2">{moneyConvert.format(totalAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseList;
