import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link'

export default function TableData({ data }) {
    return (
        <Table>
            <TableCaption>
                <Link href={'#'} className='hover:text-white'>
                    View All Collections <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </Link>
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>COLLECTION</TableHead>
                    <TableHead>FLOOR PRICE</TableHead>
                    <TableHead>FLOOR CHANGE</TableHead>
                    <TableHead>VOLUME</TableHead>
                    <TableHead>VOLUME CHANGE</TableHead>
                    <TableHead>ITEMS</TableHead>
                    <TableHead>OWNERS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    // TO DO : REDIRECT USER TO THE COLLECTION PAGE WHEN CLICKED IN TABLE
                    // <LinK></Link> 
                    < TableRow key={index} >
                        <TableCell className="font-bold py-4">{item.collection}</TableCell>
                        <TableCell className="font-bold">{item.floorPrice}</TableCell>
                        <TableCell className={`${item.floorChange.includes('-') ? 'text-red-500' : 'text-green-400'} font-bold`} >{item.floorChange}</TableCell>
                        <TableCell className="font-bold">{item.volume}</TableCell>
                        <TableCell className={`${item.volumeChange.includes('-') ? 'text-red-500' : 'text-green-400'} font-bold`}>{item.volumeChange}</TableCell>
                        <TableCell className="font-bold">{item.items}</TableCell>
                        <TableCell className="font-bold">{item.owners}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >

    )
}
