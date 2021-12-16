import Chart from 'chart.js/auto'
import LineChartHelper from '../dist/chart/LineChartHelper';

export default class Bootstrap {

    constructor() {
        this.prepareChart();

        this.buttons();
    }


    prepareChart() {
        const ctx = document.getElementById('chart').getContext('2d');
        this.myLineChart = new Chart(ctx, {
            type: LineChartHelper.type,
            data: LineChartHelper.data,
            options: LineChartHelper.options
        });
        
    }

    buttons() {
        document.getElementById('add').addEventListener('click', (ev) => {
            LineChartHelper.addDataPoint(this.myLineChart, '', document.getElementById('day').value, document.getElementById('incidence').value)
        })
    }

}


new Bootstrap();