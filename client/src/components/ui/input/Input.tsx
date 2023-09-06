import InputProps from "./input.interface"
import handleInputChange from '../../../utils/handleInputChange'
import React, { FC } from "react";


const Input: FC<InputProps> = React.memo(function Input({ type, setState, state, placeHolder }: InputProps) {
    return (
        <>
            <input
                type={type}
                className=" border-gray-400 border rounded px-1 mb-2 h-8"
                onChange={(event) => handleInputChange({ event, setState })}
                value={state}
                placeholder={placeHolder}
                required
            />
        </>
    )
})

export default Input
