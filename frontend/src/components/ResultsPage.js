import { useState, useEffect, useMemo } from "react";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "react-chartjs-2";
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
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

function ResultsPage({ data, interval, onGoBack }) {
    const [displayScore, setDisplayScore] = useState(0);

    const { averageScore, chartData, chartOptions } = useMemo(() => {
        if (!data || data.length === 0) {
            return { averageScore: 0, chartData: {}, chartOptions: {} };
        }

        const totalScore = data.reduce((sum, item) => sum + item.excitementScore, 0);
        const avg = Math.round(totalScore / data.length);

        const labels = data.map((_, index) => `Interval ${index + 1}`);
        const scores = data.map(item => item.excitementScore);

        const preparedChartData = {
            labels,
            datasets: [{
                label: "Excitement Score",
                data: scores,
                borderColor: "#9146ff",
                backgroundColor: "rgba(145, 70, 255, 0.2)",
                fill: true,
                tension: 0.4,
            }],
        };

        const preparedChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: true, text: "Excitement Score Over Time", color: "#e5e5e5", font: { size: 18 } },
            },
            scales: {
                y: {
                    beginAtZero: true, max: 100,
                    ticks: { color: "#adadb8" },
                    grid: { color: "rgba(255, 255, 255, 0.1)" }
                },
                x: {
                    ticks: { color: "#adadb8" },
                    grid: { color: "rgba(255, 255, 255, 0.1)" }
                }
            }
        };

        return { averageScore: avg, chartData: preparedChartData, chartOptions: preparedChartOptions };
    }, [data]);

    useEffect(() => {
        if (averageScore === 0) return;
        const interval = setInterval(() => {
            setDisplayScore(prevScore => {
                const nextScore = prevScore + 1;
                if (nextScore >= averageScore) {
                    clearInterval(interval);
                    return averageScore;
                }
                return nextScore;
            });
        }, 5); // adjust this number for faster or slower

        return () => clearInterval(interval);
    }, [averageScore]);


    const getPathColor = (score) => {
        if (score < 40) return "#ef4444";
        if (score < 70) return "#facc15";
        return "#4ade80";
    };

    const formatTime = (intervalIndex, intervalSeconds) => {
        let totalSeconds = intervalIndex * intervalSeconds;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(totalSeconds).padStart(2, "0")}`;
    }

    return (
        <div className="main-content-wrapper results-page">
            <h2>Analysis Complete</h2>

            <section className="results-section gauge-section">
                <h3>Average Excitement Score</h3>
                <div style={{ width: "200px", margin: "auto" }}>
                    <CircularProgressbarWithChildren
                        value={displayScore}
                        styles={buildStyles({
                            pathColor: getPathColor(displayScore),
                            trailColor: "#28282d",
                            strokeLinecap: "butt",
                            pathTransitionDuration: 0.2,
                        })}
                    >
                        <strong style={{ fontSize: "2.5rem" }}>{displayScore}</strong>
                    </CircularProgressbarWithChildren>
                </div>
            </section>
            
            <section className="results-section chart-section">
                 <div className="chart-container">
                    <Line options={chartOptions} data={chartData} />
                </div>
            </section>

            <section className="results-section table-section">
                <h3>Detailed Breakdown</h3>
                <div className="table-container">
                    <table>
                        <colgroup>
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '60%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Score</th>
                                <th>Vibe</th>
                                <th>Chat Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{formatTime(index, interval)}</td>
                                    <td>{item.excitementScore}</td>
                                    <td>{item.vibe}</td>
                                    <td>{item.summary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <button onClick={onGoBack} className="submit-button back-button">
                Process Another VOD
            </button>
        </div>
    );
}

export default ResultsPage;