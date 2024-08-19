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
        let minutes = 1000;
        return Math.ceil((endTime - currTime)/minutes)
    }

    const findCurrActivity = (activities:ActivityData[], currentTime:number) => {
        let   currentActivity = activities.find((activity:ActivityData) =>{
            let {start_time, end_time} = activity
            let startTime = Date.parse(start_time);
            let endTime = Date.parse(end_time);
            return currentTime >= startTime && currentTime <= endTime
        }) || undefined;
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
        },1000)

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
                <div> Time Left: {timeLeft} second(s)</div>
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
            "image": "https://media.istockphoto.com/id/1554791030/photo/asian-chinese-woman-practicing-yoga-stretching-in-public-park-weekend-morning.webp?b=1&s=612x612&w=0&k=20&c=AJVGKN7CIicMfDWMMZ_k4ac8gA1QQR4i51Z90HdS1ZI="
        },
        {
            "id": 102,
            "activity_name": "Book Reading",
            "duration": "90 minutes",
            start_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 2* 60 * 1000).toISOString(),
            "image": "https://media.istockphoto.com/id/1805651010/photo/children-visiting-the-library.webp?b=1&s=612x612&w=0&k=20&c=5IWS03VsXvxFkddy4A6pbqKMJf8sOjPkr8YDilOMXNM="
        },
        {
            "id": 103,
            "activity_name": "Lego Session",
            "duration": "2 hours",
            start_time: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 3* 60 * 1000).toISOString(),
            "image": "https://media.istockphoto.com/id/606738068/photo/closeup-of-asian-kids-hand-playing-plastic-blocks-puzzle.webp?b=1&s=612x612&w=0&k=20&c=0mXAgl_eFcT5hvyvVwNX2ur3tmEwN4I4Hfk2rXJp740="
        },
        {
            "id": 104,
            "activity_name": "Outdoor Play",
            "duration": "45 minutes",
            start_time: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 4* 60 * 1000).toISOString(),
            "image": "https://media.istockphoto.com/id/473313240/photo/children-playing-in-the-park-at-playground-and-communicating.webp?b=1&s=612x612&w=0&k=20&c=utdaIERjZ-pdiD7UqEFZKU7c6_q70vhJY3TFCHjnfEE="
        },
        {
            "id": 105,
            "activity_name": "Crafts",
            "duration": "30 minutes",
            start_time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            end_time: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
            "image": "https://media.istockphoto.com/id/2065808900/photo/girl-cutting-pieces-of-paper-and-smiling-at-home.webp?b=1&s=612x612&w=0&k=20&c=EXri4mgPWvffkEzcdW83LVmCq0v3a7S9dcQRRaumXyE="
        }
    ];
    return (<Activity activities={data}/>)
}

export default ActivityPage