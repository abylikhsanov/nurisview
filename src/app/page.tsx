"use client";

import React, {useEffect} from "react";
import {Navbar} from "@/components/navbar";
import {Grid} from "@/components/grid";

export default function Home() {
  useEffect(() => {
    const fetchJackets = async () => {
      const response = await fetch("http://localhost:1337/api/jackets", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        }
      });
      const jackets = await response.json();
      console.log(`Jackets: ${JSON.stringify(jackets)}`);
    }

    fetchJackets();
  }, []);
  return (
    <React.Fragment>
      <Navbar />
    </React.Fragment>
  );
}
