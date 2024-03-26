import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ExpenseEntry {
    userId: number;
    date: string;
    item: string;
    price: number;
}

const EditExpense: React.FC = () => {
  const userId = 101010;
  const [coffee, setCoffee] = useState(0);
  const [food, setFood] = useState(0);
  const [alcohol, setAlcohol] = useState(0);
  const [vals, setVals] = useState(0);
  const [valid, setvalid] = useState(false);
  const [formData, setFormData] = useState<ExpenseEntry>({
    userId: 101010,
    date: '2024-03-22',
    item: '',
    price: 0
  })

  useEffect(() => {
    displayLogic()
  }, [coffee, food, alcohol])

  const displayLogic = () => {
    let arr = [coffee, food, alcohol];
    arr = arr.filter(x => x !== 0) 
    if(arr.length > 1) {
        setVals(2);
        setvalid(false);
        return false;
    }
    else if(arr.length === 0) {
        setVals(0);
        setvalid(false);
        return false;
    }
    else {
        if(typeof arr[0] !== 'number') return false;
        const todayDate = new Date();
        const dateString = todayDate.toISOString().split('T')[0]; // 'yyyy-mm-dd'
        if(coffee !== 0) setFormData({
            userId: 101010,
            date: dateString,
            item: 'Coffee',
            price: coffee
        })
        else if(food !== 0) setFormData({
            userId: 101010,
            date: dateString,
            item: 'Food',
            price: food
        })
        else if(alcohol !== 0) setFormData({
            userId: 101010,
            date: dateString,
            item: 'Alcohol',
            price: alcohol
        })
        setVals(1);
        setvalid(true);
        return true;
    } 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    if(displayLogic() && (vals === 1)) {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3001/expenses/101010', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Expense added:', await response.json());
        } catch (error) {
          console.error('Failed to add expense:', error);
        }
    } else {
        if(vals === 0) alert('Put atleast one value!!!')
        else alert("Input correct value / Too many values!!!");
    }
    setvalid(false)
  };

  const navigate = useNavigate();
  const onBackClick = () => {
    navigate('/')
  };

  return (
    <Box
      sx={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Typography variant="h5" component="h1" sx={{ textAlign: 'flex' }}>
        How much did I spend today?
      </Typography>
      <TextField
        label="Coffee"
        variant="outlined"
        onChange={(e) => {
            if(e.target.value && (Number(e.target.value) < 1 || Number(e.target.value) > 100)) {
                setvalid(false);
                alert('values should be in 1-100')
            }
            else{
                setvalid(true);
                setCoffee(Number(e.target.value))
            }
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*(.[0-9]{0,2})?' }}
      />
      <TextField
        label="Food"
        variant="outlined"
        onChange={(e) => {
            if(e.target.value && (Number(e.target.value) < 1 || Number(e.target.value) > 100)) {
                setvalid(false);
                alert('values should be in 1-100')
            }
            else{
                setvalid(true);
                setFood(Number(e.target.value))
            }
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*(.[0-9]{0,2})?' }}
      />
      <TextField
        label="Alcohol"
        variant="outlined"
        onChange={(e) => {
            if(e.target.value && (Number(e.target.value) < 1 || Number(e.target.value) > 100)) {
                setvalid(false);
                alert('values should be in 1-100')
            }
            else{
                setvalid(true);
                setAlcohol(Number(e.target.value))
            }
        }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*(.[0-9]{0,2})?' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="error" onClick={onBackClick}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!valid}>
          Add Expenses
        </Button>
      </Box>
    </Box>
  );
};

export default EditExpense;
