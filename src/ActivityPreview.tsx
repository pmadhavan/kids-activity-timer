import { ActivityData } from "./Activity";

interface ActivityPreviewProps {
    activityPreview: ActivityData | undefined
}
const ActivityPreview = ({activityPreview}:ActivityPreviewProps) => {
    if(activityPreview){
        const {image, activity_name} = activityPreview ;
        return (
            <figure className="activity-preview-container">
                <img src={image} alt={activity_name}/>
                <caption> {activity_name}</caption>
            </figure>
        )
    }
}

export default ActivityPreview;