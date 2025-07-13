import { useState, useEffect, useMemo } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

function ResultsPage({ data, onGoBack }) {
    const [displayScore, setDisplayScore] = useState(0);

    const { averageScore, chartData, chartOptions, analysisArray } = useMemo(() => {
        const results = data
        if (results.length === 0) {
            return { averageScore: 0, chartData: {}, chartOptions: {}, analysisArray: [] };
        }

        const getScore = (item) => item.excitementScore;
        const totalScore = results.reduce((sum, item) => sum + getScore(item), 0);
        const avg = Math.round(totalScore / results.length);

        const labels = results.map((_, index) => `Interval ${index + 1}`);
        const scores = results.map(item => getScore(item));

        const preparedChartData = {
            labels,
            datasets: [{
                label: 'Excitement Score',
                data: scores,
                borderColor: '#9c5983c1',
                backgroundColor: 'rgba(252, 79, 208, 0.24)',
                fill: true,
                tension: 0.4,
            }],
        };

        const preparedChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#10101b',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    padding: 10,
                }
            },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { color: '#ababf0' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                x: { ticks: { color: '#ababf0' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
            }
        };

        return { averageScore: avg, chartData: preparedChartData, chartOptions: preparedChartOptions, analysisArray: results };
    }, [data]);

    useEffect(() => {
        if (averageScore === 0) return;
        const intervalId = setInterval(() => {
            setDisplayScore(prevScore => {
                if (prevScore >= averageScore) {
                    clearInterval(intervalId);
                    return averageScore;
                }
                return prevScore + 1;
            });
        }, 25);
        return () => clearInterval(intervalId);
    }, [averageScore]);

    const getPathColor = (score) => {
        if (score < 40) return '#ef4444';
        if (score < 70) return '#facc15';
        return '#4ade80';
    };

    const formatTime = (intervalIndex, intervalSeconds) => {
        let totalSeconds = intervalIndex * (intervalSeconds ?? 60);
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <div className="results-page-container">
            <h1 className="results-title">Analysis Complete</h1>

            <section className="results-section gradient-box">
                <h3>Average Excitement Score</h3>
                <div className="gauge-container">
                    <CircularProgressbarWithChildren
                        value={displayScore}
                        strokeWidth={8}
                        styles={buildStyles({
                            pathColor: getPathColor(displayScore),
                            trailColor: '#10101b',
                            pathTransitionDuration: 0.2,
                        })}
                    >
                        <strong className="gauge-text">{displayScore}</strong>
                    </CircularProgressbarWithChildren>
                </div>
            </section>
            
            <section className="results-section gradient-box">
                 <h3>Excitement Over Time</h3>
                 <div className="chart-container">
                    <Line options={chartOptions} data={chartData} className="chart" />
                </div>
            </section>

            <section className="results-section gradient-box">
                <h3>Detailed Breakdown</h3>
                <div className="table-container">
                    <table className="results-table">
                        <colgroup>
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '60%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Score</th>
                                <th>Vibe</th>
                                <th>Chat Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analysisArray.map((item, index) => (
                                <tr key={index}>
                                    <td>{formatTime(index, item.intervalLength ?? item.interval_length)}</td>
                                    <td>{item.excitementScore ?? item.excitement_score ?? 0}</td>
                                    <td>{item.vibe}</td>
                                    <td>{item.summary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <button onClick={onGoBack} className="submit-button back-button">
                Analyze Another VOD
            </button>
        </div>
    );
}

export default ResultsPage;