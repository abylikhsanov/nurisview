"use client"
import * as React from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import {
    Carousel,
    CarouselMainContainer, CarouselNext, CarouselPrevious,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem,
} from "@/components/ui/extensions/carousel";
import {useCallback, useEffect, useState} from "react";
import Image from "next/image";

interface Item {
    id: string;
    title: string;
    imageUrls: string[]
    shoppingUrls: {itemUrl: string, imageUrl: string}[];
}

type Props = {
    endpoint: string;
};
export const Item = ({endpoint}: Props) => {
    const [item, setItem] = useState<Item | null>(null)
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    console.log(`id ${id}`)

    const loadItem = useCallback(async () => {
        if (!id) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_ENDPOINT}/api/${endpoint}/${id}?populate=*`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
                }
            })
            const data = await response.json();
            let newItem: Item = {
                id: data.data.id,
                title: data.data.attributes.title,
                imageUrls: [],
                shoppingUrls: [],
            }
            data.data.attributes.images.data.map((image: any) => {
                newItem.imageUrls.push(image.attributes.url);
            })
            data.data.attributes.itemImages.data.map((itemImage: any) => {
                newItem.shoppingUrls.push({
                    imageUrl: itemImage.attributes.url,
                    itemUrl: itemImage.attributes.caption,
                })
            })

            console.log(`Item: ${JSON.stringify(newItem)}`);
            setItem(newItem);
        } catch (error) {
            console.error(error);
        }
    }, [id])


    useEffect(() => {
        loadItem();
    }, []);
    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex flex-col max-w-2xl justify-center items-center m-4 p-4 space-y-6">
                <h2 className="text-2xl text-primary font-semibold">{item && item.title}</h2>

                <Carousel orientation="horizontal">
                    <CarouselNext className="top-1/3 -translate-y-1/3"/>
                    <CarouselPrevious className="top-1/3 -translate-y-1/3"/>
                    <CarouselMainContainer className="h-96 w-full">
                        {item &&
                            item.imageUrls.map((image: string, index) => (
                                <SliderMainItem key={index} className="h-full">
                                    <Image
                                        className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                                        src={image}
                                        width={250}
                                        height={300}
                                        alt={"image"}
                                    />
                                </SliderMainItem>
                            ))}
                    </CarouselMainContainer>

                    <CarouselThumbsContainer
                        className="w-full">
                        {item &&
                            item.imageUrls.map((image: string, index) => (
                                <SliderThumbItem
                                    key={index}
                                    index={index}
                                    className="w-[80px] h-[120px]"
                                >
                                    <Image
                                        className="rounded-md"
                                        src={image}
                                        width={80}
                                        height={100}
                                        alt={"thumbnail"}
                                    />
                                </SliderThumbItem>
                            ))}
                    </CarouselThumbsContainer>
                </Carousel>

                <h2 className="text-2xl text-primary font-semibold">Shop this look</h2>

                <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full max-w-screen-xl">
                    {item &&
                        item.shoppingUrls.map((urls, index) => (
                            <div
                                key={index}
                                className="w-full h-40 md:h-40 lg:h-56 xl:h-64 overflow-hidden"
                            >
                                <Image
                                    className="object-contain w-full h-full hover:cursor-pointer hover:bg-muted"
                                    src={urls.imageUrl}
                                    alt={"additional"}
                                    width={200}
                                    height={150}
                                    onClick={() => {
                                        window.open(urls.itemUrl)
                                    }}
                                />
                            </div>
                        ))}
                </div>
            </div>

        </div>
    );
};