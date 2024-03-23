import React, { useState, useEffect } from "react";
import Icon1 from "../../../assets/images/icon1.png";
import Icon2 from "../../../assets/images/icon2.png";
import Icon3 from "../../../assets/images/icon3.png";

import IconEdit from "../../../assets/images/icon-edit.png";
import IconDelete from "../../../assets/images/icon-delete.png";
import { Link, useNavigate } from "react-router-dom";
import "./Main.scss";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from mock API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      // Perform the delete operation
      fetch(`http://localhost:3000/products/${productId}`, {
        method: "DELETE",
      })
        .then(() => {
          // Filter out the deleted product from the products list
          setProducts(products.filter((product) => product.id !== productId));
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artikul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="sidebar">
        <div className="flex">
          <Link to="/" className="">
            <img src={Icon1} alt="" />
          </Link>
          <Link to="/" className="">
            <img src={Icon2} alt="" />
          </Link>
          <Link to="/add/product">
            <img src={Icon3} alt="" />
          </Link>
        </div>
      </div>
      <header className="header">
        <div className="header-wrapper">
          <h3>Товары</h3>
          <div className="flex">
            <p>Главная / </p>
            <p>Товары</p>
          </div>
        </div>
      </header>
      <div className="hero">
        <div className="container">
          <div className="hero-top">
            <div className="flex">
              <span>Все товары ({products.length})</span>
              <input
                className="input"
                placeholder="Поиск"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <hr className="hr" />
            {loading ? (
              <div className="loading-container">
                <div className="loading-indicator"></div>
              </div>
            ) : (
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                      <th>Артикул</th>
                      <th>Бренд</th>
                      <th>Цена</th>
                      <th>Цена со скидкой</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.artikul}</td>
                        <td>{product.brand}</td>
                        <td>{product.price}</td>
                        <td>{product.discountPrice}</td>
                        <td>
                          <img
                            src={IconEdit}
                            alt="Edit"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/add/${product.id}`)}
                          />
                          <img
                            src={IconDelete}
                            alt="Delete"
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => handleDelete(product.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Link to="/add/product" className="add-tovar">
              + Новый товар
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
