import { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsItem {
    id: number
    title: string
    description: string
    source: string
    date: string
}

const newsItems: NewsItem[] = [
    {
        id: 1,
        title: "Fed Announces Interest Rate Decision",
        description: "The Federal Reserve has decided to maintain current interest rates, citing economic stability.",
        source: "Financial Times",
        date: "2023-07-15"
    },
    {
        id: 2,
        title: "Tech Giant Unveils New AI Platform",
        description: "A major tech company has launched a groundbreaking AI platform, potentially disrupting multiple industries.",
        source: "Tech Insider",
        date: "2023-07-14"
    },
    {
        id: 3,
        title: "Oil Prices Surge Amid Global Tensions",
        description: "Geopolitical conflicts have led to a sharp increase in oil prices, affecting global markets.",
        source: "Energy News",
        date: "2023-07-13"
    },
    {
        id: 4,
        title: "Major Merger in Pharmaceutical Industry",
        description: "Two leading pharmaceutical companies have announced a merger, creating a new industry giant.",
        source: "Health Business Daily",
        date: "2023-07-12"
    },
]

const NewsGrid: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {newsItems.map((item) => (
                <Card key={item.id} className="bg-zinc-900 border-amber-700">
                    <CardHeader>
                        <CardTitle className="text-amber-300">{item.title}</CardTitle>
                        <CardDescription className="text-amber-500">{item.source} - {item.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-amber-100">{item.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default NewsGrid

