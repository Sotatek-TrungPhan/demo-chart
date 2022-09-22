import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import data from '../../data';
interface IChartConfig {
  type: ChartType;
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

const chartStreamConfig: IChartConfig = {
  type: 'line',
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // labels: data2.map((item: Record<any, any>) => moment(item.x * 1000)),
    datasets: [
      {
        data: [],
        backgroundColor: '#1fc7d4',
        borderColor: 'rgb(75, 192, 192)',
        pointRadius: 0,
        capBezierPoints: false,
        tension: 0,
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
        type: 'realtime',
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Millisecond',
        },
        // time: {
        //   unit: 'second',
        // displayFormats: {
        //   second: 's',
        // },
        // },
        realtime: {
          // per-axis options
          duration: 20000, // data in the past 20000 ms will be displayed
          refresh: 1000, // onRefresh callback will be called every 1000 ms
          // delay: 1000, // delay of 1000 ms, so upcoming values are known before plotting a line
          pause: false, // chart is not paused
          ttl: undefined, // data will be automatically deleted as it disappears off the chart
          frameRate: 30, // data points are drawn 30 times every second
          // a callback to update datasets
          onRefresh: (chart: any) => {
            const index = Math.floor(Math.random() * data.length);
            chart.data.datasets.forEach((dataset: Record<any, any>) => {
              dataset.data.push({ x: Date.now(), y: parseInt(data[index].y.toString(), 0) });
            });
          },
        },
      },
    },

    plugins: {
      streaming: {
        duration: 20000,
      },
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
          labelTextColor: (_tooltipItem) => {
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

export default chartStreamConfig;
