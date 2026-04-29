import express from 'express';
import cors from 'cors';
import aeroplanoRoutes from './routes/aeroplanoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/aeroplanos', aeroplanoRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Aeroplano API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});