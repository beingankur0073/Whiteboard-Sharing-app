import { useRef, useState } from "react"
import "./index.css"
import WhiteBoard from "../../components/Whiteboard/index.jsx";

const RoomPage = ({user,socket,users}) => {
    const ctxRef=useRef(null);
    const canvasRef=useRef(null);

    const [tool,setTool]=useState("pencil");
    const [color,setColor]=useState("black");
    const [elements,setElements]=useState([])
    const [history,setHistory]=useState([]); // for undo and redo purposes
    const [openedUserTab,setOpenUserTab]=useState(false);


    const undo = () => {
        if (elements.length === 1) {
          setHistory((prev) => [...prev, elements[elements.length - 1]]);
          handleClearCanvas();
        } else {
          setElements((prev) => prev.slice(0, -1));
          setHistory((prev) => [...prev, elements[elements.length - 1]]);
        }
      }

      const redo=()=>{
        setElements((prev)=>[...prev,history[history.length-1]]);
        setHistory((prev)=>prev.slice(0,-1))
      }


    const handleClearCanvas=()=>{
        const canvas=canvasRef.current;
        const ctx=canvas.getContext("2d");
        ctx.fillRect="white";
        ctxRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
        setElements([]);
    }

  return (
      <div className="row">
        <button type="button" 
        className="btn btn-dark"
        style={{
          display:"block",
          position:"absolute",
          top:"5%",
          left:"5%",
          height:"40px",
          width:"100px",
        }}
        onClick={()=>setOpenUserTab(true)}
        >Users</button>
        {
          openedUserTab &&(
            <div 
            className="position-fixed top-0 h-100 text-white bg-dark"
            style={{width:"250px" ,left:"0%"}}
            >
              <button type="button" onClick={()=>setOpenUserTab(false)} className="btn btn-light btn-block w-100 mt-5">
                Close
              </button>
              <div className="w-100 mt-5 pt-5">
              {
                users.map((usr,index)=>(
                  <p key={index*999} className="my-2 w-100 text-center">
                    {usr.name}{user&& user.userId==usr.userId &&"(You)"}
                  </p>
                ))
              }
              </div>
            </div>
          )
        }


        <h1 className="text-center py-4">White board sharing app <span className="text-primary">[Users Online:{users.length}]</span></h1>

        {
          user?.presenter &&(
            <div className="col-md-10 gap-3 mx-auto px-5  mb-3 d-flex align-items-center justify-content-center">

            <div className="d-flex col-md-2 justify-content-center gap-1">

                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="pencil">Pencil</label>
                    <input type="radio" name="tool" className="mt-1"
                    checked={tool==="pencil"}
                    value="pencil" id="pencil" onChange={(e)=>setTool(e.target.value)} />
                </div>

                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="line">Line</label>
                    <input type="radio" className="mt-1" 
                    checked={tool==="line"}
                    name="tool" value="line" id="line" onChange={(e)=>setTool(e.target.value)} />
                </div>

                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="rect">Rectangle</label>
                    <input type="radio" className="mt-1" 
                    checked={tool==="rect"}
                    name="tool" value="rect" id="rect" onChange={(e)=>setTool(e.target.value)} />
                </div>

            </div>

            <div className="col-md-3 mx-auto">
                <div className="d-flex  align-items-center justify-content-center">
                    <label htmlFor="color">Select Color:</label>
                    <input type="color" id="color" className="mt-1 ms-3" value={color} onChange={(e)=>setColor(e.target.value)} />
                </div>
            </div>

             <div className="col-md-3 d-flex gap-2">
                <button 
                disabled={elements.length==0}
                className="btn btn-primary mt-1"
                onClick={()=>undo()}
                >Undo</button>
                <button 
                 disabled={history.length<1}
                className="btn btn-outline-primary mt-1"
                onClick={()=>redo()}
                >Redo</button>
             </div>

             <div className="col-md-2">
                <button className="btn btn-danger" onClick={handleClearCanvas}>Clear Canvas</button>
             </div>
         </div>
          )
        }
        
        

        <div className="col-md-10 mx-auto mt-4 canvas-box">
           
            <WhiteBoard
             canvasRef={canvasRef} 
             ctxRef={ctxRef} 
             elements={elements} 
             setElements={setElements} 
             tool={tool}
             color={color}
             user={user}
             socket={socket}
            ></WhiteBoard>

        </div>
      </div>
  )
}

export default RoomPage;