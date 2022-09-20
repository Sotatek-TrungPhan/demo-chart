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
import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import chartConfig from './Chart.config';
import 'chartjs-adapter-moment';
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
  TimeSeriesScale
);

const LineChart = ({}) => {
  const chartRef = useRef<any>(null);

  // useEffect(() => {
  //   const ctx = chartRef?.current?.getContext('2d');
  //   console.log(ctx);
  //   if (!!ctx) {
  //     new Chart(ctx, { ...chartConfig });
  //   }
  // }, []);

  return (
    <>
      <Line id="line-chart" width={'500px'} options={chartConfig.options} data={chartConfig.data} ref={chartRef}></Line>
    </>
  );
};

export default LineChart;
