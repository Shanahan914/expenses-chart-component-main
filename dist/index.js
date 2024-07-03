const spendChart = document.getElementById("mychart");
const redBar = "hsl(10, 79%, 65%)";
const cyanBar = "hsl(186, 34%, 60%)";
const hoverRed = "hsla(10, 79%, 65%, 0.8)";
const hoverCyan = "hsla(186, 34%, 60%, 0.8)";

//data

let chartData = [
  {
    day: "mon",
    amount: 17.45,
  },
  {
    day: "tue",
    amount: 34.91,
  },
  {
    day: "wed",
    amount: 52.36,
  },
  {
    day: "thu",
    amount: 31.07,
  },
  {
    day: "fri",
    amount: 23.39,
  },
  {
    day: "sat",
    amount: 43.28,
  },
  {
    day: "sun",
    amount: 25.48,
  },
];

//preparing the background color array

let bgColors = (data) => {
  let colorArray = [];
  for (i = 0; i < data.length; i++) {
    colorArray.push(data[i].amount);
  }
  let maxAmount = colorArray.reduce((a, b) => {
    if (a >= b) {
      return a;
    } else {
      return b;
    }
  });
  let hoverArray = [];
  for (i = 0; i < data.length; i++) {
    if (colorArray[i] == maxAmount) {
      colorArray[i] = cyanBar;
      hoverArray[i] = hoverCyan;
    } else {
      colorArray[i] = redBar;
      hoverArray[i] = hoverRed;
    }
  }

  return [colorArray, hoverArray, maxAmount];
};

let [colorArray, hoverArray, maxVal] = bgColors(chartData);

maxVal = maxVal * 1.3;

//tooltip position

Chart.Tooltip.positioners.left = function (items) {
  const pos = Chart.Tooltip.positioners.average(items);

  if (pos === false) {
    return false;
  }
  const chart = this.chart;
  return {
    x: pos.x,
    y: pos.y - 45,
  };
};

//producing the chart

new Chart(spendChart, {
  type: "bar",
  data: {
    labels: chartData.map((row) => row.day),
    datasets: [
      {
        label: "",
        data: chartData.map((row) => row.amount),
        borderWidth: 1,
        backgroundColor: colorArray,
        hoverBackgroundColor: hoverArray,
      },
    ],
  },
  options: {
    response: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        max: maxVal,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: () => {
            return "";
          },
          title: (tooltipItem) => {
            return "$" + tooltipItem[0].raw;
          },
        },
        position: "left",
        yAlign: "top",
        caretSize: 0,
      },
    },
  },
});
