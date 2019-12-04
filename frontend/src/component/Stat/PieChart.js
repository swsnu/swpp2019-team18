import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  console.log(index);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function BasePieChart(props) {
    return (
      <ResponsiveContainer width='99%' minHeight={ 250 }>
      <PieChart>
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          label={renderCustomizedLabel}
          margin={{top: 0, right: 0, left: 0, bottom: 0}}
          fill="#8884d8"
          dataKey="value"
        >
          {
            props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Legend/>
        <Tooltip formatter={(value, name, props) =>  value + "%" }/>
      </PieChart>
      
      </ResponsiveContainer>
    );
}
export default BasePieChart;
