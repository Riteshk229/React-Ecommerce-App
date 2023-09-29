import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { id } = useParams();
    

    return (
        <>
            <h5> user </h5> <h1> {id} </h1>
        </>
    )
}
export default UserProfile;