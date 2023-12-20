import { ThisWeek, Today } from '../components/Movies';
import Banner from '../components/Banner';

export function Home() {
    return (
        <div className="App">
        <Banner />
            <div className="Trending">
                <h3 className="trends">Trending this week:</h3>
                <ThisWeek />
                <h3 className="trends">Trending today:</h3>
                <Today />
            </div>
        </div>
    )
}