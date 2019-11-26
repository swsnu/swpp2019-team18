import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './Stat.css'

function BaseLineChart(props){
    return (
        <div className="stat">
        <LineChart id="lineChart" width={800} height={400} data={props.data} margin={{ top: 50, right: 20, bottom: 50, left: 100 }}>
        <Line type="monotone" dataKey="score" stroke="#8884d8" onClick={(event) => console.log(event)}/>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip stroke="#ccc"/>
      </LineChart>
      </div>
    );
};

export default BaseLineChart; 

