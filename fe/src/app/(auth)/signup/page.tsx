import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Metadata} from "next";
import RegisterForm from "./register-form";
import Link from "next/link";
import {SIGN_IN_LINK} from "@/lib/Constants";

export const metadata: Metadata = {
    title: "Đăng ký",
};

export default function SignUp() {
    return (
        <div className={"h-fit mt-16 flex flex-col items-center w-2/4"}>
            <h1 className={"w-fit text-primary-foreground text-4xl font-bold mb-12"}>Đăng Ký</h1>
            <div className={"flex flex-col bg-slate-900 rounded-2xl py-8 px-12 w-full"}>
                <RegisterForm/>
            </div>
        </div>
    );
}
