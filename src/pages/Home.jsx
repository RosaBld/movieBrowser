import { ThisWeek, Today } from '../components/Movies';
import TopRandom from '../components/Latest';

export function Home() {
    return (
        <div>
        <TopRandom />
            <div className="Trending">
                <ThisWeek />
                <Today />

            </div>
        </div>
    )
}