import { useState } from "react"
import { Button } from "./Button";

export function Users(){

    const [users, setUsers] = useState([{
        firstName: "Chirag",
        lastName: "Singla",
        _id: 1
    }]);

    return (
        <div className="m-4">
            <h3 className="font-bold">Users</h3>
            <input className="w-full border-1 border-gray-200" placeholder=" Search Users"/>
            {users.map((user)=><User key={user._id} user={user}/>)}
        </div>

    )
}


function User({user}){

    return(
        <div className="flex justify-between items-center">
            <div className="flex justify-around items-center">
                <div className=" bg-gray-200 pl-1.5 pr-1.5 rounded-2xl border-1 border-gray-400">
                    {user.firstName[0]}
                </div>
                <div className="pl-2">
                    {user.firstName} {user.lastName}
                </div>
            </div>

            <div className="">
                <Button label={'Send Money'}/>
            </div>

        </div>
    )
}