"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Link from "next/link";
import {useSession} from "next-auth/react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {MES_PASS_EMPTY, MES_USERNAME_EMPTY, SIGN_UP_LINK} from "@/lib/Constants";

const loginSchema = z.object({
    username: z.string({required_error: MES_USERNAME_EMPTY}),
    password: z.string({required_error: MES_PASS_EMPTY})
})

type Props = {
    callbackUrl?: string,
    error?: string
}

export default function SigninForm(props: Props) {
    const router = useRouter();
    const {data: session} = useSession();

    // 1. Define your form.
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        const result = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false,
        })

        if (result?.ok) {
            router.push(props?.callbackUrl || '/');
        }else {
            console.log(result)
        }

    }


    return (
        <>
            <Form {...form}>
                {!!props.error ?? <p>Authentication fail</p>}
                <form onSubmit={form.handleSubmit((data, e) => {
                    e?.preventDefault();
                    return onSubmit(data);
                })} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={"text-primary-foreground"}>Tên người dùng</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập tên người dùng ..." {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={"text-primary-foreground"}>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type={"password"} placeholder="Nhập mật khẩu ..." {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={"w-full hover:border-sky-400 hover:text-sky-400"}
                    >
                        Đăng nhập
                    </Button>
                    {(!!(session && session.user) &&
                        <Link href={"/api/auth/signout"}>Signout</Link>
                    )}
                </form>
            </Form>
            <div className={"w-full flex flex-col items-center border-t border-slate-400 mt-6 pt-6"}>
                {/*<Button className={"w-full"}>*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"*/}
                {/*         viewBox="0 0 48 48" className={"mr-3"}>*/}
                {/*        <path fill="#FFC107"*/}
                {/*              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>*/}
                {/*        <path fill="#FF3D00"*/}
                {/*              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>*/}
                {/*        <path fill="#4CAF50"*/}
                {/*              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>*/}
                {/*        <path fill="#1976D2"*/}
                {/*              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>*/}
                {/*    </svg>*/}
                {/*    Continue with Google*/}
                {/*</Button>*/}
                <p className={"text-white text-sm"}>Bạn không có tài khoản ?{" "}
                    <Link href={SIGN_UP_LINK}
                          className={"border-b hover:text-sky-400 hover:border-sky-400"}>
                        Tạo tài khoàn
                    </Link>
                </p>
            </div>
        </>
    )
}
