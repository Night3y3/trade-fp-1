import { FC, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'

declare global {
    interface Window {
        TradingView: any;
    }
}

const StockDetails: FC = () => {
    const { symbol } = useParams<{ symbol: string }>()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {

            const formattedSymbol = symbol?.replace('.NS', '').toLowerCase() || ''

            new window.TradingView.widget({
                autosize: true,

                symbol: `${formattedSymbol}`,
                interval: "D",
                timezone: "Asia/Kolkata",
                theme: "dark",
                style: "1",
                locale: "en",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: containerRef.current.id,
                exchange: "NSE",
                width: "100%",
                hide_side_toolbar: false,
                studies: [
                    "MASimple@tv-basicstudies",
                    "Volume@tv-basicstudies"
                ]
            });
        }
    }, [symbol])

    // Format the display symbol by removing .NS
    const displaySymbol = symbol?.replace('.NS', '') || ''

    return (
        <Layout>
            <h2 className="text-3xl font-bold mb-6 text-amber-300">{displaySymbol} Stock Details</h2>
            <div id="tradingview_widget" ref={containerRef} className="h-[800px]" />
        </Layout>
    )
}

export default StockDetails