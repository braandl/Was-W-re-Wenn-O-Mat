export default class Spread {

    constructor(maxspread = 100, intensity = 0.8, spreadfunction = Spread.default) {
        this.maxspread = maxspread
        this.intensity = intensity;
        this.function = spreadfunction
    }

    apply(chart, datasetIndex, index, value, org) {

        const diff = Math.abs(value - org)
        const sign = value - org > 0 ? 1 : -1;
        const spread = Math.round(Math.max(this.maxspread , this.maxspread * ( 1 - (1 / (Math.max(1, diff / 50))))))

        for (let i = 0; i < spread / 2; i++) {
            chart.data.datasets[datasetIndex].data[index - i] = this.function(i, chart.data.datasets[datasetIndex].data[index - i], diff, this.intensity, sign)
            if (i > 0)
                chart.data.datasets[datasetIndex].data[index + i] = this.function(i, chart.data.datasets[datasetIndex].data[index + i], diff, this.intensity, sign)
        }

        chart.update();
    }

    static get default() {
        return (distance, value, diff, intensity, sign) => { 
            const normDistance = distance == 1 ? 0.6 : (1 / distance);
            const multiplier = (distance < 1 ? 0 : - (Math.log(1 - normDistance) * intensity));
            const val = diff == 0 ? value : sign > 0 ? value + diff * multiplier : value - diff * multiplier
            return isNaN(value) || value == undefined ? 0: val;
        }
    }
}