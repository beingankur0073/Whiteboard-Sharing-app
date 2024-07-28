import React, { useEffect, useLayoutEffect, useState } from 'react'
import rough from 'roughjs'
import { Socket } from 'socket.io-client';


const roughGenerator=rough.generator(); // for shapes

const WhiteBoard = ({canvasRef,ctxRef,elements,setElements,tool,color,user,socket}) => {
   const [isDrawing,setIsDrawing]=useState(false);
   const [img,setImg]=useState(null)

   useEffect(()=>{
      console.log("wb check",socket)
      socket.on("whiteBoardDataResponse",(data)=>{
         setImg(data.imgURL);
      })
   },[])
   // if not presenter then render the image
   if(!user?.presenter){
      return (
         <div className='border border-dark border-3 h-100 w-100 overflow-hidden'>
            <img src={img} alt="Realtime white board image shared by presenter" className='w-100 h-100'/>
         </div>
      )
   }


    useEffect(()=>{
        const canvas=canvasRef.current;
        const ctx=canvas.getContext("2d");
        canvas.height=window.innerHeight*2;
        canvas.width=window.innerWidth*2;

      ctx.strokeStyle=color;
      ctx.lineWidth=2;
      ctx.lineCap="round";

        ctxRef.current=ctx;
    },[])


    useEffect(()=>{
      ctxRef.current.strokeStyle=color;
    },[color])


    useLayoutEffect(()=>{
      const roughCanvas=rough.canvas(canvasRef.current);

      if(elements.length>0){
         ctxRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
      }

      elements.forEach(element => {
         if(element.type==="pencil"){
            roughCanvas.linearPath(
               element.path,{
               stroke:element.stroke,
               strokeWidth:5,
               roughness:0,
            });
         }
         else if(element.type==='line'){
            roughCanvas.draw(
               roughGenerator.line(
                  element.offsetX,
                  element.offsetY,
                  element.width,
                  element.height,
                  {
                     stroke:element.stroke,
                     strokeWidth:5,
                     roughness:0,
                  }
               ) )
         }
         else if(element.type==='rect'){
            roughCanvas.draw(
               roughGenerator.rectangle(
                  element.offsetX,
                  element.offsetY,
                  element.width,
                  element.height,
                  {
                     stroke:element.stroke,
                     strokeWidth:5,
                     roughness:0,
                  }
               ) )
         }

        
      });

      const canvasImage=canvasRef.current.toDataURL();
      socket.emit("whiteboardData",canvasImage);

    },[elements])




    const handleMouseDown=(e)=>{
      //  console.log("mouse down");
       const {offsetX,offsetY}=e.nativeEvent;

      if(tool=='pencil'){
         setElements((prevElements)=>[...prevElements,{
            type:"pencil", //
            offsetX,
            offsetY,
            path:[[offsetX,offsetY]],
            stroke:color,
         },
        ])

      }
      else if(tool=="line"){
         setElements((prevElements)=>[...prevElements,{
            type:"line", //
            offsetX,
            offsetY,
            width:offsetX,
            height:offsetY,
            stroke:color,
         },
        ])
      }
      else if(tool=="rect"){
         setElements((prevElements)=>[...prevElements,{
            type:"rect", //
            offsetX,
            offsetY,
            width:0,
            height:0,
            stroke:color,
         },
        ])
      }
       
       setIsDrawing(true);
    }   
    
    






    const handleMouseMove=(e)=>{
       const {offsetX,offsetY}=e.nativeEvent;
      
       if(isDrawing){   
        // console.log("mouse move")
          if(tool=='pencil'){
            const {path}=elements[elements.length-1];
            const newPath=[...path,[offsetX,offsetY]];
            setElements((prevElements)=>
               prevElements.map((ele,index)=>{
                  if(index===elements.length-1){
                     return {
                        ...ele,path:newPath
                     }
                  }
                  else {
                     return ele;
                  }
               })
            )    
         }
            else if(tool==='line'){
               setElements((prevElements)=>
                  prevElements.map((ele,index)=>{
                     if(index===elements.length-1){
                        return {
                           ...ele, // other things remain same
                           width:offsetX,
                           height:offsetY,
                        }
                     }
                     else {
                        return ele;
                     }
                  })
               )     
            }
            else if(tool==='rect'){
               setElements((prevElements)=>
                  prevElements.map((ele,index)=>{
                     if(index===elements.length-1){
                        return {
                           ...ele, // other things remain same
                           width:offsetX-ele.offsetX,
                           height:offsetY-ele.offsetY,
                        }
                     }
                     else {
                        return ele;
                     }
                  })
               )     
            }

            


         }

         

       }
       

    const handleMouseUp=(e)=>{
    //  console.log("mouse up");
       setIsDrawing(false);
    }    

  return (
    <div
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    className='h-100 w-100 border border-dark border-3 overflow-hidden'
    >
    
    <canvas 
    ref={canvasRef}
    >
    
    </canvas>
    
    </div>
  )
}

export default WhiteBoard