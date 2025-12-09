import CartCard from "./CartCard";

// display all the products in the cart
export default function CartContainer({ 
     cart, handleRemoveFromCart, handleCartIncrease, handleCartDecrease, handleEmptyCart, cartTotal,}){
  
  
      return (
    <div className="CartContainer">

      {/* empty cart message */}
      {cart.length === 0 ? (
        <div>
          <h3>Cart items: 0</h3>
          <p> No items in cart</p>
        </div>
      ) : (
        <>

         {/* total number of products */}
  <h3>Cart items: {cart.length}</h3>

{/* loops through each cart item and show it using CartCard */}
          {cart.map((item) => (
            <CartCard
              key={item.productId}
              productId={item.productId}
              productName={item.productName}
              brand={item.brand}
              image={item.image}
              priceNumber={item.priceNumber}
              quantity={item.quantity}
              handleRemoveFromCart={handleRemoveFromCart}
              handleCartIncrease={handleCartIncrease}
              handleCartDecrease={handleCartDecrease}
            />
          ))}

          <div className="CartCard">
            {/* Buttom remove all items */}
            <button className="RemoveButton" onClick={handleEmptyCart}>
              Empty Cart</button>

          {/* checkout button */}
            <button id="BuyButton">  Checkout: ${cartTotal.toFixed(2)}</button> </div>
  </>
  )}</div>
);
















}