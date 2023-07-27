import { FC, PropsWithChildren } from "react"
import { Header } from "./Header/Header"
import { Footer } from "./Footer/Footer"
import { Toaster } from "react-hot-toast"

export const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <div className="h-screen">
            <Header />
            {children}
            <Toaster toastOptions={{style: {
                display: "none"
            }}}/>
            <Footer />
        </div>
    )
}