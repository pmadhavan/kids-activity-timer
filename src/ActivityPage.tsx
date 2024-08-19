import { useEffect, useState } from "react";

interface ActivityComponentProps{
activities: ActivityData[];
}

interface ActivityData{
    "id": number;
    "activity_name": string,
    "duration": string,
    "start_time": string,
    "end_time": string,
    "image": string
}
const mockActivity = {
    id: 111,
    start_time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    duration: "2 hours",
    end_time: new Date(Date.now() + 60 * 1000).toISOString(),
    activity_name: "dummmy",
    image: ""
}

const Activity = ({activities}:ActivityComponentProps)=>{
    const [currentProgress, setCurrentProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [currentActivity, setCurrentActivity] = useState<ActivityData | undefined>();
  

    const calcProgress = (currTime:number, startTime:number, totalDuration:number)=>{
    return ((currTime - startTime)/ totalDuration)*100
    }
    const calcTimeLeft = (currTime:number, endTime:number) => {
        let minutes = 60*1000;
        return Math.floor((endTime - currTime)/minutes)
    }

    const findCurrActivity = (activities:ActivityData[], currentTime:number) => {
        let   currentActivity = activities.find((activity:ActivityData) =>{
            let {start_time, end_time} = activity
            let startTime = Date.parse(start_time);
            let endTime = Date.parse(end_time);
            return currentTime >= startTime && currentTime <= endTime
        }) || mockActivity;
        return currentActivity;
    }
    const updateCurrentActivityPage = (activities:ActivityData[], currentTime:number) => {
        const {start_time, end_time} = findCurrActivity(activities, currentTime) || {};
        const parsedStartTime = start_time ? Date.parse(start_time): 0;
        const parsedEndTime = end_time ? Date.parse(end_time): 0;
         let totalDuration = parsedEndTime - parsedStartTime;
 
         setCurrentProgress(calcProgress(currentTime, parsedStartTime, totalDuration));
         setTimeLeft(calcTimeLeft(currentTime, parsedEndTime));
         setCurrentActivity(findCurrActivity(activities, currentTime));
    }
     useEffect(() => {
      
        updateCurrentActivityPage(activities, Date.now())
        let intervalId = setInterval(() => {
            updateCurrentActivityPage(activities, Date.now())
        },3000)

        return () => {
            clearInterval(intervalId);
        }
     }, []);

    return (
        <div className={'main-activity-container'}>
            {currentActivity ? <> <div className="activity-title">
                <h2>{currentActivity.activity_name}</h2>
            </div>
            <div className="activity-image-container">
                <img src={currentActivity.image} alt={currentActivity.activity_name} width='100%' height="100%" />
            </div>
            <div className="activity-progress-container">
                <progress max={100} value={currentProgress}/>
                <div> Time Left: {timeLeft} minutes</div>
            </div>
            <div className="next-prev-activity-container">
            <div className="prev"> P</div>
            <div className="next"> N</div>
            </div> </>: <h2> Free Play!!</h2>}
            
        </div>
    )
}
;

const ActivityPage = ()=>{
    const data= [
        {
            "id": 101,
            "activity_name": "Yoga Session",
            "duration": "60 minutes",
            start_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 1* 60 * 1000).toISOString(),
            "image": "https://example.com/images/yoga_session.jpg"
        },
        {
            "id": 102,
            "activity_name": "Client Presentation",
            "duration": "90 minutes",
            start_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 2* 60 * 1000).toISOString(),
            "image": "https://example.com/images/client_presentation.jpg"
        },
        {
            "id": 103,
            "activity_name": "Coding Session",
            "duration": "2 hours",
            start_time: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 3* 60 * 1000).toISOString(),
            "image": "https://example.com/images/coding_session.jpg"
        },
        {
            "id": 104,
            "activity_name": "Evening Walk",
            "duration": "45 minutes",
            start_time: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 4* 60 * 1000).toISOString(),
            "image": "https://example.com/images/evening_walk.jpg"
        },
        {
            "id": 105,
            "activity_name": "Reading Time",
            "duration": "30 minutes",
            start_time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
            "image": "https://example.com/images/reading_time.jpg"
        }
    ];
    return (<Activity activities={data}/>)
}

export default ActivityPage