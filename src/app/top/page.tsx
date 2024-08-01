// @flow
import * as React from 'react';
import {Item} from "@/components/item";
import {Navbar} from "@/components/navbar";

type Props = {

};
const Page = (props: Props) => {
    return (
        <div className="flex flex-col space-y-10 w-full">
            <Navbar />
            <Item endpoint="tops" />
        </div>
    );
};

export default Page;