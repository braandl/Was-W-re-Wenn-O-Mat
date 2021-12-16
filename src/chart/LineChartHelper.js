
import Chart from 'chartjs-plugin-dragdata'

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
                    pointHitRadius: 25
                }
            ]
        };
    }

    static get options() {
        return {
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
                    max: 600,
                    min: 0,
                    suggestedMin: 0,
                    suggestedMax: 600
                }
            }
        }
    }

    static plugins() {
        return Object.assign({}, LineChartHelper.dragPlugin(), LineChartHelper.titlePlugin())
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
                // onDragStart: (e, element) => {
                //     startingValue = LineChartHelper.Chart.data.datasets[element].data[element._index]
                // },
                // onDrag: (e, datasetIndex, index, value) => {
                //     // update the point left and right of clicked point
                //     // if the first point is clicked, only update the point to the right
                //     if (index === 0) {
                //         LineChartHelper.Chart.data.datasets[datasetIndex].data[index + 1] = value
                //         // if the last point is clicked, only update the point before
                //     } else if (index === (LineChartHelper.Chart.data.datasets[datasetIndex].data.length - 1)) {
                //         LineChartHelper.Chart.data.datasets[datasetIndex].data[index - 1] = value
                //     } else {
                //         // all other cases
                //         LineChartHelper.Chart.data.datasets[datasetIndex].data[index - 1] = value
                //         LineChartHelper.Chart.data.datasets[datasetIndex].data[index + 1] = value
                //     }
                //     LineChartHelper.Chart.update()
                // },
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

        chart.data.labels.splice(pos, 1, label)

        for (let chartId = 0; chartId < chart.data.datasets.length; chartId++)

            if (pos < chart.data.datasets[chartId].data.length) {
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