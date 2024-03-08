'use client'
import React from "react"
import {Button} from "@/components/ui/button";
import {BellIcon, ChatBubbleIcon} from "@radix-ui/react-icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {useSession} from "next-auth/react";

export const Header = () => {
    const {data: session} = useSession();

    return (
        <section>
            Sidebar
        </section>
    )
}