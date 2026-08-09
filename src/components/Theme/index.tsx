import "./index.css";
import type { PropsWithChildren } from "react"


export const Theme = ({ children }: PropsWithChildren) => {

    return <div className="Theme">
        {children}
    </div>
}