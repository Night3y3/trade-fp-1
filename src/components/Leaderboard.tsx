import { FC } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from 'react-router-dom'

interface Stock {
    symbol: string
    name: string
    price: number
    change: number
    volume: number
}

const stocks: Stock[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5, volume: 1000000 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -0.5, volume: 500000 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 800.75, change: 5.2, volume: 750000 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3300.50, change: 1.8, volume: 600000 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.20, change: 0.7, volume: 800000 },
]

const Leaderboard: FC = () => {
    return (
        <div className="overflow-x-auto">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-amber-300">Symbol</TableHead>
                        <TableHead className="text-amber-300">Name</TableHead>
                        <TableHead className="text-amber-300">Price</TableHead>
                        <TableHead className="text-amber-300">Change</TableHead>
                        <TableHead className="text-amber-300">Volume</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stocks.map((stock) => (
                        <TableRow key={stock.symbol} className="hover:bg-zinc-800">
                            <TableCell>
                                <Link to={`/stock/${stock.symbol}`} className="text-amber-400 hover:underline">
                                    {stock.symbol}
                                </Link>
                            </TableCell>
                            <TableCell>{stock.name}</TableCell>
                            <TableCell>${stock.price.toFixed(2)}</TableCell>
                            <TableCell className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                                {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                            </TableCell>
                            <TableCell>{stock.volume.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Leaderboard

