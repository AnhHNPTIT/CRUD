'use client'
import React from "react"
import {Button} from "@/components/ui/button";
import {BellIcon, ChatBubbleIcon} from "@radix-ui/react-icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {SIGN_IN_LINK, SIGN_UP_LINK} from "@/lib/Constants";

export const Header = () => {
    const {data: session} = useSession()
    return (
        <header className={"sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 " +
            "lg:border-b lg:border-slate-900/10 border-slate-50/[0.06] " +
            "supports-backdrop-blur:bg-white/60 max-w-8xl mx-auto bg-slate-900"}>
            <div
                className={"relative flex items-center py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 " +
                    " mx-4 lg:mx-0"}>
                <div
                    className={"mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"}>
                    <Link href={"/"} className={"text-white font-bold hover:text-sky-400"}>LOGO</Link>
                </div>
                <div className={"relative hidden lg:flex items-center ml-auto"}>
                    <div className={"flex items-center border-l border-slate-200 ml-6 pl-6"}>
                        {
                            !!(session && session.user) ? <>
                                <Button variant={"ghost"} size={"icon"} className={"rounded-full mr-2"}>
                                    <Link href={`/user/${session?.user.id}`}>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shsadcn.png" alt="@shadcn"/>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                </Button><Button variant={"outline"} size={"icon"}
                                                 className={"hover:text-sky-500 rounded-full mr-2"}>
                                <ChatBubbleIcon className={"size-5"}/>
                            </Button><Button variant={"outline"} size={"icon"}
                                             className={"hover:text-sky-500 rounded-full"}>
                                <BellIcon className={"size-5"}/>
                            </Button>
                            </> : <>
                                <Link
                                    className={"inline-flex items-center justify-center whitespace-nowrap rounded-md " +
                                        "text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none " +
                                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
                                        "disabled:pointer-events-none disabled:opacity-50 border border-input bg-slate-800 " +
                                        "text-primary-foreground hover:bg-slate-800/60 px-4 py-2 h-full mr-3 border-slate-800 hover:text-sky-400"}
                                    href={`${SIGN_IN_LINK}`}>Đăng nhập</Link><Link
                                className={"inline-flex items-center justify-center whitespace-nowrap rounded-md " +
                                    "text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none " +
                                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
                                    "disabled:pointer-events-none disabled:opacity-50 border border-input " +
                                    "text-primary-foreground bg-transparent hover:text-accent-foreground px-4 py-2 h-full " +
                                    "hover:text-sky-400 hover:border-sky-400"}
                                href={`${SIGN_UP_LINK}`}>Đăng ký</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}