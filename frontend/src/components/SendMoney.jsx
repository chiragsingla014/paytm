import { Button } from "./Button";
import { Heading } from "./Heading";
import { InBox } from "./InBox";

export function SendMoney(){


    return (

                <div className="bg-slate-300 h-screen flex justify-center">
                    <div className="flex flex-col justify-center">
                        <div className="rounded-lg bg-white w-80 text-center h-max mb-4 mt-4 px-4">
                            <Heading label={'Send Money'}/>
                            <div className="flex justify-start items-center pt-8 pb-8">
                                <div className=" bg-gray-200 pl-2 pr-2 rounded-2xl border-1 border-gray-400 text-2xl">
                                    A
                                </div>
                                <div className="pl-2 text-2xl">
                                    Friend's Name
                                </div>
                            </div>
                            <InBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} type={"number"}/>
                            <Button label={"Send Money"}/>
        
                        </div>
                    </div>
                </div>
        
    )
}
