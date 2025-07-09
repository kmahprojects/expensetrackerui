import React, { useEffect, useState } from 'react';
import ExpenseList from '../components/ExpenseList';

function Home() {

  const [appState, setAppState] = useState({
    loading: true,
    expenses: null,
  });

  
  useEffect( () => {
    setAppState({ loading: true });
    fetch('http://localhost:3500/api/expenses')
      .then(response => response.json())
      .then(data => {
        setAppState({ loading: false, expenses: data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setAppState({ loading: false, expenses: null });
      });
  }, []);

  return (
    <>
      <ExpenseList isLoading={appState.loading} expenses={appState.expenses}/>
    </>
  );

}
export default Home;
