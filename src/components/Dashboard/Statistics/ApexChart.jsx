import Chart from "react-apexcharts";

const ApexChart = ({ statisticsInfo }) => {
  const { barChartData, barChartSeriesData } = statisticsInfo;

  const barOptions = {
    chart: {
      id: "bookings-bar",
    },
    xaxis: {
      categories: barChartData,
    },
    title: {
      text: "Bookings by Date",
      align: "center",
    },
    colors: ["#F43F5E"],
  };

  const barSeries = [
    {
      name: "Bookings",
      data: barChartSeriesData,
    },
  ];

  return (
    <div className="p-8 shadow-md rounded-lg space-y-8 bg-white">
      <div>
        <Chart
          options={barOptions}
          series={barSeries}
          type="bar"
          height="350"
        />
      </div>
    </div>
  );
};

export default ApexChart;
