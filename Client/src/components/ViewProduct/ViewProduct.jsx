import * as React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import eyeIcon from "../../assets/icons/eye.svg";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function ViewProduct({ id }) {
  const products = useSelector((state) => state.productsReducer.products);
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
  });

  function handleView() {
    let data = products.filter((data, index) => {
      return data._id === id;
    });
    setProduct(data[0]);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <img
          src={eyeIcon}
          className={"w-4 h-4 cursor-pointer text-white "}
          onClick={handleView}
        />
      </DrawerTrigger>
      <DrawerContent className="bg-appBg-dark">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-5xl">
              {product.productName}
            </DrawerTitle>
            <DrawerDescription>{product.description}</DrawerDescription>
            <DrawerDescription className="text-xl">
              Price : &#x20b9; {product.price}
            </DrawerDescription>
            <DrawerDescription className="text-xl">
              Quantity : {product.quantity}
            </DrawerDescription>
            <DrawerDescription className="text-xl">
              Total : &#x20b9; {product.quantity * product.price}
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
