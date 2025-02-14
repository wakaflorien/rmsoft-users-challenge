"use client";

import * as React from 'react';
import "./../globals.css";
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import Loading from '@/components/Loading';
import { logout } from '@/apis';

const activeLink = (label, pathname) => {

    const labelText = label.toLowerCase();
    const realPath = pathname.split("/dashboard")[1];
    const activePath = realPath.split("/")[1];

    if ((labelText === "dashboard" && pathname === "/dashboard") || (labelText.includes(activePath) && realPath)) {
        return true;
    }
    return false;
}

const nav1 = [{ link: "/dashboard", label: "Dashboard" }, { link: "/dashboard/users", label: "Users" }];

const iconMap = {
    "/dashboard": `lineicons:home-2`,
    "/dashboard/users": `basil:user-plus-outline`
};

export default function DashboardLayout({ children }) {
    // In-App imports
    const pathname = usePathname();
    const router = useRouter();

    // In-App data states
    const [isOpen, setIsOpen] = React.useState(false);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const handleLogout = async () => {
        await logout();
        router.push("/");
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="format-detection"
                    content="telephone=no, date=no, email=no, address=no"
                />
            </head>
            <body>
                <div className="grid sm:grid-cols-5 zoom-out">
                    <aside className="bg-green-600 text-white shadow-md ">
                        <nav className="flex flex-col justify-between h-screen sm:p-4">
                            <div className='sm:space-y-4'>

                                <p>RM Challenge</p>

                                <ul className='sm:space-y-4'>
                                    {nav1.map((item, index) => (
                                        <li key={index} className={`group flex items-center gap-1 sm:p-2 cursor-pointer rounded-md ${activeLink(item.label, pathname) ? "bg-white text-green-600" : "bg-green-600 text-white"} hover:bg-white hover:text-green-600 stroke-white hover:stroke-current`} onClick={() => {
                                            if (item.link === "/dashboard/users") {
                                                console.log("Show users page")
                                            } else {
                                                router.push(item.link);
                                            }
                                        }}>

                                            <Icon icon={iconMap[item.link]} className={`stroke-1 ${activeLink(item.label, pathname) ? "text-green-600 stroke-green-600" : "text-white stroke-white"} group-hover:text-green-600 transition-colors size-5`} />

                                            {item.label}

                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='sm:space-y-8'>

                                <div className="flex sm:flex-row sm:gap-4">
                                    <div className="relative bg-tertiaryColor h-10 w-10 rounded-full border-2 border-white object-contain">
                                        <Image src={`/Image.png`} alt="avatar" priority className="rounded-full h-10 w-20" width={40} height={40} />
                                        <div className='absolute bottom-0 right-0 bg-white h-3 w-3 border border-white rounded-full'></div>
                                    </div>
                                    <div className="flex sm:flex-col overflow-x-hidden">
                                        <p className="text-white text-sm sm:text-sm">{"username"}</p>
                                        <p className="text-white text-sm sm:text-sm"> {"email"}</p>
                                    </div>

                                    <Icon icon="ic:baseline-logout" className='text-white cursor-pointer size-5' onClick={handleLogout} />
                                </div>
                            </div>
                        </nav>
                    </aside>
                    <main className="grid sm:col-span-4 bg-white">
                        <div className='flex flex-col gap-4 sm:gap-8'>
                            <React.Suspense fallback={<Loading />}>
                                {children}
                            </React.Suspense>
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}