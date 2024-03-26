import { ExpenseData } from "../interfaces/ExpenseData";

import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';

export const ExpenseCard: React.FC<{ data: ExpenseData }> = ({ data }) => {
    const isAboveAverage = data.amount > data.average;
    const percentage = Math.abs(100 - (data.amount / data.average) * 100).toFixed(0);
  
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h5">{data.type}</Typography>
          </Stack>
          <Typography color={isAboveAverage ? 'error' : 'green'}>
            ${data.amount} / week {isAboveAverage ? `↑ ${percentage}% above average` : `↓ ${percentage}% below average`}
          </Typography>
        </CardContent>
      </Card>
    );
  };