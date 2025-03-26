import { Heading } from "../components/Heading"
import { Button } from "../components/Button"
import { InBox } from "../components/InBox"
import { ButtonWarning } from "../components/ButtonWarning"

export function Signin() {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center h-max mb-4 mt-4 px-4">
                    <Heading label='Sign In'/>
                    <InBox label="Username" type={"text"} placeholder="JohnDoe123"/>
                    <InBox label="Password" type={"password"} placeholder="•••••••••"/>
                    <Button label='Sign In' />
                    <ButtonWarning label="Don't have an account?" buttonText={"Sign Up"} to={"/signup"}/>

                </div>
            </div>
        </div>

    )
}