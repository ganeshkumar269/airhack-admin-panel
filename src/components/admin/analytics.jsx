import userCountChart from "./userCountChart.js"
import averageUserTimeChart from "./averageUserTimeChart.js"
import averageUserCountChart from "./averageUserCountChart.js"

export default function Analytics(){
    return (
        <div>
            <h1>Get Cutting-Edge Analytics</h1>
            {userCountChart()}
            {averageUserCountChart()}
            {averageUserTimeChart()}
        </div> 
    )
}