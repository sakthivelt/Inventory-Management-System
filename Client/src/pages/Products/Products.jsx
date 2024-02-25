import React, { useState } from "react";
import Auth from "../Auth/Auth";
import InputBox from "../../components/InputBox/InputBox";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";

// icons
import productIcon from "../../assets/icons/product.svg";
import listIcon from "../../assets/icons/list.svg";
import qrCodeICon from "../../assets/icons/qrCode.svg";
import rupesIcon from "../../assets/icons/rupes.svg";
import { validateProduct } from "../../Validation/product";
import toast from "react-hot-toast";
import axios from "axios";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Redux/index";
import { createProduct, fetchProducts } from "../../Api/product";
import Transition from "@/components/Transition/Transition";

function Products() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);
  // (products.products);

  function handleAddProduct() {
    localStorage.getItem("token");
    let data = {
      productName,
      category,
      quantity,
      price,
      description,
    };
    const { error } = validateProduct(data);
    if (error) return toast.error(error.message);

    toast.promise(createProduct(data), {
      loading: "sending..",
      success: (data) => {
        fetchProducts(dispatch);
        return "Added";
      },
      error: (error) => {
        error;
        return "server error";
      },
    });
  }

  return (
    <div className="w-full h-full">
      <div className="title w-full text-center mb-6 -mt-3">
        <h3 className="text-2xl font-bold">Add Products</h3>
      </div>
      <div className="card w-full h-full grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3">
        <InputBox
          name={"Product Name"}
          placeholder={"ex: Mac Book pro"}
          icon={productIcon}
          value={productName}
          setValue={setProductName}
        />
        <InputBox
          name={"Category"}
          placeholder={"ex: electronics"}
          icon={qrCodeICon}
          value={category}
          setValue={setCategory}
        />
        <InputBox
          name={"Quantity"}
          icon={listIcon}
          placeholder={"ex: 5"}
          value={quantity}
          setValue={setQuantity}
        />
        <InputBox
          name={"Price"}
          icon={rupesIcon}
          placeholder={"ex: 35000"}
          value={price}
          setValue={setPrice}
        />
        <TextArea
          name={"Description"}
          nLines={9}
          value={description}
          setValue={setDescription}
        />
        <div />
        <div>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
      </div>
    </div>
  );
}

// export default Products;
export default Auth(Products);
