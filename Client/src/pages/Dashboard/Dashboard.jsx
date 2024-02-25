import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Auth from "../Auth/Auth";
import InputBox from "../../components/InputBox/InputBox";
import { fetchProducts } from "../../Api/product";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table";
import _ from "lodash";
import SearchIcon from "../../assets/icons/search.svg";
import LottieBag from "../../components/Lottie/LottieBag/LottieBag";
import LottieWallet from "../../components/Lottie/LottieWallet/LottieOutOfStock";
import LottieOutOfStock from "../../components/Lottie/LottieOutOfStock/LottieOutOfStock";

function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);
  const [loading, setLoading] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalStoreValue, setTotalStroeValue] = useState(0);
  const [totalOutOfStock, setTotalOutOfStock] = useState(0);

  useEffect(() => {
    fetchProducts(dispatch, setLoading);
  }, []);

  useEffect(() => {
    let data = products?.filter((data) => {
      return data?.productName
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setSearchProducts(data);

    let total = products.reduce((acc, obj) => {
      acc, obj;
      if (obj.quantity <= 0) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
    setTotalOutOfStock(total);

    total = products.reduce((acc, obj) => {
      return acc + (obj.quantity + obj.price);
    }, 0);
    setTotalStroeValue(total);
    total = products.reduce((acc, obj) => acc + 1, 0);
    setTotalProduct(total);
  }, [searchInput, products]);

  return (
    <div>
      {loading && <h3>loaing....</h3>}
      <div className="grid xl:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-3 mb-3">
        <div className="card flex flex-row gap-3">
          <div className="xl:w-20 md:w-20 w-10 xl:h-20 md:h-20 h-10">
            <LottieBag isplay={true} />
          </div>
          <h3>
            Total products <br /> {totalProduct}
          </h3>
        </div>
        <div className="card flex flex-row gap-3">
          <div className="xl:w-20 md:w-20 w-10 xl:h-20 md:h-20 h-10">
            <LottieWallet isplay={true} />
          </div>
          <h3>
            Total Store Value <br /> &#x20b9; {totalStoreValue}
          </h3>
        </div>
        <div className="card flex flex-row gap-3">
          <div className="xl:w-20 md:w-20 w-10 xl:h-20 md:h-20 h-10">
            <LottieOutOfStock isplay={true} />
          </div>
          <h3>
            Out of Stock <br />
            {totalOutOfStock}
          </h3>
        </div>
        <div className="card">
          <InputBox
            name={"Search"}
            value={searchInput}
            setValue={setSearchInput}
            icon={SearchIcon}
          />
        </div>
      </div>
      <div className="card">
        <Table product={searchInput ? searchProducts : products} />
      </div>
    </div>
  );
}

export default Auth(Dashboard);
