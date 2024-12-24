import { FC } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useSWR from 'swr';
import { Link } from 'react-router-dom'
import { Stock } from "../../types"

const fetcher = (...arg: [string, RequestInit?]) => {
    return fetch(...arg).then(res => res.json())
}

const Leaderboard: FC = () => {
    const { data, error } = useSWR<Stock[]>("http://127.0.0.1:8000/api/realtime/multiple/TATAMOTORS.NS,ADANIENT.NS,DRREDDY.NS,ITC.NS,BPCL.NS", fetcher)
    if (error) return <div>Error loading data</div>;
    if (!data) return <div>Loading...</div>;
    console.log(data)
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
                    {data && data.map((stock) => (
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
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Leaderboard

