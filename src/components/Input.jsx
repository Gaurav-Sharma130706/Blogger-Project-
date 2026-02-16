import React , {useId} from "react";

const Input = React.forwardRef(function Input({       //forwardRef ko use karke apan ek aisa bhi code likh sakte hain aur ek aur tarika jesa apan code likhte aaye hain usme agar use karna ho forwardRef toh write code like that done in Select.jsx
    label,
    type="text",
    className="",
    ...props
}, ref){

    const id= useId()  //yehi same id apan ne dono label aur input mai use kari hai to link them with each other

    return(
        <div className="w-full">
            {label && <label    //Conditional rendering ki agar label diya hai toh label use hoga
            className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}

             <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full   ${className}`} ref={ref} {...props} id={id}></input>  {/*idhar ref hi voh reference hai jiske liye apan forward reference use kar rahe hain */}
        </div>
    )
})

export default Input