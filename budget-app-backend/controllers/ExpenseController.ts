import express, { Request, Response } from 'express';
import {ExpenseEntry} from '../services/models';
import { Router } from 'express';
const db = require('../db');

const router = Router();

router.get('/expenses', async (req:Request, res:Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM expenses;');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/expenses/:id', async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM expenses WHERE id = $1',[id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/expenses/average/:item', async (req:Request, res:Response) => {
    const { item } = req.params;
    try {
        const qr = await db.query('SELECT AVG(price) FROM expenses WHERE item = $1',[item]);
        const product = qr["rows"][0];
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/expenses/latest/:item', async (req:Request, res:Response) => {
    const { item } = req.params;
    try {
        const qr = await db.query('SELECT price FROM expenses WHERE item = $1 ORDER BY id DESC LIMIT 1',[item]);
        const product = qr["rows"][0];
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});



router.post('/expenses/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { date, item, price }: ExpenseEntry = req.body;

    try {
        const { rows } = await db.query(
            'INSERT INTO expenses (user_id, date, item, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, date, item, price]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.put('/expenses/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, date, item, price }: ExpenseEntry = req.body;

    try {
        const { rows } = await db.query(
            'UPDATE expenses SET user_id = $1, date = $2, item = $3, price = $4 WHERE id = $5 RETURNING *',
            [userId, date, item, price, id]
        );

        if (rows.length === 0) {
            res.status(404).send('Expense not found');
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/expenses/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { rowCount } = await db.query(
            'DELETE FROM expenses WHERE id = $1',
            [id]
        );

        if (rowCount === 0) {
            res.status(404).send('Expense not found');
        } else {
            res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;