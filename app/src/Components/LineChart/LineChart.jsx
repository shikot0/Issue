import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
import './LineChart.css';

function LineChart({chartData, options}) {
    // console.log(chartData)
    return (
        <Line data={chartData} options={options}/>
        // <Line data={chartData} options={{animations}}/>
    )
}

export default LineChart;