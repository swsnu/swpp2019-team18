import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#003333', '#6699CC', '#6699FF', '#9933CC',
  '#3388FE', '#33C49F', '#33BB28', '#338042', '#333333', '#3399CC', '#3399FF', '#3333CC', 
  '#6688FE', '#66C49F', '#66BB28', '#668042', '#663333', '#6699CC', '#6699FF', '#6633CC', 
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function BasePieChart(props) {
    return (
      <ResponsiveContainer width={props.width} minHeight={props.minHeight} aspect={props.aspect}>
      <PieChart>
        <Pie
          data={props.data}
          cx={props.cx}
          cy={props.cy}
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
