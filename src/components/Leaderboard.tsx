import { FC } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import useSWR from 'swr'
import { Link } from 'react-router-dom'
import { Stock } from "../../types"
import { AlertCircle } from 'lucide-react'

const fetcher = (...arg: [string, RequestInit?]) => {
    return fetch(...arg).then(res => res.json())
}

const SkeletonRow: FC = () => (
    <TableRow>
        <TableCell><Skeleton className="h-4 w-24 bg-amber-900/20" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16 bg-amber-900/20" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16 bg-amber-900/20" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16 bg-amber-900/20" /></TableCell>
        <TableCell><Skeleton className="h-4 w-24 bg-amber-900/20" /></TableCell>
    </TableRow>
)

const ErrorAnimation: FC = () => (
    <div className="flex items-center justify-center h-32 animate-pulse">
        <AlertCircle className="w-12 h-12 text-red-500 mr-2" />
        <span className="text-red-500 text-lg">Error loading data</span>
    </div>
)

const Leaderboard: FC = () => {
    const { data, error } = useSWR<Stock[]>("http://127.0.0.1:8000/api/realtime/multiple/TATAMOTORS.NS,ADANIENT.NS,DRREDDY.NS,ITC.NS,BPCL.NS", fetcher)

    if (error) return <ErrorAnimation />

    return (
        <div className="overflow-x-auto">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-amber-300">Symbol</TableHead>
                        <TableHead className="text-amber-300">Open Price</TableHead>
                        <TableHead className="text-amber-300">Close Price</TableHead>
                        <TableHead className="text-amber-300">Percent Change</TableHead>
                        <TableHead className="text-amber-300">Volume</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!data ? (
                        <>
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                        </>
                    ) : (
                        data.map((stock) => (
                            <TableRow key={stock.symbol} className="hover:bg-zinc-800">
                                <TableCell>
                                    <Link to={`/stock/${stock.symbol}`} className="text-amber-400 hover:underline">
                                        {stock.symbol}
                                    </Link>
                                </TableCell>
                                <TableCell>{stock.details.open_price.toFixed(2)}</TableCell>
                                <TableCell>${stock.details.close_price.toFixed(2)}</TableCell>
                                <TableCell className={stock.details.percent_change >= 0 ? 'text-green-500' : 'text-red-500'}>
                                    {stock.details.percent_change > 0 ? '+' : ''}{stock.details.percent_change.toFixed(2)}%
                                </TableCell>
                                <TableCell>{stock.details.volume.toLocaleString()}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Leaderboard