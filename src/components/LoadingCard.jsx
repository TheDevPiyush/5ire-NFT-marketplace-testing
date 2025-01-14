import React from 'react';
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from "@/components/ui/carousel"
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoadingCard() {
    return (
        <div className='w-[95%] justify-center flex items-center h-fit select-none flex-wrap'>
            <Carousel className='w-full animate-pulse'>
                <CarouselPrevious />
                <CarouselContent>
                    {Array.from({ length: 7 }).map(() =>
                        <CarouselItem className="basis-1/2 md:basis-1/5 lg:basis-1/7">
                            <Card className='cursor-pointer border-2 p-2'>
                                <div className="flex flex-col rounded-md items-center justify-center">
                                    <div className='bg-accent h-[150px] overflow-hidden rounded-sm  aspect-video bg-red'>

                                    </div>
                                    <div className="w-full text-left my-2">
                                        <div className='Name-Div mx-2'>
                                            <div className='Username my-1 w-full gap-5 flex items-center justify-between text-muted-foreground'>

                                                <div className='w-[50%] bg-accent text-transparent text-[1rem] overflow-hidden'>
                                                    <span>5ire</span>
                                                </div>

                                                <div className='cursor-pointer bg-accent w-[50%] text-right text-sm font-bold hover:text-blue-500 text-transparent'>
                                                    sometestaddress
                                                </div>
                                            </div>

                                            <div className='font-bold my-2 text-transparent flex justify-between text-[1.2rem]'>
                                                <span className='w-fit bg-accent '>NFT Name</span>
                                                <span className='w-fit bg-accent '>is Listed</span>
                                            </div>
                                            <Button className="my-2 text-lg w-full font-bold text-transparent bg-accent">
                                                BUTTON TEXT
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselNext />
            </Carousel>
        </div>
    );
}
