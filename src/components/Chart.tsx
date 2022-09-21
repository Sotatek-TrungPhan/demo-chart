/* eslint-disable react/react-in-jsx-scope */
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import chartConfig from './Chart.config';
//register
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
  {
    id: 'line-chart',
    afterDraw: (chart) => {
      const { ctx, chartArea, tooltip } = chart;
      const isActive = chart.getActiveElements();
      const topY = chartArea.top;
      const bottomY = chartArea.bottom;
      if (isActive.length) {
        //get point
        const point = isActive[0].element.x;
        //draw
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(point, topY);
        ctx.lineTo(point, bottomY);
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgb(75, 192, 192)';

        ctx.stroke();

        ctx.fillStyle = '#1fc7d4';
        ctx.fillRect(point - 50, bottomY + 10, 100, 20);
        ctx.restore();

        ctx.fillStyle = '#000';
        const day = tooltip && moment(tooltip.dataPoints[0].label).format('L');
        ctx.fillText(`${day}`, point, bottomY + 25);
        ctx.textAlign = 'center';
      }
    },
  }
);

const LineChart = ({}) => {
  return (
    <>
      <Line id="line-chart" width={'500px'} options={chartConfig.options} data={chartConfig.data} />
    </>
  );
};

export default LineChart;
