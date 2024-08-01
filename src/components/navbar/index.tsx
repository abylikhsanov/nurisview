// @flow
import * as React from 'react';
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

type Props = {

};
export const Navbar = (props: Props) => {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="flex flex-col w-full max-w-7xl justify-center items-center my-4 space-y-5">
                <Link href={"/"}><h2 className="text-6xl text-black">NURISVIEW</h2></Link>
                <div className="flex w-full items-center justify-around">
                    <Link href={"/jackets"}>Jackets</Link>
                    <Link href={"/tops"}>Tops</Link>
                    <p>Coats</p>
                    <p>Jeans</p>
                    <p>Pants</p>
                    <p>Shirts</p>
                </div>
                <Separator />
            </div>
        </div>
    );
};