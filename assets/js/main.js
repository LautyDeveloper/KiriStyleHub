const productsContainer = document.querySelector(".productos");
const filterContainer = document.querySelector(".filtros");
const filters = document.querySelectorAll(".btn");
const seeMoreBtn = document.querySelector(".see");

const DEFAULT = "https://fakestoreapi.com/products";
const JOYAS = "https://fakestoreapi.com/products/category/jewelery";
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

const appState = {
  currentFilter: DEFAULT,
};

const showProducts = async () => {
  productsContainer.innerHTML = renderLoader();
  const products = await fetchProducts(appState.currentFilter);
  renderProducts(products);
};

const renderLoader = () => {
  return `
    <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    `;
};

const renderProducts = (products) => {
  productsContainer.innerHTML = products
    .map((movie) => createCardTemplate(movie))
    .join("");
};

const createCardTemplate = (product) => {
  const { title, price, image } = product;
  return `
  <div class="card">
          <div class="container-image">
            <img src="${image}" alt="" class="image-circle">
          </div>
          <div class="content">
            <div class="detail">
              <span>${title}</span>
              <p>$${price}</p>
              <button>COMPRAR</button>
            </div>
            <div class="product-image">
              <div class="box-image">
                <img src="${image}" alt="" class="image-product">
              </div>
            </div>
          </div>
        </div>
  `;
};

const changeSearchParameter = (e) => {
  if (!isActiveBtn(e.target)) {
    return;
  }
  const selectedParameter = e.target.dataset.filter;
  appState.currentFilter = parameterSelector(selectedParameter);
  setActiveBtn(selectedParameter);
  showProducts();
  seeMoreBtn.classList.add("hidden");
};

const isActiveBtn = (btn) => {
  return (
    btn.classList.contains("filtro") &&
    !btn.classList.contains("filtro--active")
  );
};

const parameterSelector = (filter) => {
  return filter === "JOYAS" ? JOYAS : filter === "HOMBRES" ? HOMBRES : MUJERES;
};

const setActiveBtn = (selectedParameter) => {
  const buttons = [...filters];
  buttons.forEach((btn) => {
    if (btn.dataset.filter !== selectedParameter) {
      btn.classList.remove("filtro--active");
    } else {
      btn.classList.add("filtro--active");
    }
  });
};

const init = () => {
  window.addEventListener("DOMContentLoaded", showProducts());
  filterContainer.addEventListener("click", changeSearchParameter);
};

init();
