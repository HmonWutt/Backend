import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function BARChart({
  description,
  count1,
  count2,
  name1,
  name2,
}) {
  const nameone = name1.charAt(0).toUpperCase() + name1.slice(1);
  const nametwo = name2.charAt(0).toUpperCase() + name2.slice(1);
  console.log(typeof name1);
  return (
    <Bar
      className="mt-5 col-md-8"
      style={{ height: "fit-content", width: "fit-content" }}
      data={{
        //labels: [taskNames[(taskIndex += 1)]],
        labels: [nameone, name2],

        datasets: [
          {
            title: description,
            label: description,
            data: [count1, count2],
            barPercentage: 0.5,
            categoryPercentage: 1,
            backgroundColor: ["#edff63", "#63ffd5"],
            color: "white",
            width: "100%",
            height: "100%",
          },
        ],
      }}
      options={{
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            label: {
              display: false,
            },
            layout: {
              padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 0,
              },
            },
          },
        },
        scales: {
          y: {
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false, // Remove x-axis ticks
            },
          },
          x: {
            display: true,
            grid: {
              display: false,
            },
            ticks: {
              display: true, // Remove x-axis ticks
            },
          },
        },
      }}
    />
  );
}
