export function InBox({label, placeholder, type}){
    return(
        <div>
            <div className="mb-2 flex flex-col">
                <label htmlFor={label} className="block mb-1 pl-1.2 mr-auto text-sm font-medium text-gray-900">{label}</label>
                <input type={type} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder={placeholder} required />
            </div>
        </div>
    )

}