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
import { truncateAddress } from '@/lib/truncateAddress'

export default function CreatorsTableData({ data }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>CREATORS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    // TO DO : REDIRECT USER TO THE COLLECTION PAGE WHEN CLICKED IN TABLE
                    // <LinK></Link> 
                    <TableRow key={index} >
                        <TableCell className="font-bold py-1 flex gap-3 items-center">
                            <span className='w-12 h-12 rounded-full overflow-hidden object-contain'><img className='w-fit object-contain' src={item?.profilePicUrl} alt="" /></span>
                            <span className='text-lg'>{item?.walletAddress ? item.username > 20 ? truncateAddress(item.username) : item.username : truncateAddress(item.address)}</span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >

    )
}
