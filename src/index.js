import Chart from 'chart.js/auto'
import zoomPlugin  from 'chartjs-plugin-zoom'
import LineChartHelper from './chart/LineChartHelper';
import DataAdapter from './DataAdapter';
import Statistics from './stats/Statistics';

export default class Bootstrap {

    constructor() {
        this.prepareChart();
    }


    prepareChart() {

        Chart.register(zoomPlugin);

        new Promise((resolve, reject) => {
            new DataAdapter().load(resolve, reject);
        }).then(result => {
            const ctx = document.getElementById('chart').getContext('2d');
            this.myLineChart = new Chart(ctx, {
                type: LineChartHelper.type,
                data: LineChartHelper.data(result, []),
                options: LineChartHelper.options
            });
            
            LineChartHelper.Chart = this.myLineChart;

            this.buttons(result, 100);
        })
        
    }

    buttons(result, day) {

        document.getElementById('calc').addEventListener('click', () => {
            const stats = new Statistics();
            document.getElementById('total').innerHTML =  Math.round(stats.plausabilityOfInfection(result, day) * 10000) / 100
        })

        const stats = new Statistics();
        document.getElementById('total').innerHTML =  Math.round(stats.plausabilityOfInfection(result, day) * 10000) / 100

        document.getElementById('inz_add').addEventListener('click', () => {
            const day = parseInt(document.getElementById('inz_day').value)
            const inz = parseInt(document.getElementById('inz').value)
            LineChartHelper.addDataPoint(LineChartHelper.Chart, day, day, inz)
        })
    }

}


new Bootstrap();