const users=[];


// add a user to the list

const addUser=({name,userId,roomId,host,presenter})=>{
    const user={name,userId,roomId,host,presenter};
    users.push(user);
    return users.filter((user)=>user.roomId==roomId);
}


// remove a user form the list

const removeUser=(id)=>{
    const index=users.findIndex(user=>user.userId==id);
    if(index!=-1){
        return users.splice(index,1)[0];
    }
}

const getUser=(id)=>{
    return users.find((user)=>user.userId==id);
}


const getUsersInRoom=(id)=>{
    return users.filter((user)=>user.roomId==id);
}


export {addUser,removeUser,getUser,getUsersInRoom}

