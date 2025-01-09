import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from '@/components/ui/card';


export default function LatestDrop({ NFTs }) {

    return (
        <div className='w-[95%] justify-center flex items-center h-fit select-none flex-wrap'>
            <Carousel className='w-full'>
                <CarouselPrevious />
                <CarouselContent>
                    {
                        NFTs.map((item, index) => (
                            <CarouselItem key={index} className="basis-1/2 md:basis-1/5 lg:basis-1/7">
                                <Card className='cursor-pointer'>
                                    <div className="flex flex-col items-center justify-center">
                                        <div className='overflow-hidden rounded-sm  aspect-square '>
                                            <img className='hover:scale-110 transition-all ' src={item.img} alt="" />
                                        </div>
                                        <div className="w-full text-left my-2">
                                            <div className='Name-Div mx-2'>
                                                <div className='Username my-1 w-full text-muted-foreground'>

                                                    {/* TO DO : REDIRECT TO NFT CREATER PAGE ON CLICK/}
                                                        {/* <Link></Link> */}

                                                    <div className='w-fit text-[1rem] overflow-hidden'>
                                                        {item.Price}
                                                    </div>

                                                    <div className='cursor-pointer hover:text-white'>
                                                        {item.user}
                                                    </div>
                                                </div>
                                                <div className='font-medium my-1 text-[1.2rem]'>
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </CarouselItem>))}
                </CarouselContent>
                <CarouselNext />
            </Carousel>
        </div>

    )
}
