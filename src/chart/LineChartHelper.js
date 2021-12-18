
import Chart from 'chartjs-plugin-dragdata'
import Spread from './Spread';

export default class LineChartHelper {

    static get type() {
        return 'line'
    }
    
    static labels(cnt) {
        const labels = [];
        for (let i = 1; i <= cnt; ++i) {
            labels.push(i.toString());
        }

        return labels
    }

    static current(chart) {
        LineChartHelper.Chart = chart;
    }

    static data(incidencies, vaxxed) {
        return {
            labels: LineChartHelper.labels(incidencies.length),
            datasets: [
                {
                    data: incidencies,
                    borderColor: '#ff6600',
                    fillColor: '#ff0000',
                    fill: true,
                    tension: .4,
                    borderWidth: 1,
                    pointHitRadius: 25,
                    label: '7-Tage Inzidenz pro 100k Einwohner',
                }
            ]
        };
    }

    static get options() {
        const options = {
            responsive: false,
            plugins: LineChartHelper.plugins(),
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Tag'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Inzidenz'
                    },
                    max: 2000,
                    min: 0,
                    suggestedMin: 0,
                    suggestedMax: 600
                }
            }
        }
        console.log(options)
        return options;
    }

    static plugins() {
        return Object.assign({}, LineChartHelper.dragPlugin(), LineChartHelper.titlePlugin(), LineChartHelper.zoomPlugin())
    }

    static zoomPlugin() {
        return {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                },
                drag: {
                    enabled: true,
                    mode: 'x'
                },
                pan: {
                    enabled: true,
                    mode: 'x'
                },
            }
        }
    }

    static titlePlugin() {
        return {
            title: {
                display: true,
                text: 'Was-Wäre-Wenn-O-Mat'
            }
        }
    }

    static dragPlugin() {
        var startingValue = 0;
        return {
            dragData: {
                round: 0, // rounds the values to n decimal places 
                // in this case 1, e.g 0.1234 => 0.1)
                showTooltip: true, // show the tooltip while dragging [default = true]
                onDragStart: (e, datasetIndex, index, value) => {
                    startingValue = LineChartHelper.Chart.data.datasets[datasetIndex].data[index]
                },
                onDragEnd: (e, datasetIndex, index, value) => {
                    const spread = parseInt(document.getElementById('spread').value) ?? 100;
                    const intensity = parseFloat(document.getElementById('intensity').value) ?? 0.8;
                    new Spread(spread, intensity).apply(LineChartHelper.Chart, datasetIndex, index, value, startingValue)

                }
            }
        }
    }

    /**
     * 
     * @param {Chart} chart Chart.js instance
     * @param {String} label Label for the Field to Add
     * @param {Int} pos Position in Dataset
     * @param {Any} data Date to put
     */
    static addDataPoint(chart, label, pos, data) {

        const spread = parseInt(document.getElementById('spread').value) ?? 100;
        const intensity = parseFloat(document.getElementById('intensity').value) ?? 0.8;

        chart.data.labels.splice(pos, 1, label)

        for (let chartId = 0; chartId < chart.data.datasets.length; chartId++) {

            if (pos < chart.data.datasets[chartId].data.length) {
                new Spread(spread, intensity).apply(chart, chartId, pos, data, chart.data.datasets[chartId].data[pos] ?? 0)

                chart.data.datasets[chartId].data[pos] = parseInt(data);
            }
            else {
                for (let i = chart.data.datasets[chartId].data.length; i < pos; i++) {
                    chart.data.datasets[chartId].data.push(0)
                }

                chart.data.datasets[chartId].data.push(parseInt(data))
            }

            if (pos < chart.data.labels.length) {
                chart.data.labels[pos] = pos;
            }
            else {

                chart.data.labels[chart.data.labels.length - 1] = chart.data.labels.length
                for (let i = chart.data.labels.length + 1; i < pos; i++) {
                    chart.data.labels.push(i)
                }

                chart.data.labels.push(parseInt(pos))
            }

        }


        chart.update();
    }

    static undo(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }
}