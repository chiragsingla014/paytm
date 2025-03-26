

export function Balance({balance}){

    return (
        <div className="flex m-4">
            <div className="text-sm font-bold">
                Your balance :
            </div>
            <div className="text-sm font-black ml-2">
                Rs. {balance}
            </div>
        </div>

    )
}