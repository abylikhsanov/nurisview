
import React from "react";
import {Navbar} from "@/components/navbar";
import {Grid} from "@/components/grid";

export default function Page() {

    return (
        <React.Fragment>
            <Navbar />
            <Grid endpoint={"jackets"}/>
        </React.Fragment>
    );
}
