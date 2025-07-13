import { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import LoadingPage from './components/LoadingPage';
import ResultsPage from './components/ResultsPage';

const BackgroundEqualizer = () => {
    const bars = Array.from({ length: 30 }, (_, i) => <div key={i} className="bar"></div>);
    return <div className="background-equalizer">{bars}</div>;
};

function App() {
    const [view, setView] = useState('home');
    const [resultsData, setResultsData] = useState(null);
    const [error, setError] = useState('');
    const [interval, setInterval] = useState(120);

    const processVodLink = async (vodLink, interval) => {
        setError('');
        setView('loading');
        
        try {
            const response = await fetch('http://127.0.0.1:8000/processVod', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({vodLink: vodLink, interval: interval}),
            });

            // if the backend returns an error
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'The link could not be processed.');
            }

            const data = await response.json();
            setResultsData(data);
            setView('results'); // switch to results page

        } catch (err) {
            console.error("Processing Error:", err);
            setError(err.message);
            setView('home');
        }
    };

    const handleGoBack = () => {
        setResultsData(null);
        setError('');
        setView('home');
    };

    const renderView = () => {
        switch (view) {
            case 'loading':
                return <LoadingPage />;
            case 'results':
                return <ResultsPage data={resultsData} onGoBack={handleGoBack} interval={interval} />;
            case 'home':
            default:
                return <HomePage onProcessLink={processVodLink} error={error} interval={interval} onIntervalChange={setInterval} />;
        }
    };

    // const showBackground = view === 'home' || view === 'loading';
    const showBackground = true

    return (
        <div className="app-wrapper">
            {showBackground && <BackgroundEqualizer />}

            <div className="app-container">
                {renderView()}
            </div>
        </div>
    );
}

export default App;