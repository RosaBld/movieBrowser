import { ThisWeek, Today, Upcoming, Popular, NowPlaying } from '../components/Movies';
import Banner from '../components/Banner';

export function Home() {
    return (
        <div className="App">
        <Banner />
            <div className="Trending">
                <h3 className="trends">Popular</h3>
                <Popular />
                <h3 className="trends">Trending this week</h3>
                <ThisWeek />
            </div>
            <NowPlaying />
            <div className="Trending">    
                <h3 className="trends">Trending today</h3>
                <Today />
                <h3 className="trends">Upcoming</h3>
                <Upcoming />
            </div>
        </div>
    )
}