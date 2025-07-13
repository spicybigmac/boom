import { useState } from 'react';

function HomePage({ onProcessLink, error, interval, onIntervalChange }) {
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onProcessLink(link, interval);
    };

    const handleIntervalChange = (e) => {
        const value = parseInt(e.target.value, 10);
        onIntervalChange(value);
    }

    return (
        <div className="home-page-container">
            <div className="main-content-wrapper gradient-box">
                <h1 className="title-boom">Boom!</h1>
                <p className="slogan">See what makes your stream boom, and what makes it bust.</p>
                
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div className="input-group">
                        <input
                            type="url"
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
                        <label htmlFor="interval">Analysis Interval: <strong>{interval}s</strong></label>
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

            <section className="explanation-section gradient-box">
                <h2>Streaming Simplified.</h2>
                <p>
                    <strong>Boom!</strong> uses AI to watch a Twitch VOD for you. It analyzes the chat's excitement and conversation to pinpoint peak moments, and tell you what engages your audience.
                </p>
                <ul>
                    <li><span className="highlight-text">Excitement Graph:</span> Visualize the stream's excitement from start to finish.</li>
                    <li><span className="highlight-text">Chat Summaries:</span> Understand the context of every "boom" moment.</li>
                    <li><span className="highlight-text">Instant Highlights:</span> Spend less time searching and more time creating.</li>
                </ul>
            </section>
        </div>
    );
}

export default HomePage;