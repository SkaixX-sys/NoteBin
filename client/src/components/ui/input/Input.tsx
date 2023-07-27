import InputProps from "./input.interface"
import handleInputChange from '../../../service/handleInputChange'
import React, { FC } from "react";


const Input: FC<InputProps> = React.memo(function Input({ type, setState, state, htmlFor, labelChildren }: InputProps) {
    return (
        <>
            <label
                htmlFor={htmlFor}>{labelChildren}</label>
            <input
                type={type}
                className=" border-gray-400 border rounded px-1 mb-2 h-8"
                onChange={(event) => handleInputChange({ event, setState })}
                value={state}
            />
        </>
    )
})

export default Input
