import { FC } from 'react'
import Layout from '../components/Layout'
import Leaderboard from '../components/Leaderboard'
import NewsGrid from '../components/NewsGrid'

const Home: FC = () => {
  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-amber-300">Trending Stocks</h2>
      <Leaderboard />
      <h2 className="text-3xl font-bold my-6 text-amber-300">Latest News</h2>
      <NewsGrid />
    </Layout>
  )
}

export default Home

