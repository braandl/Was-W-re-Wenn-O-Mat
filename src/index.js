import Chart from 'chart.js/auto'
import LineChart from '../dist/chart/LineChart';

export default class Bootstrap {

    constructor() {
        this.prepareChart();
    }


    prepareChart() {
        const ctx = document.getElementById('chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: LineChart.type,
            data: LineChart.data,
            options: LineChart.options
        });
    }

}


new Bootstrap();