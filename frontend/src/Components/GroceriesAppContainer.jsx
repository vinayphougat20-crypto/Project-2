import { useState, useEffect } from "react" ;
import axios from "axios";

import NavBar from "./NavBar";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer" ;
import ProductForm from "./ProductForm" ;


export default function  GroceriesAppContainer(){
  

  const [products,  setProducts] = useState([]); 
  const [formData, setFormData] =  useState({ 
    productName: "",
     brand: "",
    image: "",
     price: "",
    _id: "",
});

const [postResponse, setPostResponse] = useState(""); 
const [isEditing,  setIsEditing] =  useState(false); 

const [cart, setCart] = useState([]);  
const [productCounters, setProductCounters]=useState([]);

 const priceToNumber=(priceStr)=>Number(priceStr.replace("$", "")); 
 
  
  useEffect(()=>{
  handleProductsDB();
  },[postResponse]); 

  
const handleProductsDB = async() =>{
   try{

    const response =await axios.get("http://localhost:3000/products") ;
    setProducts(response.data);

      
    setProductCounters(
      response.data.map((p)=>({
        id: p._id,
        quantity: 0,
    
      })));
   }catch (error) {
   console.log(error.message) ;

  }};



  const handleOnChange =(e) =>{
   setFormData((prev)=> {
  return { ...prev, [e.target.name]: e.target.value } ;
});
};
  
  const handleResetForm=() =>  {
  setFormData({
    productName: "",
    brand: "",
     image: "",
    price: "",
      _id: "",

  });
  };  

  const handleOnSubmit = async(e)=>{

  e.preventDefault();

  try{  
    if (isEditing){ 
        
      handleOnUpdate(formData._id);
       handleResetForm();
      setIsEditing(false);
}
  else{ 
      await axios.post("http://localhost:3000/products",formData)
      .then((response)=> setPostResponse(response.data.message))
       .then(()=>handleResetForm()) ; 
}} catch(error){
     console.log(error.message);
}};
  
  const handleOnDelete= async(id) =>{
    try {
      const response = await axios.delete(`http://localhost:3000/products/${id}`);
      setPostResponse(response.data.message);
    }catch (error) {
      console.log(error.message);
    }
  };     
  const handleOnEdit = async (id) => {
    try {
      const productToEdit = await axios.get(`http://localhost:3000/products/${id}`);
        console.log(productToEdit);
      setFormData({
        productName: productToEdit.data.productName,
        brand: productToEdit.data.brand,
        image: productToEdit.data.image,
        price: productToEdit.data.price,
        _id: productToEdit.data._id,
      });

      setIsEditing(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        `http://localhost:3000/products/${id}`,
        formData
      );
      setPostResponse(result.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleProductDecrease = (id)=> {
    setProductCounters((prev) =>
     prev.map((p) =>
     p.id === id && p.quantity > 0 ? { ...p, quantity: p.quantity - 1 }: p ) );
 };

   const handleProductIncrease = (id) =>{
    setProductCounters((prev) =>
      prev.map((p) => p.id === id ? { ...p, quantity: p.quantity + 1 } : p  ));
  };
  
  const handleAddToCart = (id) => {
    const productInfo = products.find((p) => p._id === id); 
    const counter = productCounters.find((c) => c.id === id)?.quantity ?? 0;

    if (counter <= 0) {
      alert("Please select quantity greater than 0");
      return;
    }
    setCart((prev) => {
      const exists = prev.find((item) => item.productId === id);
      if (exists) {
        return prev.map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity + counter }
            : item
        );
      } else {
        return [
          ...prev,
          {
            productId: id,
            productName: productInfo.productName,
            brand: productInfo.brand,
            image: productInfo.image,
            priceNumber: priceToNumber(productInfo.price),
            quantity: counter,
          },
        ];
      }
    });

    setProductCounters((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: 0 } : p
      )
    );
  };

  const handleRemoveFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.productId !== id));

  const handleCartIncrease = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.productId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  const handleCartDecrease = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.productId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  const handleEmptyCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.priceNumber * item.quantity,
    0
  );

  return (
    
  <div id="root">

      {/* nav bar */}
<NavBar cartCount={cart.length} />
      
<div className="GroceriesApp-Container">

    <div className="LeftColumn">
         <ProductForm
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        isEditing={isEditing}/>

    {/* Shows message on add/edit/delete */}
  <p style={{ color: "green", marginTop: "7px" }}> {postResponse} </p> </div>
      
      {/* all products list */}
   <ProductsContainer
     data={products}
      productCounters={productCounters}
      handleProductIncrease={handleProductIncrease}
      handleProductDecrease={handleProductDecrease}
      handleAddToCart={handleAddToCart}

      startEditingProduct={handleOnEdit}
      handleDeleteProduct={handleOnDelete} />

      {/* shopping cart */}
        <CartContainer
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleCartIncrease={handleCartIncrease}
          handleCartDecrease={handleCartDecrease}
          handleEmptyCart={handleEmptyCart}
          cartTotal={cartTotal}/>
  
</div></div>
);










 
  

















}