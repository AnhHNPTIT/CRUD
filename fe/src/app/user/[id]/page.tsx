import {Metadata} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import {Backend_URL} from "@/lib/Constants";

export const metadata: Metadata = {
    title: " Thông tin cá nhân",
};

type Props = {
    params: {
        id: string
    }
}

export default async function User(props: Props) {
    const session = await getServerSession(authOptions);
    const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
        }
    })

    const user = await response.json();

    if (!session) {
        return redirect("/login");
    }

    return (
        <div>
            <div>
                <p>{user.name}</p>
            </div>
            <div>Content</div>
        </div>
    );
}
