import React from "react"
import {BackendUrl} from "@/lib/Contanst";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

type Props = {
    params: {
        id: string
    }
}

export const ProfileUser = async (props: Props) => {
    const session = await getServerSession(authOptions);

    const response = await fetch(BackendUrl + `user/${props.params.id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
        }
    })

    const user = await response.json();
    return (
        <section>
            User Profile
            <p>{user.name}</p>
            <p>{user.email}</p>
        </section>
    )
}