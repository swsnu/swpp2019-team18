import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, 
          Tooltip, Legend, Cell } from 'recharts';
import './BarChart.css'
import { Button } from 'semantic-ui-react';


function BaseBarChart(props){
  let data = props.data;
  if(props.data !== []){
    const buffer = props.data.concat().sort((a, b) => a.score < b.score ? 1 : -1);
    let top3Idx = 2;
    if(buffer.length < 3) {
      top3Idx = buffer.length - 1;
    }
    if(props.dataKey !== "friend_name"){
      data = props.data.map(function(entry, index, array){
        if(entry.score >= buffer[top3Idx].score){
          return {...entry, fill : "#FF5E36", fillOpacity : 0.9}
        }
        return {...entry, fill : "#FFBFAF", fillOpacity : 0.3}
      } )
    }
    else{
      data = props.data.map(function(entry, index, array){
        if(entry.score >= buffer[top3Idx].score){
          return {...entry, fill : "#FFEB2F", fillOpacity : 0.9}
        }
        return {...entry, fill : "#FFFBD1", fillOpacity : 1.0}
      } )
    }
  }

    return (
        <ResponsiveContainer width={props.width} minHeight={ props.minHeight }>
        <ComposedChart className={props.className}
          layout="vertical"   
          id="barChart" data={data} 
          margin={{top: 0, right: 0, left: 50, bottom: 0}}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis hide={true} domain={[0, 100]} type="number"/>
        <YAxis dataKey={props.dataKey} type="category" />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="score" fill={"#3399FF"} barSize={30}>

        {/* <Bar dataKey="score" fill={"#3399FF"} barSize={30} label={{position : 'right', fontSize : '20px', fontFamily : "Arial" }}> */}
        </Bar>        
        </ComposedChart>
        </ResponsiveContainer>
    );
}

export default BaseBarChart;