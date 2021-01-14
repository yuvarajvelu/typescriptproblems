/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.get('/hello',(_req,res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi',(req,res) => {
    let details = {};
    try {
        const { height, weight } = req.query;
        const result = calculateBmi(Number(height), Number(weight));
        details = {
            height: Number(height),
            weight: Number(weight),
            result
        };
    } catch(e) {
        details = {
            error: "malformatted parameters"
        };
    }
    res.send(details);
});

app.post('/exercises',(req,res) => {
    let result;
    try {
        result = exerciseCalculator(req.body.daily_exercises, req.body.target);
    } catch(e) {
        result = {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            error: e.message
        };
    }
    res.send(result);
});

const PORT = 3001;

app.listen(PORT,() => {
    console.log('Server listening at port ',PORT);
});