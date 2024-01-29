const llamadaALaApi = async () => {
  try {
    const res = await fetch(
      "https://fakestoreapi.com/products/category/electronics/?limit=9"
    );
    const data = res.json();
    return data;
  } catch (err) {
    return null;
  }
};

console.log(llamadaALaApi());
