import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
export const LineChart = () => {
    const [options, setOptions] = useState({
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
        colors: ['#87E8DE']
    });

    const [series, setSeries] = useState([{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]);
    const updateXAxisCategories = () => {
        setOptions(prevOptions => ({
            ...prevOptions,
            xaxis: {
                ...prevOptions.xaxis,
                categories: ['X1', 'X2', 'X3']
            }
        }));
    };

    return (
        <div className='bg-white p-2 rounded-1 border-secondary-subtle border'>
          
              <Chart options={options} series={series} type="bar" height={350} />
            {/* width={500} height={320} */}
           
        </div>

    );
};

export const CurveChart = () => {

    // for curve chart
    const [chartData, setChartData] = useState({
        series: [{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
          colors: ['#1890FF', '#0050B3']
        }
      });
      return (
        <div className='bg-white p-2 rounded-1 border-secondary-subtle border'>
             <ReactApexChart options={chartData.options} series={chartData.series} type="area" 
             height={350} 
             />
           
        </div>

    );
}
