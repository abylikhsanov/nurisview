"use client"
import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Loader} from "lucide-react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {useRouter} from "next/navigation";


export interface ThumbnailFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export interface ImageAttributes {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail: ThumbnailFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
}

export interface ImageData {
    id: number;
    attributes: ImageAttributes;
}

export interface Images {
    data: ImageData[];
}

export interface Videos {
    data: any | null;
}

export interface ItemAttributes {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    title: string;
    images: Images;
    videos: Videos;
}

export interface Item {
    id: number;
    title: string;
    attributes: ItemAttributes;
}

type Props = {
    endpoint: string
};
export const Grid = ({endpoint}: Props) => {
    const [items, setItems] = useState<Item[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [index, setIndex] = useState<number>(2);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(25);
    const [loading, setLoading] = useState<boolean>(false);
    const [descIndex, setDescIndex] = useState(0);
    const [description, setDescription] = useState<string | null>(null);
    const router = useRouter();

    const loadMoreItems = useCallback(async () => {
        setLoading(true);
        try {
            // Replace with your API endpoint
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_ENDPOINT}/api/${endpoint}?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
                },
            });
            const data = await response.json();
            const newItems = data["data"].map((item: any) => ({
                id: item.id,
                description: "Sample description",
                imageUrl: item.url,
                attributes: item.attributes,
            }));
            setItems((prevItems) => [...prevItems, ...newItems]);
            setPage((prevPage) => prevPage + 1);
            setIndex((prevIndex) => prevIndex + 1);
        } catch (error) {
            console.error("Failed to load items", error);
        }
        setLoading(false);
    }, [page]);

    useEffect(() => {
        loadMoreItems();
    }, []);


    function handleClickPrev(item: any) {
        setDescIndex((prevState) => prevState - 1)
        setDescription(item.attributes.images.data[descIndex].attributes.caption)
    }

    function handleClickNext(item: any) {
        setDescIndex((prevState) => prevState + 1)
        setDescription(item.attributes.images.data[descIndex].attributes.caption)
    }


    return (
        <div className="p-4">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <Card key={item.id} className="max-w-[400px]">
                        <CardContent>
                        <Carousel className="relative justify-center items-center">
                            <CarouselContent className="w-[350px] h-[400px] pt-2 hover:cursor-pointer hover:bg-muted" onClick={() => router.push(`${endpoint.slice(0, -1)}?id=${item.id}`)}>
                                {item.attributes.images.data.map((image, index) => {
                                    return (
                                        <CarouselItem key={index}>
                                            <Image className="object-cover w-full h-full" src={image.attributes.url}
                                                   width={350} height={400} alt={"image"} />
                                        </CarouselItem>

                                    )
                                })}

                            </CarouselContent >
                            <CarouselPrevious />
                            <CarouselNext/>
                        </Carousel>
                        </CardContent>
                        <CardFooter className="flex flex-col w-full justify-center items-center">
                            <h2 className="text-xl text-center text-muted-foreground">{item.attributes.title}</h2>
                        </CardFooter>

                    </Card>
                ))}
            </div>
        </div>
    );
};