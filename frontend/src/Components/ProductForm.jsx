export default function ProductForm({
  formData,
  handleOnChange,
  handleOnSubmit,
  isEditing,
}){

  
return(
      <div className="product-form">
      <form onSubmit={handleOnSubmit}>
         {/* product name input */}
          <label htmlFor="productName">Product Name:</label>
           <input
          type="text"
          name="productName"
          id="productName"
          value= {formData.productName} 
          onChange={handleOnChange}
          placeholder="Enter Product Name"
          required
        />
     <br />
          
           {/* brand input field */}
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          name="brand"
          id="brand"
          value={formData.brand}
          onChange={handleOnChange}
          placeholder="Enter Brand"
          required
        />
  <br/>

      {/* image URL input */}
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
        name="image"
          id="image"
          value={formData.image}
        onChange= {handleOnChange}
        placeholder= "Enter Image URL" 
        />
        <br/>

        {/* price input */}
        <label htmlFor="price">Price:</label>
         <input
          type="text"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleOnChange}
          placeholder ="Enter Price"
          required
        />
        <br/>

{/* adding form button */}
    <button>{isEditing ? "Update Product" : "Add Product"}</button> 
</form>
 </div>
);




















}