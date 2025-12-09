import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  id,
  productName,
  brand,
  image,
  price,
  quantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleEditProduct,
  handleDeleteProduct,
}) {
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt={productName} />
      <h4>{brand}</h4>

      <QuantityCounter
        quantity={quantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="products"
      />

      <h3>{price}</h3>

      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      <button
        onClick={() =>
          handleEditProduct({ _id: id, productName, brand, image, price })
        }
      >
        Edit
      </button>
      <button onClick={() => handleDeleteProduct(id)}>Delete</button>
    </div>
  );
}