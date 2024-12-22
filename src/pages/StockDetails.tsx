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
            new window.TradingView.widget({
                autosize: true,
                symbol: `NASDAQ:${symbol}`,
                interval: "D",
                timezone: "Etc/UTC",
                theme: "dark",
                style: "1",
                locale: "en",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: containerRef.current.id,
            });
        }
    }, [symbol])

    return (
        <Layout>
            <h2 className="text-3xl font-bold mb-6 text-amber-300">{symbol} Stock Details</h2>
            <div id="tradingview_widget" ref={containerRef} className="h-[800px]" />
        </Layout>
    )
}

export default StockDetails

