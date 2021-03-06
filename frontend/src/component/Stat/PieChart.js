import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';

const COLORS = [
  "#fabebe", '#ffd8b1', "#fffac8", "#aaffc3", "#e6beff", "#800000", 
  "#ffe119", "#bfef45", "#3cb44b", "#42d4f4", "#4363d8", "#911eb4",
  "#f032e6", "#a9a9a9","#9A6324", "#808000", "#469990", "#000075",
  "#000000", "#e6194B", "#f58231",
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
