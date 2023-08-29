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
  const nameone =
    name1.charAt(0).toUpperCase() + name1.slice(1).replace(/-/g, " ");
  const nametwo =
    name2.charAt(0).toUpperCase() + name2.slice(1).replace(/-/g, " ");
  const updateddescription =
    description.charAt(0).toUpperCase() +
    description.slice(1).replace(/-/g, " ");

  return (
    <Bar
      id="barchart"
      className="mt-5"
      style={{ height: "fit-content", width: "fit-content", display: "flex" }}
      data={{
        //labels: [taskNames[(taskIndex += 1)]],
        labels: [nameone, nametwo],

        datasets: [
          {
            title: updateddescription,
            //label: updateddescription,
            data: [count1, count2],
            barPercentage: 0.5,
            categoryPercentage: 1,
            backgroundColor: ["#edff63", "#63ffd5"],
            color: "white",
          },
        ],
      }}
      options={{
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: updateddescription,
              font: {
                size: 16,
                family: "vazir",
                color: "red",
              },
            },
            legend: {
              display: false,
            },

            label: {
              display: false,
            },
            layout: {
              padding: {
                left: 0,
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
            grid: {
              display: false,
            },
            ticks: {
              display: true,
              font: {
                size: 10,
                color: "",
              },
              // Remove x-axis ticks
            },
          },
        },
      }}
    />
  );
}
