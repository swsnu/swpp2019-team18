import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, 
          Tooltip, Legend, Cell } from 'recharts';
import './BarChart.css'
import { Button } from 'semantic-ui-react';


function BaseBarChart(props){
  let data = props.data;
  if(props.data !== undefined){
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
        <ResponsiveContainer width='99%' minHeight={ 275 }>
        <ComposedChart className={props.className}
          layout="vertical"   
          id="barChart" data={data} 
          margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis domain={[0,100]} type="number" />
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


// const getIntroOfPage = (label) => {
//   if (label === 'Page A') {
//     return "Page A is about men's clothing";
//   } if (label === 'Page B') {
//     return "Page B is about women's dress";
//   } if (label === 'Page C') {
//     return "Page C is about women's bag";
//   } if (label === 'Page D') {
//     return 'Page D is about household goods';
//   } if (label === 'Page E') {
//     return 'Page E is about food';
//   } if (label === 'Page F') {
//     return 'Page F is about baby food';
//   }
//   return "Simple Description";
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <hr className="horizontal"/>
//         <p className="intro">{getIntroOfPage(label)}</p>
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     );
//   }

//   return null;
// };
