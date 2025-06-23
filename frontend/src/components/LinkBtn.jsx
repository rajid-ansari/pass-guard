import React from "react";
import { Link } from "react-router-dom";

const LinkBtn = React.forwardRef(
    ({ children, path, classname, ...props }, ref) => {
        return (
            <Link
                to={path}
                ref={ref}
                className={`py-2 px-6 rounded-md bg-primary text-slate-100 font-poppins cursor-pointer hover:bg-secondary shadow-xl ${classname}`}
                {...props}
            >
                {children}
            </Link>
        );
    }
);

export default LinkBtn;
