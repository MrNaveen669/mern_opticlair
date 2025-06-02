
// import React, { useEffect, useState } from "react";
// import "./ManageProduct.css"; 
// import {
//     PRODUCT_ALL_URL,
//     PRODUCT_ADD_URL,
//     PRODUCT_UPDATE_URL,
//     PRODUCT_DELETE_URL
//   } from "../config/api";
  

// function ManageProduct() {
//     const [products, setProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [newProduct, setNewProduct] = useState({
//         name: "",
//         description: "",
//         category: "",
//         subCategory: "",
//         gender: "",
//         price: "",
//         image: "",
//         images: "", 
//         sizes: "", 
//         resolution: "",
//         stock: "Available",
//         frameMaterial: "",
//         lensMaterial: "",
//         features: "",
//         discount: "0"
//     });

//     const categories = [
//         "Computer Glasses",
//         "Sunglasses",
//         "Eye Glasses",
//         "Contact Lenses",
//         "Reading Glasses"
//     ];

//     const genderOptions = ["Male", "Female", "Kids", "Unisex"];
    
//     const subCategoryOptions = {
//         "Computer Glasses": ["Blu 0 Computer Glasses", "Premium Range", "Gaming Glasses"],
//         "Sunglasses": ["Aviator", "Wayfarer", "Round", "Sports"],
//         "Eye Glasses": ["Full Frame", "Half Rim", "Rimless", "Premium"],
//         "Contact Lenses": ["Daily Wear", "Monthly", "Colored", "Toric"],
//         "Reading Glasses": ["Basic", "Premium", "Foldable"]
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(PRODUCT_ALL_URL);
//             const data = await response.json();
//             setProducts(data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     const addProduct = async () => {
//         try {
//             const formattedData = {
//                 ...newProduct,
//                 images: newProduct.images.split(",").map((url) => url.trim()), 
//                 sizes: newProduct.sizes.split(",").map((size) => size.trim()),
//                 features: newProduct.features.split(",").map((feature) => feature.trim())
//             };

//             const response = await fetch(PRODUCT_ADD_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formattedData)
//             });

//             if (response.ok) {
//                 fetchProducts();
//                 resetForm();
//             } else {
//                 alert("Failed to add product");
//             }
//         } catch (error) {
//             console.error("Error adding product:", error);
//         }
//     };

//     const updateProduct = async () => {
//         try {
//             // Make sure we format arrays correctly for the update
//             const formattedProduct = {
//                 ...editingProduct,
//                 images: Array.isArray(editingProduct.images) 
//                     ? editingProduct.images 
//                     : editingProduct.images.split(",").map(url => url.trim()),
//                 sizes: Array.isArray(editingProduct.sizes) 
//                     ? editingProduct.sizes 
//                     : editingProduct.sizes.split(",").map(size => size.trim()),
//                 features: Array.isArray(editingProduct.features) 
//                     ? editingProduct.features 
//                     : (editingProduct.features || "").split(",").map(feature => feature.trim())
//             };
//             const response = await fetch(PRODUCT_UPDATE_URL(editingProduct._id), {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formattedProduct)
//             });

//             if (response.ok) {
//                 fetchProducts();
//                 setEditingProduct(null);
//             } else {
//                 alert("Failed to update product");
//             }
//         } catch (error) {
//             console.error("Error updating product:", error);
//         }
//     };

