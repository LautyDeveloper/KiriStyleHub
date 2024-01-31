const JOYAS = "https://fakestoreapi.com/products/category/electronics";
const HOMBRES = "https://fakestoreapi.com/products/category/men's%20clothing";
const MUJERES = "https://fakestoreapi.com/products/category/women's%20clothing";

const fetchProducts = async (searchTerm) => {
  try {
    const res = await fetch(searchTerm);
    const data = res.json();
    return data;
  } catch (err) {
    return null;
  }
};
