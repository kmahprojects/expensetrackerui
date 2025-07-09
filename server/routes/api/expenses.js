import dotenv from 'dotenv';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import expenses from '../../businessExpenses.js'; 

dotenv.config();

const router = express.Router();

const API_PASSWORD = process.env.API_PASSWORD;

const checkPassword = (req, res, next) => {
  const provided = req.headers['admin-password'];

  if (!provided) {
    return res.status(401).json({ msg: 'No password provided' });
  }

  if (provided !== API_PASSWORD) {
    return res.status(403).json({ msg: 'Incorrect password' });
  }

  next();
};


/**
 * @route GET api/expenses
 * @desc Retrieves all expenses
 **/
router.get('/', (req, res) => res.json(expenses));

/**
 * @route GET api/expenses/:id
 * @desc Retrieves a single expense
 */
router.get('/:id', (req, res) => {
  const found = expenses.some(expense => expense.id === req.params.id);
  if (found) {
    res.json(expenses.filter(expense => expense.id === req.params.id));
  } else {
    res.status(400).json({ msg: `No expense with ID of ${req.params.id}` });
  }
});

/**
 * @route POST api/expenses/
 * @desc Create a new expense object
 **/
router.post('/',checkPassword, (req, res) => {
  const newExpense = {
    id: uuidv4(),
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    employee: req.body.employee,
  };

  if (
    !newExpense.description ||
    !newExpense.amount ||
    !newExpense.category ||
    !newExpense.date ||
    !newExpense.employee
  ) {
    return res.status(400).json({ msg: `Please fill out all the information!` });
  }

  expenses.push(newExpense);
  res.json(expenses);
});

/**
 * @route PUT api/expenses/:id
 * @desc Update an existing expense object
 **/
router.put('/:id', checkPassword, (req, res) => {
  const found = expenses.some(expense => expense.id === req.params.id);
  if (found) {
    const updateexpense = req.body;
    expenses.forEach(expense => {
      if (String(expense.id) === String(req.params.id)) {
        expense.description = updateexpense.description ? updateexpense.description : expense.description;
        expense.amount = updateexpense.amount ? updateexpense.amount : expense.amount;
        expense.category = updateexpense.category ? updateexpense.category : expense.category;
        expense.date = updateexpense.date ? updateexpense.date : expense.date;
        expense.employee = updateexpense.employee ? updateexpense.employee : expense.employee;
        res.json({ msg: `Expense Updated`, expense });
      }
    });
  } else {
    res.status(400).json({ msg: `No expense with ID of ${req.params.id}` });
  }
});

/**
 * @route DELETE api/expenses/:id
 * @desc delete an existing expense object
 **/
router.delete('/:id', checkPassword, (req, res) => {
  const index = expenses.findIndex(expense => String(expense.id) === String(req.params.id));

  if (index !== -1) {
    expenses.splice(index, 1); // remove from array
    res.json({ msg: `Expense deleted`, expenses });
  } else {
    res.status(400).json({ msg: `No expense with ID of ${req.params.id}` });
  }
});

export default router;
