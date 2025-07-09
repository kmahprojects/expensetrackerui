import React, { useState } from 'react';


const ExpenseItem = ({ item }) => {
  const { id, category, description, amount, date, employee } = item;

  const moneyConvert= new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD'
  })

  return (
        <tr>
          <td>{category}</td>
          <td>{description}</td>
          <td>{moneyConvert.format(amount)}</td>
          <td>{date}</td>
          <td>{employee}</td>
        </tr>
  );
};


export default ExpenseItem;
