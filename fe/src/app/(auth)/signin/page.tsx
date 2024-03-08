import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Metadata} from "next";
import SigninForm from "./signin-form";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Đăng nhập",
};

type Props = {
    searchParam?: Record<"callbackUrl" | "error", string>
}

export default function SignIn(props : Props) {
    return (
        <div className={"h-fit mt-16 flex flex-col items-center w-2/6"}>
            <h1 className={"w-fit text-primary-foreground text-4xl font-bold mb-12"}>Đăng nhập</h1>
            <div className={"flex flex-col bg-slate-900 rounded-2xl py-8 px-12 w-full"}>
                <SigninForm error={props.searchParam?.error} callbackUrl={props.searchParam?.callbackUrl}/>
            </div>
        </div>
    );
}
