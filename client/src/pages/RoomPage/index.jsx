import { useRef, useState } from "react"
import "./index.css"
import WhiteBoard from "../../components/Whiteboard/index.jsx";

const RoomPage = () => {
    const ctxRef=useRef(null);
    const canvasRef=useRef(null);

    const [tool,setTool]=useState("pencil");
    const [color,setColor]=useState("black");
    const [elements,setElements]=useState([])

  return (
      <div className="row">
        <h1 className="text-center py-4">White board sharing app <span className="text-primary">[Users Online:0]</span></h1>
        
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
                <button className="btn btn-primary mt-1">Undo</button>
                <button className="btn btn-outline-primary mt-1">Redo</button>
             </div>

             <div className="col-md-2">
                <button className="btn btn-danger">Clear Canvas</button>
             </div>
         </div>

        <div className="col-md-10 mx-auto mt-4 canvas-box">
            <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements}></WhiteBoard>
        </div>
      </div>
  )
}

export default RoomPage;