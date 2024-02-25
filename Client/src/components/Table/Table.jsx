import _ from "lodash";
import React, { useState } from "react";
import toast from "react-hot-toast";

import editIcon from "../../assets/icons/edit.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { deleteProduct } from "@/Api/product";
import { useDispatch } from "react-redux";
import { EditProduct } from "../EditProduct/EditProduct";
import { ViewProduct } from "../ViewProduct/ViewProduct";

function Table({ product = [] }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="w-full ">
      {isLoading && "deleting..."}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
          <thead className="text-xs border-b  uppercase bg-appBg-dark text-appColor-light ">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/No
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Totel
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {/* product items */}
          <tbody>
            {product &&
              product.map((item, index) => {
                return (
                  <tr
                    className="bg-appBg-dark border-b border-appBg-semilight  hover:bg-appBg-light "
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-appColor-light whitespace-nowrap dark:text-appColor-dark"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{item?.productName}</td>
                    <td className="px-6 py-4">{item?.category}</td>
                    <td className="px-6 py-4">{item?.quantity}</td>
                    <td className="px-6 py-4">${item?.price}</td>
                    <td className="px-6 py-4">
                      ${item?.price * item.quantity}
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                      <ViewProduct id={item._id} />
                      <EditProduct id={item._id} />

                      <img
                        onClick={() => {
                          deleteProduct(item?._id, dispatch, setIsLoading);
                        }}
                        src={deleteIcon}
                        className={"w-4 h-4 cursor-pointer text-white "}
                      />
                    </td>
                  </tr>
                );
              })}
            {_.isEmpty(product) && "Empty"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
