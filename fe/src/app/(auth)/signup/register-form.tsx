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
import {
    Backend_URL, MES_PASS_EMPTY,
    MES_PASS_LENGTH, MES_PASS_REGEX, MES_REPASS_NOT_EQUAL,
    MES_USERNAME_LENGTH, MES_USERNAME_REGEX, MES_USERNAME_EMPTY,
    VAL_PASS_LENGTH,
    VAL_PASS_REGEX,
    VAL_USERNAME_LENGTH, VAL_USERNAME_REGEX, MES_REPASS_EMPTY, SIGN_IN_LINK, MES_EMAIL_INVALID, MES_EMAIL_EMPTY
} from "@/lib/Constants";
import {redirect} from "next/navigation";
import Link from "next/link";

const registerSchema = z.object({
    username: z.string({required_error: MES_USERNAME_EMPTY})
        .min(VAL_USERNAME_LENGTH.min, {message: MES_USERNAME_LENGTH.min})
        .max(VAL_USERNAME_LENGTH.max, {message: MES_USERNAME_LENGTH.max})
        .regex(VAL_USERNAME_REGEX, {message: MES_USERNAME_REGEX}),
    email: z.string({required_error: MES_EMAIL_EMPTY})
        .email({
            message: MES_EMAIL_INVALID
        }),
    password: z.string({required_error: MES_PASS_EMPTY})
        .min(VAL_PASS_LENGTH.min, {message: MES_PASS_LENGTH.min})
        .max(VAL_PASS_LENGTH.max, {message: MES_PASS_LENGTH.max})
        .regex(VAL_PASS_REGEX, {message: MES_PASS_REGEX}),
    rePassword: z.string({required_error: MES_PASS_EMPTY})
        .min(VAL_PASS_LENGTH.min, {message: MES_PASS_LENGTH.min})
        .max(VAL_PASS_LENGTH.max, {message: MES_PASS_LENGTH.max})
        .regex(VAL_PASS_REGEX, {message: MES_PASS_REGEX}),
})
    .refine(data => data.password === data.rePassword,
        {message: MES_REPASS_NOT_EQUAL})

export default function RegisterForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email:"",
            password: "",
            rePassword: "",
        },
    })

    const register = async (data: z.infer<typeof registerSchema>) => {
        const res = await fetch(Backend_URL + "/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password_hash: data.password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!res.ok) {
            alert(res.statusText);
            return
        }

        const response = await res.json();
        alert("User registered!");
        redirect(SIGN_IN_LINK);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(register)} className="space-y-6 w-full">
                    <div className={"flex space-x-5"}>
                        <div className={"flex-1 flex flex-col space-y-1.5"}>
                            <div className={"h-24"}>
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
                            </div>
                            <div className={"h-24"}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={"text-primary-foreground"}>Địa chỉ email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập địa chỉ email ..." {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className={"flex-1 flex flex-col space-y-1.5"}>
                            <div className={"h-24"}>
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
                            </div>
                            <div className={"h-24"}>
                                <FormField
                                    control={form.control}
                                    name="rePassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={"text-primary-foreground"}>Xác nhận mật khẩu</FormLabel>
                                            <FormControl>
                                                <Input type={"password"} placeholder="Nhập lại mật khẩu ..." {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className={"w-full hover:border-sky-400 hover:text-sky-400"}>Đăng ký</Button>
                </form>
            </Form>
            <div className={"w-full flex flex-col items-center border-t border-slate-400 mt-6 pt-6"}>
                <p className={"text-white text-sm"}>Bạn đã có tài khoản ?{" "}
                    <Link href={SIGN_IN_LINK}
                          className={"border-b hover:text-sky-400 hover:border-sky-400"}>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </>
    )
}
