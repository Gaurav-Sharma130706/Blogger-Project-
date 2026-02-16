import React from "react";

function Button({
    children,
    type= 'button',
    bgColor= 'bg-blue-600',
    textColor= 'text-white',
    className='',
    ...props}){
    return(
        <button className={`px-4 py-2 rounded-lg cursor-pointer ${bgColor} ${textColor} ${className}`}  {...props}>
             {children}     {/*The text of our button */}
        </button>
    )
}

export default Button