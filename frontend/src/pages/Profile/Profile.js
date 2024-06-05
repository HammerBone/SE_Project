import Improf from "../../components/Image Profile/Improf"
import picture from '../../assets/Picture/home-page-picture.jpg' 
import './Profile.css'
const Profile = ()=>{
    return (
        <div className="profile">
            <Improf img = {picture} pp = {picture} 
            name = {'Justin'} date = {'LOL'} />
        </div>
    )
}

export default Profile