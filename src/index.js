import Chart from 'chart.js/auto'
import LineChartHelper from './chart/LineChartHelper';
import DataAdapter from './DataAdapter';
import Statistics from './stats/Statistics';

export default class Bootstrap {

    constructor() {
        this.prepareChart();
    }


    prepareChart() {

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

            document.getElementById('calc').addEventListener('click', () => {
                this.buttons(result, parseInt(document.getElementById('tag').value))
            })

            this.buttons(result, 100);
        })
        
    }

    buttons(result, day) {
        const stats = new Statistics();
        document.getElementById('total').innerHTML =  Math.round(stats.plausabilityOfInfection(result,day) * 10000) / 100
        document.getElementById('vax').innerHTML = Math.round(stats.plausabilityOfInfectionVaxinated(result,day) * 10000) / 100
    }

}


new Bootstrap();