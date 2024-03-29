import React from "react";

function InputBox({
  name,
  placeholder,
  className,
  icon,
  iconClass,
  iconStyle,
  value,
  setValue,
  idName,
}) {
  if (!icon)
    return (
      <div className="w-full">
        <label
          htmlFor="input-group-1"
          className="block mb-2 text-sm font-medium  text-white"
        >
          {name}
        </label>
        <div className="relative mb-6">
          {icon && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              {icon && (
                <img
                  style={iconStyle}
                  src={icon}
                  className={"w-6 h-6  text-white " + iconClass}
                />
              )}
            </div>
          )}
          <input
            name={idName}
            type="text"
            id="input-group-1"
            className={
              "outline-appBorder appBorder ext-sm rounded-lg  focus:border-appLine block w-full  p-2.5  bg-appBg-semilight  placeholder-gray-400 text-white focus:ring-appLine   " +
              className
            }
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder={placeholder}
          />
        </div>
      </div>
    );

  return (
    <div className="w-full">
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium  text-white"
      >
        {name}
      </label>
      <div className="relative mb-6">
        {icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {icon && (
              <img
                style={iconStyle}
                src={icon}
                className={"w-6 h-6  text-white " + iconClass}
              />
            )}
          </div>
        )}
        <input
          name={idName}
          type="text"
          id="input-group-1"
          className={
            "outline-appBorder appBorder ext-sm rounded-lg  focus:border-appLine block w-full ps-10 p-2.5  bg-appBg-semilight  placeholder-gray-400 text-white focus:ring-appLine   " +
            className
          }
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default InputBox;
