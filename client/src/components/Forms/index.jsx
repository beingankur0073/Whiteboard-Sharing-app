import './index.css'
import JoinRoomForm from './JoinRoomForm/index.jsx';
import CreateRoomForm from './CreateRoomForm/index.jsx';

const Forms=()=>{
    return (
        <div className="row h-100 pt-5">

            <div className="form-box  p-5 col-md-4 mt-5 mx-auto border border-primary rounded-2 d-flex flex-column align-items-center">
                <h1 className="text-primary fw-bold">Create Room</h1>
                <CreateRoomForm></CreateRoomForm>
            </div>

            <div className="form-box  p-5 col-md-4 mt-5 mx-auto border border-primary rounded-2 d-flex flex-column align-items-center">
                <h1 className="text-primary fw-bold">Join Room</h1>
                
                <JoinRoomForm></JoinRoomForm>
            </div>

        </div>
    )
}

export default Forms;