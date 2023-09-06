import { KeyboardEvent } from "react";

export default interface textareaProps {
    setState: (value: string) => void,
    state: string,
    htmlFor: string,
    labelChildren: string,
    onKeyDown:(event: KeyboardEvent<HTMLTextAreaElement>) => void
}