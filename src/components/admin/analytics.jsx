import userCountChart from "./userCountChart.js"
import averageUserTimeChart from "./averageUserTimeChart.js"
import averageUserCountChart from "./averageUserCountChart.js"

export default function Analytics(){
    return (
        <div>
            {userCountChart()}
            {averageUserCountChart()}
            {averageUserTimeChart()}
        </div> 
    )
}