function LoadingPage() {
    return (
        <div className="main-content-wrapper gradient-box loading-page-content">
            <h1 className="loading-title-boom">Boom!</h1>
            <p className="loading-message">
                Analyzing the hype... Please wait.
            </p>
            <div className="tip-box">
                <strong>Tip:</strong> This can take a minute for longer or more popular VODs.
            </div>
        </div>
    );
}

export default LoadingPage;