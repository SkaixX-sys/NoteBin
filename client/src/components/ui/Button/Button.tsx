import { FC, PropsWithChildren, ReactNode } from "react"

interface ButtonProps {
    children: ReactNode,
    onClickFunction: (email: string, password: string, username: string) => Promise<void>,
    email?: string,
    password?: string,
    username?: string
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, onClickFunction, email, password, username }) => {

    return (
        <button onClick={() => onClickFunction(email || "", password || "", username || "")} className="py-2 px-3 border bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full">
            {children}
        </button>
    )
}

export default Button