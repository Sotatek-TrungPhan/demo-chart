import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import moment from 'moment';
import data from '../data';
interface IChartConfig {
  type: ChartType;
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

const chartConfig: IChartConfig = {
  type: 'line',
  data: {
    labels: data.map((item: Record<any, any>) => moment(item.x * 1000)),
    datasets: [
      {
        data: data.map((item: Record<string, number | string>) => parseInt(item.y.toString(), 0)),
        backgroundColor: '#1fc7d4',
        borderColor: 'rgb(75, 192, 192)',
        pointRadius: 0,
        capBezierPoints: false,
        tension: 0.5,
        borderWidth: 2,
      },
    ],
  },

  options: {
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      //custom  yAxis
      y: {
        title: {
          display: true,
          text: 'USD',
        },
        ticks: {
          stepSize: 10000,
          callback: (_, tickValue: number): string => {
            if (tickValue === 0) {
              return '';
            }
            return tickValue * 10 + 'K';
          },
          padding: 25,
        },
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        max: 70000,
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Month',
        },
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM YYYY',
          },
        },
        ticks: {
          callback: (value) => {
            if (new Date(value).getFullYear() < new Date().getUTCFullYear()) {
              return new Date(value).getFullYear();
            }
            return moment(value).format('MMM');
          },
          padding: 25,
        },
      },
    },

    plugins: {
      tooltip: {
        enabled: true,
        textDirection: 'rtl',
        callbacks: {
          title: () => {
            return '';
          },
          label: (ctx) => {
            return ctx.formattedValue + 'K';
          },
          labelTextColor: (tooltipItem) => {
            return '#fff';
          },
        },
        animation: {
          duration: 0,
        },
        caretSize: 0,
        displayColors: false,
        backgroundColor: '#1fc7d4',
        caretPadding: 10,
        xAlign: (ctx, options) => {
          return 'center';
        },
        yAlign: (ctx, options) => {
          return 'bottom';
        },
      },
      legend: {
        display: false,
      },
    },
  },
};

export default chartConfig;