//     const deleteProduct = async (id) => {
//         try {
//             await fetch(PRODUCT_DELETE_URL(id), { method: "DELETE" });
//             fetchProducts();
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     const resetForm = () => {
//         setNewProduct({
//             name: "",
//             description: "",
//             category: "",
//             subCategory: "",
//             gender: "",
//             price: "",
//             image: "",
//             images: "",
//             sizes: "",
//             resolution: "",
//             stock: "Available",
//             frameMaterial: "",
//             lensMaterial: "",
//             features: "",
//             discount: "0"
//         });
//     };

//     const handleCategoryChange = (e, isEditing) => {
//         const selectedCategory = e.target.value;
//         if (isEditing) {
//             setEditingProduct({
//                 ...editingProduct,
//                 category: selectedCategory,
//                 subCategory: "" // Reset subcategory when category changes
//             });
//         } else {
//             setNewProduct({
//                 ...newProduct,
//                 category: selectedCategory,
//                 subCategory: "" // Reset subcategory when category changes
//             });
//         }
//     };

//     // Helper function to get current category safely
//     const getCurrentCategory = () => {
//         return editingProduct ? editingProduct.category : newProduct.category;
//     };

//     // Helper function to get available subcategories safely
//     const getAvailableSubCategories = () => {
//         const currentCategory = getCurrentCategory();
//         return currentCategory && subCategoryOptions[currentCategory] ? subCategoryOptions[currentCategory] : [];
//     };

//     return (
//         <div className="container">
//             <h1 className="title">Manage Products</h1>

//             {/* Add / Edit Product Form */}
//             <div className="form-container">
//                 <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
//                 <div className="form-group">
//                     <input 
//                         type="text" 
//                         placeholder="Name" 
//                         value={editingProduct ? editingProduct.name : newProduct.name} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })} 
//                     />
                    
//                     <select 
//                         value={editingProduct ? editingProduct.category : newProduct.category} 
//                         onChange={(e) => handleCategoryChange(e, !!editingProduct)}
//                     >
//                         <option value="">Select Category</option>
//                         {categories.map((cat) => (
//                             <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="form-group">
//                     <select 
//                         value={editingProduct ? editingProduct.subCategory : newProduct.subCategory} 
//                         onChange={(e) => editingProduct 
//                             ? setEditingProduct({ ...editingProduct, subCategory: e.target.value }) 
//                             : setNewProduct({ ...newProduct, subCategory: e.target.value })}
//                         disabled={!getCurrentCategory()}
//                     >
//                         <option value="">Select Sub-Category</option>
//                         {getAvailableSubCategories().map((subCat) => (
//                             <option key={subCat} value={subCat}>{subCat}</option>
//                         ))}
//                     </select>

//                     <select 
//                         value={editingProduct ? editingProduct.gender : newProduct.gender} 
//                         onChange={(e) => editingProduct 
//                             ? setEditingProduct({ ...editingProduct, gender: e.target.value }) 
//                             : setNewProduct({ ...newProduct, gender: e.target.value })}
//                     >
//                         <option value="">Select Gender</option>
//                         {genderOptions.map((gender) => (
//                             <option key={gender} value={gender}>{gender}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <textarea 
//                     placeholder="Description" 
//                     value={editingProduct ? editingProduct.description : newProduct.description} 
//                     onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })}
//                 ></textarea>
                
//                 <div className="form-group">
//                     <input 
//                         type="number" 
//                         placeholder="Price" 
//                         value={editingProduct ? editingProduct.price : newProduct.price} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })} 
//                     />
//                     <input 
//                         type="number" 
//                         placeholder="Discount (%)" 
//                         value={editingProduct ? editingProduct.discount || "0" : newProduct.discount} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, discount: e.target.value }) : setNewProduct({ ...newProduct, discount: e.target.value })} 
//                     />
//                 </div>
                
//                 <input 
//                     type="text" 
//                     placeholder="Main Image URL" 
//                     value={editingProduct ? editingProduct.image : newProduct.image} 
//                     onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, image: e.target.value }) : setNewProduct({ ...newProduct, image: e.target.value })} 
//                 />
                
//                 <input 
//                     type="text" 
//                     placeholder="Additional Image URLs (comma-separated)" 
//                     value={editingProduct ? (Array.isArray(editingProduct.images) ? editingProduct.images.join(", ") : editingProduct.images) : newProduct.images} 
//                     onChange={(e) => editingProduct 
//                         ? setEditingProduct({ ...editingProduct, images: e.target.value }) 
//                         : setNewProduct({ ...newProduct, images: e.target.value })} 
//                 />
                
//                 <input 
//                     type="text" 
//                     placeholder="Available Sizes (comma-separated)" 
//                     value={editingProduct ? (Array.isArray(editingProduct.sizes) ? editingProduct.sizes.join(", ") : editingProduct.sizes) : newProduct.sizes} 
//                     onChange={(e) => editingProduct 
//                         ? setEditingProduct({ ...editingProduct, sizes: e.target.value }) 
//                         : setNewProduct({ ...newProduct, sizes: e.target.value })} 
//                 />
                
//                 <div className="form-group">
//                     <input 
//                         type="text" 
//                         placeholder="Frame Material" 
//                         value={editingProduct ? editingProduct.frameMaterial || "" : newProduct.frameMaterial} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, frameMaterial: e.target.value }) : setNewProduct({ ...newProduct, frameMaterial: e.target.value })} 
//                     />
//                     <input 
//                         type="text" 
//                         placeholder="Lens Material" 
//                         value={editingProduct ? editingProduct.lensMaterial || "" : newProduct.lensMaterial} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, lensMaterial: e.target.value }) : setNewProduct({ ...newProduct, lensMaterial: e.target.value })} 
//                     />
//                 </div>
                
//                 <input 
//                     type="text" 
//                     placeholder="Features (comma-separated)" 
//                     value={editingProduct ? (Array.isArray(editingProduct.features) ? editingProduct.features.join(", ") : editingProduct.features || "") : newProduct.features} 
//                     onChange={(e) => editingProduct 
//                         ? setEditingProduct({ ...editingProduct, features: e.target.value }) 
//                         : setNewProduct({ ...newProduct, features: e.target.value })} 
//                 />
                
//                 <select 
//                     value={editingProduct ? editingProduct.stock : newProduct.stock} 
//                     onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, stock: e.target.value }) : setNewProduct({ ...newProduct, stock: e.target.value })}
//                 >
//                     <option value="Available">Available</option>
//                     <option value="Out of Stock">Out of Stock</option>
//                 </select>

//                 {editingProduct ? (
//                     <div className="button-group">
//                         <button className="update-btn" onClick={updateProduct}>Update Product</button>
//                         <button className="cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
//                     </div>
//                 ) : (
//                     <button className="add-btn" onClick={addProduct}>Add Product</button>
//                 )}
//             </div>

//             {/* Product List */}
//             <h2 className="product-title">Existing Products</h2>
//             <div className="product-grid">
//                 {products.map((product) => (
//                     <div key={product._id} className="product-card">
//                         {product.image && <img src={product.image} alt={product.name} className="product-image" />}
//                         <h3>{product.name}</h3>
//                         <p className="product-description">{product.description}</p>
//                         <div className="product-details">
//                             <p><strong>Category:</strong> {product.category}</p>
//                             {product.subCategory && <p><strong>Sub-Category:</strong> {product.subCategory}</p>}
//                             {product.gender && <p><strong>Gender:</strong> {product.gender}</p>}
//                             <p><strong>Price: </strong>Rs. {product.price}</p>
//                             {product.discount && product.discount !== "0" && (
//                                 <p><strong>Discount:</strong> {product.discount}%</p>
//                             )}
//                             <p><strong>Stock:</strong> {product.stock}</p>
//                         </div>
//                         <div className="product-actions">
//                             <button className="edit-btn" onClick={() => setEditingProduct(product)}>Edit</button>
//                             <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ManageProduct;
// function ManageProduct() {
//     const [products, setProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [newProduct, setNewProduct] = useState({
//         name: "",
//         description: "",
//         category: "",
//         subCategory: "",
//         gender: "",
//         price: "",
//         image: "",
//         images: "", 
//         sizes: "", 
//         resolution: "",
//         stock: "Available",
//         frameMaterial: "",
//         lensMaterial: "",
//         features: "",
//         discount: "0",
//         // Contact Lens specific fields
//         duration: "",
//         brand: "",
//         lensPower: "",
//         color: "",
//         lensType: "",
//         lensSolution: "",
//         lensCase: ""
//     });

//     const categories = [
//         "Computer Glasses",
//         "Sunglasses",
//         "Eye Glasses",
//         "Contact Lenses",
//         "Reading Glasses"
//     ];

//     const genderOptions = ["Male", "Female", "Kids", "Unisex"];
    
//     const subCategoryOptions = {
//         "Computer Glasses": ["Blu 0 Computer Glasses", "Premium Range", "Gaming Glasses"],
//         "Sunglasses": ["Aviator", "Wayfarer", "Round", "Sports"],
//         "Eye Glasses": ["Full Frame", "Half Rim", "Rimless", "Premium"],
//         "Contact Lenses": ["Daily Wear", "Monthly", "Colored", "Toric"],
//         "Reading Glasses": ["Basic", "Premium", "Foldable"]
//     };

//     // Updated Contact Lens specific options with all parameters
//     const contactLensOptions = {
//         duration: [
//             "Daily", 
//             "Monthly Day and Night", 
//             "2-weekly", 
//             "Yearly"
//         ],
//         brand: [
//             "Bausch & Lomb", 
//             "Soflens", 
//             "Johnson & Johnson", 
//             "Iconnect", 
//             "Alcon", 
//             "Acuvue", 
//             "Optix", 
//             "Focus", 
//             "PureVision", 
//             "Optimex"
//         ],
//         lensPower: [
//             "[-] SPH Power (CYL <0.5)", 
//             "CYL Power (CYL >0.75)", 
//             "Toric Power"
//         ],
//         color: [
//             "Aquacolor", 
//             "Freshlook", 
//             "Clalen", 
//             "Color with no Power", 
//             "Color without CYL Power"
//         ],
//         lensType: [
//             "Color Lenses",
//             "Monthly Day and Night",
//             "Daily",
//             "2-weekly", 
//             "Yearly"
//         ],
//         lensSolution: [
//             "Aqualens Comfort",
//             "Bio True", 
//             "Renu Fresh",
//             "Opti-Free Replenish"
//         ],
//         lensCase: [
//             "Lens Case"
//         ]
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(PRODUCT_ALL_URL);
//             const data = await response.json();
//             setProducts(data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     const addProduct = async () => {
//         try {
//             const formattedData = {
//                 ...newProduct,
//                 images: newProduct.images.split(",").map((url) => url.trim()), 
//                 sizes: newProduct.sizes.split(",").map((size) => size.trim()),
//                 features: newProduct.features.split(",").map((feature) => feature.trim())
//             };

//             const response = await fetch(PRODUCT_ADD_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formattedData)
//             });

//             if (response.ok) {
//                 fetchProducts();
//                 resetForm();
//             } else {
//                 alert("Failed to add product");
//             }
//         } catch (error) {
//             console.error("Error adding product:", error);
//         }
//     };

//     const updateProduct = async () => {
//         try {
//             // Make sure we format arrays correctly for the update
//             const formattedProduct = {
//                 ...editingProduct,
//                 images: Array.isArray(editingProduct.images) 
//                     ? editingProduct.images 
//                     : editingProduct.images.split(",").map(url => url.trim()),
//                 sizes: Array.isArray(editingProduct.sizes) 
//                     ? editingProduct.sizes 
//                     : editingProduct.sizes.split(",").map(size => size.trim()),
//                 features: Array.isArray(editingProduct.features) 
//                     ? editingProduct.features 
//                     : (editingProduct.features || "").split(",").map(feature => feature.trim())
//             };
//             const response = await fetch(PRODUCT_UPDATE_URL(editingProduct._id), {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formattedProduct)
//             });

//             if (response.ok) {
//                 fetchProducts();
//                 setEditingProduct(null);
//             } else {
//                 alert("Failed to update product");
//             }
//         } catch (error) {
//             console.error("Error updating product:", error);
//         }
//     };

//     const deleteProduct = async (id) => {
//         try {
//             await fetch(PRODUCT_DELETE_URL(id), { method: "DELETE" });
//             fetchProducts();
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     const resetForm = () => {
//         setNewProduct({
//             name: "",
//             description: "",
//             category: "",
//             subCategory: "",
//             gender: "",
//             price: "",
//             image: "",
//             images: "",
//             sizes: "",
//             resolution: "",
//             stock: "Available",
//             frameMaterial: "",
//             lensMaterial: "",
//             features: "",
//             discount: "0",
//             // Contact Lens specific fields
//             duration: "",
//             brand: "",
//             lensPower: "",
//             color: "",
//             lensType: "",
//             lensSolution: "",
//             lensCase: ""
//         });
//     };

//     const handleCategoryChange = (e, isEditing) => {
//         const selectedCategory = e.target.value;
//         if (isEditing) {
//             setEditingProduct({
//                 ...editingProduct,
//                 category: selectedCategory,
//                 subCategory: "", // Reset subcategory when category changes
//                 // Reset contact lens specific fields
//                 duration: "",
//                 brand: "",
//                 lensPower: "",
//                 color: "",
//                 lensType: "",
//                 lensSolution: "",
//                 lensCase: ""
//             });
//         } else {
//             setNewProduct({
//                 ...newProduct,
//                 category: selectedCategory,
//                 subCategory: "", // Reset subcategory when category changes
//                 // Reset contact lens specific fields
//                 duration: "",
//                 brand: "",
//                 lensPower: "",
//                 color: "",
//                 lensType: "",
//                 lensSolution: "",
//                 lensCase: ""
//             });
//         }
//     };

//     // Helper function to get current category safely
//     const getCurrentCategory = () => {
//         return editingProduct ? editingProduct.category : newProduct.category;
//     };

//     // Helper function to get available subcategories safely
//     const getAvailableSubCategories = () => {
//         const currentCategory = getCurrentCategory();
//         return currentCategory && subCategoryOptions[currentCategory] ? subCategoryOptions[currentCategory] : [];
//     };

//     // Check if current category is Contact Lenses
//     const isContactLens = () => {
//         return getCurrentCategory() === "Contact Lenses";
//     };

//     return (
//         <div className="container">
//             <h1 className="title">Manage Products</h1>

//             {/* Add / Edit Product Form */}
//             <div className="form-container">
//                 <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
//                 <div className="form-group">
//                     <input 
//                         type="text" 
//                         placeholder="Name" 
//                         value={editingProduct ? editingProduct.name : newProduct.name} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })} 
//                     />
                    
//                     <select 
//                         value={editingProduct ? editingProduct.category : newProduct.category} 
//                         onChange={(e) => handleCategoryChange(e, !!editingProduct)}
//                     >
//                         <option value="">Select Category</option>
//                         {categories.map((cat) => (
//                             <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Conditional rendering based on category */}
//                 {isContactLens() ? (
//                     // Contact Lens specific fields
//                     <>
//                         <div className="form-group">
//                             <select 
//                                 value={editingProduct ? editingProduct.duration || "" : newProduct.duration} 
//                                 onChange={(e) => editingProduct 
//                                     ? setEditingProduct({ ...editingProduct, duration: e.target.value }) 
//                                     : setNewProduct({ ...newProduct, duration: e.target.value })}
//                             >
//                                 <option value="">Select Duration</option>
//                                 {contactLensOptions.duration.map((duration) => (
//                                     <option key={duration} value={duration}>{duration}</option>
//                                 ))}
//                             </select>

//                             <select 
//                                 value={editingProduct ? editingProduct.brand || "" : newProduct.brand} 
//                                 onChange={(e) => editingProduct 
//                                     ? setEditingProduct({ ...editingProduct, brand: e.target.value }) 
//                                     : setNewProduct({ ...newProduct, brand: e.target.value })}
//                             >
//                                 <option value="">Select Brand</option>
//                                 {contactLensOptions.brand.map((brand) => (
//                                     <option key={brand} value={brand}>{brand}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <select 
//                                 value={editingProduct ? editingProduct.lensPower || "" : newProduct.lensPower} 
//                                 onChange={(e) => editingProduct 
//                                     ? setEditingProduct({ ...editingProduct, lensPower: e.target.value }) 
//                                     : setNewProduct({ ...newProduct, lensPower: e.target.value })}
//                             >
//                                 <option value="">Select Lens Power</option>
//                                 {contactLensOptions.lensPower.map((power) => (
//                                     <option key={power} value={power}>{power}</option>
//                                 ))}
//                             </select>

//                             <select 
//                                 value={editingProduct ? editingProduct.color || "" : newProduct.color} 
//                                 onChange={(e) => editingProduct 
//                                     ? setEditingProduct({ ...editingProduct, color: e.target.value }) 
//                                     : setNewProduct({ ...newProduct, color: e.target.value })}
//                             >
//                                 <option value="">Select Color</option>
//                                 {contactLensOptions.color.map((color) => (
//                                     <option key={color} value={color}>{color}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* New Contact Lens Fields */}
//                         <div className="form-group">
//                             <select 
//                                 value={editingProduct ? editingProduct.lensType || "" : newProduct.lensType} 
//                                 onChange={(e) => editingProduct 
//                                     ? setEditingProduct({ ...editingProduct, lensType: e.target.value }) 
//                                     : setNewProduct({ ...newProduct, lensType: e.target.value })}
//                             >
//                                 <option value="">Select Lens Type</option>
//                                 {contactLensOptions.lensType.map((type) => (
//                                     <option key={type} value={type}>{type}</option>
//                                 ))}
//                             </select>

//                             <select 
//                                 value={editingProduct ? editingProduct.lensSolution || "" : newProduct.lensSolution} 
//                                 onChange={(e) => editingProduct 
//                                     ? setEditingProduct({ ...editingProduct, lensSolution: e.target.value }) 
//                                     : setNewProduct({ ...newProduct, lensSolution: e.target.value })}
//                             >
//                                 <option value="">Select Lens Solution</option>
//                                 {contactLensOptions.lensSolution.map((solution) => (
//                                     <option key={solution} value={solution}>{solution}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <select 
//                                 value={editingProduct ? editingProduct.lensCase || "" : newProduct.lensCase} 
//                                 onChange={(e) => editingProduct 
//                                     ? setEditingProduct({ ...editingProduct, lensCase: e.target.value }) 
//                                     : setNewProduct({ ...newProduct, lensCase: e.target.value })}
//                             >
//                                 <option value="">Select Lens Case</option>
//                                 {contactLensOptions.lensCase.map((caseOption) => (
//                                     <option key={caseOption} value={caseOption}>{caseOption}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </>
//                 ) : (
//                     // Regular fields for other categories
//                     <div className="form-group">
//                         <select 
//                             value={editingProduct ? editingProduct.subCategory : newProduct.subCategory} 
//                             onChange={(e) => editingProduct 
//                                 ? setEditingProduct({ ...editingProduct, subCategory: e.target.value }) 
//                                 : setNewProduct({ ...newProduct, subCategory: e.target.value })}
//                             disabled={!getCurrentCategory()}
//                         >
//                             <option value="">Select Sub-Category</option>
//                             {getAvailableSubCategories().map((subCat) => (
//                                 <option key={subCat} value={subCat}>{subCat}</option>
//                             ))}
//                         </select>

//                         <select 
//                             value={editingProduct ? editingProduct.gender : newProduct.gender} 
//                             onChange={(e) => editingProduct 
//                                 ? setEditingProduct({ ...editingProduct, gender: e.target.value }) 
//                                 : setNewProduct({ ...newProduct, gender: e.target.value })}
//                         >
//                             <option value="">Select Gender</option>
//                             {genderOptions.map((gender) => (
//                                 <option key={gender} value={gender}>{gender}</option>
//                             ))}
//                         </select>
//                     </div>
//                 )}

//                 <textarea 
//                     placeholder="Description" 
//                     value={editingProduct ? editingProduct.description : newProduct.description} 
//                     onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })}
//                 ></textarea>
                
//                 <div className="form-group">
//                     <input 
//                         type="number" 
//                         placeholder="Price" 
//                         value={editingProduct ? editingProduct.price : newProduct.price} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })} 
//                     />
//                     <input 
//                         type="number" 
//                         placeholder="Discount (%)" 
//                         value={editingProduct ? editingProduct.discount || "0" : newProduct.discount} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, discount: e.target.value }) : setNewProduct({ ...newProduct, discount: e.target.value })} 
//                     />
//                 </div>
                
//                 <input 
//                     type="text" 
//                     placeholder="Main Image URL" 
//                     value={editingProduct ? editingProduct.image : newProduct.image} 
//                     onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, image: e.target.value }) : setNewProduct({ ...newProduct, image: e.target.value })} 
//                 />
                
//                 <input 
//                     type="text" 
//                     placeholder="Additional Image URLs (comma-separated)" 
//                     value={editingProduct ? (Array.isArray(editingProduct.images) ? editingProduct.images.join(", ") : editingProduct.images) : newProduct.images} 
//                     onChange={(e) => editingProduct 
//                         ? setEditingProduct({ ...editingProduct, images: e.target.value }) 
//                         : setNewProduct({ ...newProduct, images: e.target.value })} 
//                 />
                
//                 <input 
//                     type="text" 
//                     placeholder="Available Sizes (comma-separated)" 
//                     value={editingProduct ? (Array.isArray(editingProduct.sizes) ? editingProduct.sizes.join(", ") : editingProduct.sizes) : newProduct.sizes} 
//                     onChange={(e) => editingProduct 
//                         ? setEditingProduct({ ...editingProduct, sizes: e.target.value }) 
//                         : setNewProduct({ ...newProduct, sizes: e.target.value })} 
//                 />
                
//                 <div className="form-group">
//                     <input 
//                         type="text" 
//                         placeholder="Frame Material" 
//                         value={editingProduct ? editingProduct.frameMaterial || "" : newProduct.frameMaterial} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, frameMaterial: e.target.value }) : setNewProduct({ ...newProduct, frameMaterial: e.target.value })} 
//                     />
//                     <input 
//                         type="text" 
//                         placeholder="Lens Material" 
//                         value={editingProduct ? editingProduct.lensMaterial || "" : newProduct.lensMaterial} 
//                         onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, lensMaterial: e.target.value }) : setNewProduct({ ...newProduct, lensMaterial: e.target.value })} 
//                     />
//                 </div>
                
//                 <input 
//                     type="text" 
//                     placeholder="Features (comma-separated)" 
//                     value={editingProduct ? (Array.isArray(editingProduct.features) ? editingProduct.features.join(", ") : editingProduct.features || "") : newProduct.features} 
//                     onChange={(e) => editingProduct 
//                         ? setEditingProduct({ ...editingProduct, features: e.target.value }) 
//                         : setNewProduct({ ...newProduct, features: e.target.value })} 
//                 />
                
//                 <select 
//                     value={editingProduct ? editingProduct.stock : newProduct.stock} 
//                     onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, stock: e.target.value }) : setNewProduct({ ...newProduct, stock: e.target.value })}
//                 >
//                     <option value="Available">Available</option>
//                     <option value="Out of Stock">Out of Stock</option>
//                 </select>

//                 {editingProduct ? (
//                     <div className="button-group">
//                         <button className="update-btn" onClick={updateProduct}>Update Product</button>
//                         <button className="cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
//                     </div>
//                 ) : (
//                     <button className="add-btn" onClick={addProduct}>Add Product</button>
//                 )}
//             </div>

//             {/* Product List */}
//             <h2 className="product-title">Existing Products</h2>
//             <div className="product-grid">
//                 {products.map((product) => (
//                     <div key={product._id} className="product-card">
//                         {product.image && <img src={product.image} alt={product.name} className="product-image" />}
//                         <h3>{product.name}</h3>
//                         <p className="product-description">{product.description}</p>
//                         <div className="product-details">
//                             <p><strong>Category:</strong> {product.category}</p>
                            
//                             {/* Conditional display based on category */}
//                             {product.category === "Contact Lenses" ? (
//                                 <>
//                                     {product.duration && <p><strong>Duration:</strong> {product.duration}</p>}
//                                     {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
//                                     {product.lensPower && <p><strong>Lens Power:</strong> {product.lensPower}</p>}
//                                     {product.color && <p><strong>Color:</strong> {product.color}</p>}
//                                     {product.lensType && <p><strong>Lens Type:</strong> {product.lensType}</p>}
//                                     {product.lensSolution && <p><strong>Lens Solution:</strong> {product.lensSolution}</p>}
//                                     {product.lensCase && <p><strong>Lens Case:</strong> {product.lensCase}</p>}
//                                 </>
//                             ) : (
//                                 <>
//                                     {product.subCategory && <p><strong>Sub-Category:</strong> {product.subCategory}</p>}
//                                     {product.gender && <p><strong>Gender:</strong> {product.gender}</p>}
//                                 </>
//                             )}
                            
//                             <p><strong>Price: </strong>Rs. {product.price}</p>
//                             {product.discount && product.discount !== "0" && (
//                                 <p><strong>Discount:</strong> {product.discount}%</p>
//                             )}
//                             <p><strong>Stock:</strong> {product.stock}</p>
//                         </div>
//                         <div className="product-actions">
//                             <button className="edit-btn" onClick={() => setEditingProduct(product)}>Edit</button>
//                             <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ManageProduct;

import React, { useEffect, useState } from "react";
import "./ManageProduct.css"; 
import {
    PRODUCT_ALL_URL,
    PRODUCT_ADD_URL,
    PRODUCT_UPDATE_URL,
    PRODUCT_DELETE_URL
  } from "../config/api";
  

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        category: "",
        subCategory: "",
        gender: "",
        price: "",
        image: "",
        images: "", 
        sizes: "", 
        resolution: "",
        stock: "Available",
        frameMaterial: "",
        lensMaterial: "",
        features: "",
        discount: "0",
        // Contact Lens specific fields
        brand: "",
        power: "",
        color: ""
    });

    const categories = [
        "Computer Glasses",
        "Sunglasses",
        "Eye Glasses",
        "Contact Lenses",
        "Reading Glasses"
    ];

    const genderOptions = ["Male", "Female", "Kids", "Unisex"];
    
    const subCategoryOptions = {
        "Computer Glasses": ["Blu 0 Computer Glasses", "Premium Range", "Gaming Glasses"],
        "Sunglasses": ["Aviator", "Wayfarer", "Round", "Sports"],
        "Eye Glasses": ["Full Frame", "Half Rim", "Rimless", "Premium"],
        "Contact Lenses": ["Aqualens", "Bausch & Lomb", "Johnson & Johnson", "CooperVision", "Alcon"],
        "Reading Glasses": ["Basic", "Premium", "Foldable"]
    };

    // Contact Lens specific options
    const contactLensPowerOptions = [
        "[-] SPH Power (CYL <0.5)",
        "[+] SPH Power (CYL <0.5)",
        "0.00 (Zero Power)",
        "-1.00 to -3.00",
        "-3.25 to -6.00",
        "+1.00 to +3.00",
        "+3.25 to +6.00"
    ];

    const contactLensColorOptions = [
        "Clear/Transparent",
        "Aquacolor Premium",
        "Aquacolor",
        "Honey",
        "Hazel",
        "Green",
        "Blue",
        "Gray",
        "Brown"
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(PRODUCT_ALL_URL);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addProduct = async () => {
        try {
            const formattedData = {
                ...newProduct,
                images: newProduct.images.split(",").map((url) => url.trim()), 
                sizes: newProduct.sizes.split(",").map((size) => size.trim()),
                features: newProduct.features.split(",").map((feature) => feature.trim())
            };

            const response = await fetch(PRODUCT_ADD_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData)
            });

            if (response.ok) {
                fetchProducts();
                resetForm();
            } else {
                alert("Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async () => {
        try {
            const formattedProduct = {
                ...editingProduct,
                images: Array.isArray(editingProduct.images) 
                    ? editingProduct.images 
                    : editingProduct.images.split(",").map(url => url.trim()),
                sizes: Array.isArray(editingProduct.sizes) 
                    ? editingProduct.sizes 
                    : editingProduct.sizes.split(",").map(size => size.trim()),
                features: Array.isArray(editingProduct.features) 
                    ? editingProduct.features 
                    : (editingProduct.features || "").split(",").map(feature => feature.trim())
            };
            const response = await fetch(PRODUCT_UPDATE_URL(editingProduct._id), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedProduct)
            });

            if (response.ok) {
                fetchProducts();
                setEditingProduct(null);
            } else {
                alert("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await fetch(PRODUCT_DELETE_URL(id), { method: "DELETE" });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const resetForm = () => {
        setNewProduct({
            name: "",
            description: "",
            category: "",
            subCategory: "",
            gender: "",
            price: "",
            image: "",
            images: "",
            sizes: "",
            resolution: "",
            stock: "Available",
            frameMaterial: "",
            lensMaterial: "",
            features: "",
            discount: "0",
            brand: "",
            power: "",
            color: ""
        });
    };

    const handleCategoryChange = (e, isEditing) => {
        const selectedCategory = e.target.value;
        if (isEditing) {
            setEditingProduct({
                ...editingProduct,
                category: selectedCategory,
                subCategory: "",
                brand: "",
                power: "",
                color: "",
                gender: ""
            });
        } else {
            setNewProduct({
                ...newProduct,
                category: selectedCategory,
                subCategory: "",
                brand: "",
                power: "",
                color: "",
                gender: ""
            });
        }
    };

    // Helper function to get current category safely
    const getCurrentCategory = () => {
        return editingProduct ? editingProduct.category : newProduct.category;
    };

    // Helper function to get available subcategories safely
    const getAvailableSubCategories = () => {
        const currentCategory = getCurrentCategory();
        return currentCategory && subCategoryOptions[currentCategory] ? subCategoryOptions[currentCategory] : [];
    };

    // Check if current category is Contact Lenses
    const isContactLensCategory = () => {
        return getCurrentCategory() === "Contact Lenses";
    };

    // Helper function to get field label for subcategory
    const getSubCategoryLabel = () => {
        return isContactLensCategory() ? "Brand" : "Sub-Category";
    };

    // Helper function to get field label for gender/power
    const getGenderPowerLabel = () => {
        return isContactLensCategory() ? "Power" : "Gender";
    };

    // Helper function to get options for gender/power field
    const getGenderPowerOptions = () => {
        return isContactLensCategory() ? contactLensPowerOptions : genderOptions;
    };

    return (
        <div className="container">
            <h1 className="title">Manage Products</h1>

            {/* Add / Edit Product Form */}
            <div className="form-container">
                <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={editingProduct ? editingProduct.name : newProduct.name} 
                        onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })} 
                    />
                    
                    <select 
                        value={editingProduct ? editingProduct.category : newProduct.category} 
                        onChange={(e) => handleCategoryChange(e, !!editingProduct)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <select 
                        value={editingProduct ? (editingProduct.subCategory || editingProduct.brand || "") : (newProduct.subCategory || newProduct.brand || "")} 
                        onChange={(e) => {
                            if (isContactLensCategory()) {
                                editingProduct 
                                    ? setEditingProduct({ ...editingProduct, brand: e.target.value, subCategory: e.target.value }) 
                                    : setNewProduct({ ...newProduct, brand: e.target.value, subCategory: e.target.value });
                            } else {
                                editingProduct 
                                    ? setEditingProduct({ ...editingProduct, subCategory: e.target.value }) 
                                    : setNewProduct({ ...newProduct, subCategory: e.target.value });
                            }
                        }}
                        disabled={!getCurrentCategory()}
                    >
                        <option value="">Select {getSubCategoryLabel()}</option>
                        {getAvailableSubCategories().map((subCat) => (
                            <option key={subCat} value={subCat}>{subCat}</option>
                        ))}
                    </select>

                    <select 
                        value={editingProduct ? (editingProduct.gender || editingProduct.power || "") : (newProduct.gender || newProduct.power || "")} 
                        onChange={(e) => {
                            if (isContactLensCategory()) {
                                editingProduct 
                                    ? setEditingProduct({ ...editingProduct, power: e.target.value }) 
                                    : setNewProduct({ ...newProduct, power: e.target.value });
                            } else {
                                editingProduct 
                                    ? setEditingProduct({ ...editingProduct, gender: e.target.value }) 
                                    : setNewProduct({ ...newProduct, gender: e.target.value });
                            }
                        }}
                    >
                        <option value="">Select {getGenderPowerLabel()}</option>
                        {getGenderPowerOptions().map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Color field - only show for Contact Lenses */}
                {isContactLensCategory() && (
                    <div className="form-group">
                        <select 
                            value={editingProduct ? editingProduct.color || "" : newProduct.color} 
                            onChange={(e) => editingProduct 
                                ? setEditingProduct({ ...editingProduct, color: e.target.value }) 
                                : setNewProduct({ ...newProduct, color: e.target.value })}
                        >
                            <option value="">Select Color</option>
                            {contactLensColorOptions.map((color) => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                )}

                <textarea 
                    placeholder="Description" 
                    value={editingProduct ? editingProduct.description : newProduct.description} 
                    onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })}
                ></textarea>
                
                <div className="form-group">
                    <input 
                        type="number" 
                        placeholder="Price" 
                        value={editingProduct ? editingProduct.price : newProduct.price} 
                        onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })} 
                    />
                    <input 
                        type="number" 
                        placeholder="Discount (%)" 
                        value={editingProduct ? editingProduct.discount || "0" : newProduct.discount} 
                        onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, discount: e.target.value }) : setNewProduct({ ...newProduct, discount: e.target.value })} 
                    />
                </div>
                
                <input 
                    type="text" 
                    placeholder="Main Image URL" 
                    value={editingProduct ? editingProduct.image : newProduct.image} 
                    onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, image: e.target.value }) : setNewProduct({ ...newProduct, image: e.target.value })} 
                />
                
                <input 
                    type="text" 
                    placeholder="Additional Image URLs (comma-separated)" 
                    value={editingProduct ? (Array.isArray(editingProduct.images) ? editingProduct.images.join(", ") : editingProduct.images) : newProduct.images} 
                    onChange={(e) => editingProduct 
                        ? setEditingProduct({ ...editingProduct, images: e.target.value }) 
                        : setNewProduct({ ...newProduct, images: e.target.value })} 
                />
                
                <input 
                    type="text" 
                    placeholder={isContactLensCategory() ? "Available Powers/Variants (comma-separated)" : "Available Sizes (comma-separated)"} 
                    value={editingProduct ? (Array.isArray(editingProduct.sizes) ? editingProduct.sizes.join(", ") : editingProduct.sizes) : newProduct.sizes} 
                    onChange={(e) => editingProduct 
                        ? setEditingProduct({ ...editingProduct, sizes: e.target.value }) 
                        : setNewProduct({ ...newProduct, sizes: e.target.value })} 
                />
                
                {/* Frame and Lens Material - only show for non-Contact Lens categories */}
                {!isContactLensCategory() && (
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Frame Material" 
                            value={editingProduct ? editingProduct.frameMaterial || "" : newProduct.frameMaterial} 
                            onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, frameMaterial: e.target.value }) : setNewProduct({ ...newProduct, frameMaterial: e.target.value })} 
                        />
                        <input 
                            type="text" 
                            placeholder="Lens Material" 
                            value={editingProduct ? editingProduct.lensMaterial || "" : newProduct.lensMaterial} 
                            onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, lensMaterial: e.target.value }) : setNewProduct({ ...newProduct, lensMaterial: e.target.value })} 
                        />
                    </div>
                )}
                
                <input 
                    type="text" 
                    placeholder={isContactLensCategory() ? "Features/Benefits (comma-separated)" : "Features (comma-separated)"} 
                    value={editingProduct ? (Array.isArray(editingProduct.features) ? editingProduct.features.join(", ") : editingProduct.features || "") : newProduct.features} 
                    onChange={(e) => editingProduct 
                        ? setEditingProduct({ ...editingProduct, features: e.target.value }) 
                        : setNewProduct({ ...newProduct, features: e.target.value })} 
                />
                
                <select 
                    value={editingProduct ? editingProduct.stock : newProduct.stock} 
                    onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, stock: e.target.value }) : setNewProduct({ ...newProduct, stock: e.target.value })}
                >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>

                {editingProduct ? (
                    <div className="button-group">
                        <button className="update-btn" onClick={updateProduct}>Update Product</button>
                        <button className="cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </div>
                ) : (
                    <button className="add-btn" onClick={addProduct}>Add Product</button>
                )}
            </div>

            {/* Product List */}
            <h2 className="product-title">Existing Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        {product.image && <img src={product.image} alt={product.name} className="product-image" />}
                        <h3>{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <div className="product-details">
                            <p><strong>Category:</strong> {product.category}</p>
                            {product.subCategory && <p><strong>{product.category === "Contact Lenses" ? "Brand" : "Sub-Category"}:</strong> {product.subCategory}</p>}
                            {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
                            {product.gender && <p><strong>Gender:</strong> {product.gender}</p>}
                            {product.power && <p><strong>Power:</strong> {product.power}</p>}
                            {product.color && <p><strong>Color:</strong> {product.color}</p>}
                            <p><strong>Price: </strong>Rs. {product.price}</p>
                            {product.discount && product.discount !== "0" && (
                                <p><strong>Discount:</strong> {product.discount}%</p>
                            )}
                            <p><strong>Stock:</strong> {product.stock}</p>
                            {product.frameMaterial && <p><strong>Frame Material:</strong> {product.frameMaterial}</p>}
                            {product.lensMaterial && <p><strong>Lens Material:</strong> {product.lensMaterial}</p>}
                        </div>
                        <div className="product-actions">
                            <button className="edit-btn" onClick={() => setEditingProduct(product)}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageProduct;