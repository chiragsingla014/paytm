import { Link } from "react-router-dom";


export function ButtonWarning({label, buttonText, to}){
    return (
        <div className="flex justify-center">
            <p className="text-sm">{label}</p>
            <br/>
            <Link  className='text-sm ml-1 underline cursor-grab' to={to}>{buttonText}</Link>
        </div>
    )
}