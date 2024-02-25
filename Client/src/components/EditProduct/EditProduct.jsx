import Button from "@/components/Button/Button";
import editIcon from "../../assets/icons/edit.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputBox from "../InputBox/InputBox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchProducts, updateProduct } from "@/Api/product";
import { validateProduct } from "@/Validation/product";
import { useDispatch, useSelector } from "react-redux";

export function EditProduct({ id }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  function handleClear() {
    setProductName("");
    setCategory("");
    setQuantity("");
    setPrice("");
    setDescription("");
    ("cleared");
  }

  function handleEdit() {
    let data = products.filter((data, index) => {
      return data._id === id;
    });
    console.log(id, data);
    setProductName(data[0].productName);
    setCategory(data[0].category);
    setQuantity(data[0].quantity);
    setPrice(data[0].price);
    setDescription(data[0].description);
    // isOpen(true);
    // axios
    //   .get(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    //     headers: { "x-auth-token": localStorage.getItem("token") },
    //   })
    //   .then((data) => {
    //     let value = data?.data?.data;
    //     setProductName(value.productName);
    //     setCategory(value.category);
    //     setQuantity(value.quantity);
    //     setPrice(value.price);
    //     setDescription(value.description);
    //   })
    //   .catch((error) => {
    //     error;
    //     toast.error("server error");
    //   });
  }

  function handleUpdate() {
    let data = { productName, category, quantity, price, description };

    let { error } = validateProduct(data);

    if (error) return toast.error(error.message);

    let update = updateProduct(id, data);

    toast.promise(update, {
      loading: "loading",
      success: (data) => {
        fetchProducts(dispatch);
        handleClear();
        setIsOpen(false);
        return "Updated ";
      },
      error: (error) => {
        error;
        return "server error";
      },
    });
  }

  useEffect(() => {
    return () => {
      handleClear();
    };
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
        e;
      }}
    >
      <DialogTrigger asChild>
        <img
          src={editIcon}
          className={"w-4 h-4 cursor-pointer text-white "}
          onClick={handleEdit}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]  bg-appBg-dark">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <InputBox
              id="name"
              value={productName}
              setValue={setProductName}
              className="col-span-3"
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Category
            </Label>
            <InputBox
              id="username"
              value={category}
              setValue={setCategory}
              className="col-span-3"
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Quantity
            </Label>
            <InputBox
              id="username"
              value={quantity}
              setValue={setQuantity}
              className="col-span-3"
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <InputBox
              id="username"
              value={price}
              setValue={setPrice}
              className="col-span-3"
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <InputBox
              id="username"
              value={description}
              setValue={setDescription}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
