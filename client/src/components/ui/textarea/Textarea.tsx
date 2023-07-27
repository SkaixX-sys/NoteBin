import handleInputChange from '../../../service/handleInputChange'
import React from "react";
import textareaProps from "./textarea.interface";


const Textarea = React.memo(function Input({ setState, state, htmlFor, labelChildren }: textareaProps) {
    return (
        <>
            <label
                htmlFor={htmlFor}>{labelChildren}</label>
            <textarea
                className="border rounded h-28 p-1"
                onChange={(event) => handleInputChange({ event, setState })}
                value={state}
            />
        </>
    )
})

export default Textarea
