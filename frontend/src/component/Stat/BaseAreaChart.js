import React from 'react';
import { ResponsiveContainer, Legend, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import './BaseAreaChart.css'

function onClickHandler(props, event){
  props.history.push('/diary');
}

function renderLegendText(value, entry) {
  let color = "";
  let changeValue = value;
  if(value === "cur_score"){
    changeValue = "this month";
    color = "#E968B1";
  }
  else{
    color = "#6879E9";
    changeValue = "prev month"
  }
  return <span style={{ color }}>{changeValue}</span>;
}

function BaseAreaChart(props){

  return (
      <div className="areaChart">
        <ResponsiveContainer width="99%" minHeight={350}>
        <AreaChart 
        data={props.data} 
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }} 
        onClick={(event) => onClickHandler(props, event)}>
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E968B1" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#E968B1" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="colorGray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6879E9" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#6879E9" stopOpacity={0.2}/>
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" className="xAxis" tick={{ fontFamily : "Arial" }}/>
        <YAxis domain={[0, 100]}/>
        <Tooltip />
        <Area connectNulls type="monotone" dataKey="prev_score" stroke="#6879E9" fill="url(#colorGray)" fillOpacity={1} />
        <Area connectNulls type="monotone" dataKey="cur_score" stroke="#E968B1" fill="url(#colorUv)" fillOpacity={1} legendType="circle"/>
        <Legend iconType="plainline" formatter={renderLegendText}/>
        </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BaseAreaChart;


