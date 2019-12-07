// import React from 'react';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import './BaseLineChart.css'

// function BaseLineChart(props){

//   return (
//       <div className="lineStat">
//       <ResponsiveContainer width="99%" minHeight={350}>
//       <LineChart
//           margin={{
//             top: 5, right: 30, left: 20, bottom: 5,
//           }}
//         >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="day" className="xAxis" tick={{ fontFamily : "Arial" }}/>
//         <YAxis domain={[0, 100]}/>
//         <Tooltip />
//         <Legend />
//         <Line connectNulls  data={props.data} dataKey="prev_score" name="prev_score" key="prev_score" stroke="#8884d8" />
//         {/* <Line connectNulls  data={props.data} dataKey="cur_score" name="cur_score" key="cur_score" stroke="#233332" /> */}
//       </LineChart>
//       </ResponsiveContainer>
//       </div>
//   )
// }

// export default BaseLineChart; 
