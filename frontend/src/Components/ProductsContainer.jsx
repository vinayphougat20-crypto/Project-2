import ProductCard from "./ProductCard";

export default function ProductsContainer({
  data,
  productCounters,
  handleProductIncrease,
  handleProductDecrease,
  handleAddToCart,
  
  startEditingProduct,
  handleDeleteProduct,
}) {
  return (
    <div className="ProductsContainer">
      {/* Looping and createing a ProductCard for it */}
      {data.map((product) => (
        <ProductCard
          key={product._id}
          {...product}
          id={product._id}
          
          quantityCounter={productCounters.find((p) => p.id === product._id) ?? { id: product._id, quantity: 0 }}

          handleProductIncrease={handleProductIncrease}
          handleProductDecrease={handleProductDecrease}
          handleAddToCart={handleAddToCart}
          
          startEditingProduct={startEditingProduct}   
          handleDeleteProduct={handleDeleteProduct}  
         
        />
      ))}
    </div>
  );
}