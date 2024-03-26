import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ExpenseData } from '../interfaces/ExpenseData';
import { ExpenseCard } from './ExpenseCard';

const SpendingOverview: React.FC = () => {
  const [expenseItems, setExpenseItems] = useState<ExpenseData[]>([
    { type: 'Coffee', amount: 75, average: 70 },
    { type: 'Food', amount: 240, average: 250 },
    { type: 'Alcohol', amount: 85, average: 80 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAverageCoffee = await axios.get('http://localhost:3001/expenses/average/Coffee');
        const responseAverageAlcohol = await axios.get('http://localhost:3001/expenses/average/Alcohol');
        const responseAverageFood = await axios.get('http://localhost:3001/expenses/average/Food');
        const latestCoffee = await axios.get('http://localhost:3001/expenses/latest/Coffee');
        const latestAlcohol = await axios.get('http://localhost:3001/expenses/latest/Alcohol');
        const latestFood = await axios.get('http://localhost:3001/expenses/latest/Food');
        setExpenseItems([
          { type: 'Coffee', amount: latestCoffee.data.price, average: responseAverageCoffee.data.avg },
          { type: 'Food', amount: latestFood.data.price, average: responseAverageAlcohol.data.avg },
          { type: 'Alcohol', amount: latestAlcohol.data.price, average: responseAverageFood.data.avg },
        ]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [])

  const navigate = useNavigate();
  const handleAddExpensesClick = () => {
    navigate('/edit')
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Am I spending too much?
      </Typography>
      {expenseItems.map((expense, idx) => (
        <ExpenseCard key={idx} data={expense} />
      ))}
      <Button variant="contained" color="primary" onClick={handleAddExpensesClick}>
        Add expenses
      </Button>
    </Box>
  );
};

export default SpendingOverview;
