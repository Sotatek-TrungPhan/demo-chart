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
import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import chartConfig from './Chart.config';
import moment from 'moment';
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

        //draw card
        ctx.save();
        //move to end of chart-area
        ctx.beginPath();
        ctx.moveTo(point, topY);
        ctx.fillStyle = '#fab';
        ctx.fillRect(point - 50, bottomY, 100, 20);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        // ctx.moveTo(point, bottomY);
        ctx.fillStyle = '#000';
        const day = tooltip && moment(tooltip.dataPoints[0].label).format('L');
        ctx.fillText(`${day}`, point, bottomY + 15);
        ctx.textAlign = 'center';
      }
    },
  }
);

const LineChart = ({}) => {
  const chartRef = useRef<any>(null);

  return (
    <>
      <Line id="line-chart" width={'500px'} options={chartConfig.options} data={chartConfig.data} ref={chartRef}></Line>
    </>
  );
};

export default LineChart;
