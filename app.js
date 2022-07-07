require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products')
//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API </h1><a href="/api/v1/products">Iris</a>')
});

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const startServe = async () => {
    try {
        await connectDB(process.env.DB_CONNECTION);
        app.listen(port, console.log(`Server is running in port ${port}`));
    }
    catch (err) {
        console.log(err)
    }
}

startServe()