import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { Popup } from 'semantic-ui-react';
import {XYPlot, VerticalBarSeries, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';

class Stat extends Component {
    render(){
        const data = [
            { x: "10/31", y: 20 },
            { x: "11/1", y: 5 },
            { x: "2", y: 80 },
            { x: "3", y: 90 },
            { x: "4", y: 70 },
            { x: "5", y: 50 },
            { x: "6", y: 70 },
            { x: "7", y: 80 },
            { x: "8", y: 90 },
            { x: "9", y: 10 },
            { x: "10", y: 20 },
            { x: "11", y: 30 },
            { x: "12", y: 40 },
            { x: "13", y: 40 },
            { x: "14", y: 60 },
            { x: "15", y: 70 },
            { x: "16", y: 80 },
            { x: "17", y: 70 },
            { x: "18", y: 70 },
            { x: "19", y: 70 },
            { x: "20", y: 70 },
            { x: "21", y: 70 },
            { x: "22", y: 70 },
            { x: "23", y: 70 },
            { x: "24", y: 70 },
            { x: "25", y: 70 },
            { x: "26", y: 70 },
            { x: "27", y: 70 },
            { x: "28", y: 70 },
            { x: "29", y: 80 },
        ];

          return (
            <div className="Stat">
                <XYPlot width={800} height={400} xType="ordinal" yDomain={[0, 100]}>
                <HorizontalGridLines />
                <LineSeries
                data={data}
                // onNearestXY={(datapoint, event)=>{
                //     console.log(datapoint);
                //     return <Popup content="This is your diary"/>;
                // }}
                onSeriesClick={event=>{
                    
                }}
                />
                <XAxis />
                <YAxis />
            </XYPlot>
            </div>
          );
    }
}

export default Stat;