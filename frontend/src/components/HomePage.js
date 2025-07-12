import { useState } from 'react';

function HomePage({ onProcessLink, error, interval, onIntervalChange }) {
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onProcessLink(link);
    };

    const handleIntervalChange = (e) => {
        const value = parseInt(e.target.value, 10);
        onIntervalChange(value);
    };

    return (
        <div>
            <div className="main-content-wrapper">
                <h1>Boom!™</h1>
                <p>See what makes your stream Boom and what makes it bust.</p>
                <p>Enter a Twitch VOD link to get started.</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="vod-input"
                            placeholder="https://www.twitch.tv/videos/..."
                            required
                        />
                        <button type="submit" className="submit-button">
                            Analyze
                        </button>
                    </div>

                    <div className="interval-slider-group">
                        <label htmlFor="interval">Analysis Interval: <strong>{interval} seconds*</strong></label>
                        <div className="slider-input-container">
                            <input
                                type="range"
                                id="interval"
                                min="60"
                                max="3600"
                                step="10"
                                value={interval}
                                onChange={handleIntervalChange}
                                className="interval-slider"
                            />
                            <input
                                type="number"
                                min="60"
                                max="3600"
                                value={interval}
                                onChange={handleIntervalChange}
                                className="interval-number-input"
                            />
                        </div>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}

export default HomePage;