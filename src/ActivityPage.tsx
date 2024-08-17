
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
const Activity = ({activities}:ActivityComponentProps)=>{
    let currentActivity: ActivityData|undefined;
    currentActivity = activities.find((activity:ActivityData) =>{
        let {start_time, end_time, id} = activity
        let currentTime = Date.now();
        let startTime = Date.parse(start_time);
        let endTime = Date.parse(end_time);

        const mockActivity = {
            id: 111,
            start_time:new Date(new Date(currentTime).getTime() - 30 * 60 * 1000),
            end_time:new Date(new Date(currentTime).getTime() + 30 * 60 * 1000),
            activity_name: "dummmy"
        }
        console.log(currentTime >= startTime && currentTime <= endTime ? activity: mockActivity)
        return currentTime >= startTime && currentTime <= endTime ? activity: mockActivity
    })
    
    return (
        <div className={'main-activity-container'}>
            {currentActivity ? <> <div className="activity-title">
                <h2>{currentActivity.activity_name}</h2>
            </div>
            <div className="activity-image-container">
                <img src={currentActivity.image} alt={currentActivity.activity_name} width='100%' height="100%" />
            </div>
            <div className="activity-progress-container">
                <progress max={100} value={25}/>
                <div> Time Left: {'remainingTime'}</div>
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
            "start_time": "2024-08-16T07:00:00",
            "end_time": "2024-08-16T08:00:00",
            "image": "https://example.com/images/yoga_session.jpg"
        },
        {
            "id": 102,
            "activity_name": "Client Presentation",
            "duration": "90 minutes",
            "start_time": "2024-08-16T10:00:00",
            "end_time": "2024-08-16T11:30:00",
            "image": "https://example.com/images/client_presentation.jpg"
        },
        {
            "id": 103,
            "activity_name": "Coding Session",
            "duration": "2 hours",
            "start_time": "2024-08-16T12:00:00",
            "end_time": "2024-08-16T15:00:00",
            "image": "https://example.com/images/coding_session.jpg"
        },
        {
            "id": 104,
            "activity_name": "Evening Walk",
            "duration": "45 minutes",
            "start_time": "2024-08-16T18:30:00",
            "end_time": "2024-08-16T19:15:00",
            "image": "https://example.com/images/evening_walk.jpg"
        },
        {
            "id": 105,
            "activity_name": "Reading Time",
            "duration": "30 minutes",
            "start_time": "2024-08-16T20:00:00",
            "end_time": "2024-08-16T20:30:00",
            "image": "https://example.com/images/reading_time.jpg"
        }
    ];
    return (<Activity activities={data}/>)
}

export default ActivityPage