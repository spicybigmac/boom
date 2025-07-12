function LoadingPage() {
    return (
        <div className="main-content-wrapper">
            <h2>Processing your link...</h2>
            <p>The processing time will range from 30 seconds to 2 minutes depending on the length of your stream.</p>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                <div className="loader"></div>
            </div>
        </div>
    );
}

export default LoadingPage;