const express = require ("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const {DB_URI} = process.env;
const cors = require("cors");
const Product = require("./models/Product");

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());

mongoose.connect(DB_URI).then(() => {
    server.listen(port, () => {
        console.log(`Database is connected\nServer is listening on ${port}`);
    });
}).catch((error) => console.log(error.message));

server.get("/", (request, response) => {
    response.send("Server is alive!");
});

server.get("/products", async (request, response) => {
    try {
        const products = await Product.find();
        response.send(products);
    } catch(error) {
        response.status(500).send({message: error.message});
    }
});

server.post("/products", async (request, response) => {
    const {productName, brand, image, price} = request.body;
    const newProduct = new Product({
        productName,
        brand,
        image,
        price
    });

    try {
        await newProduct.save();
        response.status(200).send({message: `Product added successfully on: ${new Date(Date.now())}`});
    } catch(error) {
        response.status(400).send({message: error.message});
    }
});

server.delete("/products/:id", async (request, response) => {
    const {id} = request.params;
    try{
        await Product.findByIdAndDelete(id);
        response.send({message: `Product deleted with id: ${id}`})
    } catch(error) {
        response.status(400).send({message: error.message});
    }
});


server.get("/products/:id", async (request, response) => {
    const {id} = request.params;
    try {
        const productToEdit = await Product.findById(id);
        response.send(productToEdit);
    } catch(error) {
        response.status(500).send({message: error.message});
    }
})

server.patch("/products/:id", async (request, response) => {
    const {id} = request.params;
    const {productName, brand, image, price} = request.body;
    try {
        await Product.findByIdAndUpdate(id, {
            productName,
            brand,
            image,
            price,
        });
        response.send({
            message: `Product has been updated with id ${id}`, 
            date: new Date(Date.now()),
        })
    } catch(error) {
        response.status(500).send({message: error.message});
    };
});
