import React from "react";

export default function AuthLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section className={"h-full flex justify-center align-middle bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 to-slate-700"}>
            {children}
        </section>
    )
}