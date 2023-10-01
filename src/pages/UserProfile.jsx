import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const UserProfile = () => {
    const { id } = useParams();
    const state = useSelector(state => state.products);
    console.log(state)

    return (
        <>
            <h5> user </h5> <h1> {id} </h1>
        </>
    )
}
export default UserProfile;