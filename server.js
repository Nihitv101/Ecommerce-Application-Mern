import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';



// importing routes:
import authRoutes from './routes/auth.route.js';
import categoryRoutes from './routes/category.route.js';
import productRoutes from './routes/product.route.js';



dotenv.config();

connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
app.use(express.static(path.join(__dirname, './client/build')))

import {fileURLToPath} from 'url'



app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})



app.get('/', (req, res)=>{
    res.send({
        message:"okay"
    })
})



app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})

