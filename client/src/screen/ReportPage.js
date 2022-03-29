import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export default function ReportPage() {
  const [weeklyReportData, setWeeklyReportData] = useState([]);
  const [weeklyReportLabels, setWeeklyReportLabels] = useState([]);
  const [data, setData] = useState({
    labels: ["1", "2"],
    datasets: [
      {
        label: "Peningkatan Penjualan",
        data: ["1", "2"],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    axios({ url: "http://localhost:3000/transaksi", method: "get" }).then(
      (data) => {
        let arr = [];

        // DUMMY.forEach((e) => { // untuk cek fungsionalitas
        data.data.forEach((e) => {
          let currentdate = new Date(e.createdAt);
          var oneJan = new Date(currentdate.getFullYear(), 0, 1);
          var numberOfDays = Math.floor(
            (currentdate - oneJan) / (24 * 60 * 60 * 1000)
          );
          var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

          arr.push({
            week: result,
            month: new Date(e.createdAt).getMonth(),
            year: new Date(e.createdAt).getFullYear(),
          });
        });

        let weekData = {};
        let monthData = {};
        let yearData = {};
        arr.forEach((e) => {
          if (weekData[`${e.week}-${e.year}`] == undefined) {
            weekData[`${e.week}-${e.year}`] = 0;
          }
          weekData[`${e.week}-${e.year}`] = weekData[`${e.week}-${e.year}`] + 1;

          if (monthData[`${e.month}-${e.year}`] == undefined) {
            monthData[`${e.month}-${e.year}`] = 0;
          }
          monthData[`${e.month}-${e.year}`] =
            monthData[`${e.month}-${e.year}`] + 1;

          if (yearData[`${e.year}`] == undefined) {
            yearData[`${e.year}`] = 0;
          }
          yearData[`${e.year}`] = yearData[`${e.year}`] + 1;
        });

        let weekLabel = [];
        let weekValue = [];
        for (var key in weekData) {
          weekValue.push(weekData[key]);
          weekLabel.push(key);
        }
        setData({
          labels: weekLabel,
          datasets: [
            {
              label: "Peningkatan Penjualan",
              data: weekValue,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      }
    );
  }, []);

  return (
    <div className="container">
      <Line options={options} data={data} />
    </div>
  );
}

const DUMMY = [
  {
    id: 3,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-07-29T09:33:20.099Z",
    updatedAt: "2022-03-29T09:33:20.099Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-07-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-07-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 4,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-07-29T09:33:21.149Z",
    updatedAt: "2022-03-29T09:33:21.149Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-07-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-07-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 14,
    PerusahaanId: 1,
    BarangId: 7,
    createdAt: "2022-07-29T09:58:22.906Z",
    updatedAt: "2022-03-29T09:58:22.906Z",
    Barang: {
      id: 7,
      name: "barang3",
      createdAt: "2022-07-29T08:49:51.642Z",
      updatedAt: "2022-03-29T08:49:51.642Z",
    },
    Perusahaan: {
      id: 1,
      name: "perusahaan1",
      createdAt: "2022-07-29T07:30:20.177Z",
      updatedAt: "2022-03-29T07:30:20.177Z",
    },
  },
  {
    id: 21,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-07-29T11:25:09.628Z",
    updatedAt: "2022-03-29T11:25:09.628Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-07-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-07-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 22,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-07-29T11:25:10.073Z",
    updatedAt: "2022-03-29T11:25:10.073Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-07-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-07-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 23,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-07-29T11:25:10.392Z",
    updatedAt: "2022-03-29T11:25:10.392Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-07-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-07-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 24,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-07-29T11:25:10.733Z",
    updatedAt: "2022-03-29T11:25:10.733Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-07-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-07-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 25,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-07-29T11:25:11.057Z",
    updatedAt: "2022-03-29T11:25:11.057Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-07-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 26,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:11.382Z",
    updatedAt: "2022-03-29T11:25:11.382Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-04-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-04-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 27,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-04-29T11:25:11.725Z",
    updatedAt: "2022-03-29T11:25:11.725Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-04-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-04-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 28,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-04-29T11:25:12.059Z",
    updatedAt: "2022-03-29T11:25:12.059Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-04-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-04-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 29,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-04-29T11:25:12.388Z",
    updatedAt: "2022-03-29T11:25:12.388Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-04-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-04-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 30,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-04-29T11:25:12.724Z",
    updatedAt: "2022-03-29T11:25:12.724Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 31,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:13.053Z",
    updatedAt: "2022-03-29T11:25:13.053Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 32,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:13.394Z",
    updatedAt: "2022-03-29T11:25:13.394Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 33,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:13.823Z",
    updatedAt: "2022-03-29T11:25:13.823Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 34,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:14.275Z",
    updatedAt: "2022-03-29T11:25:14.275Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 35,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:14.614Z",
    updatedAt: "2022-03-29T11:25:14.614Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 36,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:14.959Z",
    updatedAt: "2022-03-29T11:25:14.959Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 37,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:15.454Z",
    updatedAt: "2022-03-29T11:25:15.454Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 38,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:15.790Z",
    updatedAt: "2022-03-29T11:25:15.790Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 39,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:16.130Z",
    updatedAt: "2022-03-29T11:25:16.130Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
  {
    id: 40,
    PerusahaanId: 6,
    BarangId: 6,
    createdAt: "2022-03-29T11:25:16.453Z",
    updatedAt: "2022-03-29T11:25:16.453Z",
    Barang: {
      id: 6,
      name: "barang3",
      createdAt: "2022-03-29T08:49:51.087Z",
      updatedAt: "2022-03-29T08:49:51.087Z",
    },
    Perusahaan: {
      id: 6,
      name: "asdf",
      createdAt: "2022-03-29T09:28:02.751Z",
      updatedAt: "2022-03-29T09:28:02.751Z",
    },
  },
];
