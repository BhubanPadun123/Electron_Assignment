import React, { useState,useEffect } from "react";
import "./Timmer.css"

function Timmer(){
    
    const date = new Date()
    const [screenTime,setScreenTime] = useState(0)
    const [ss,setSS] = useState(date.getHours())
    const [mm,setMM] = useState(date.getMinutes())
    const [hh,setHH] = useState(date.getSeconds())
    const [idl,setIdl] = useState(true)
    const [isEdit,setIsEdit] = useState({
      editHH:false,
      editMM:false,
      editSS:false
    })
    const [isHover,setHover] = useState({
      isHH:false,
      isMM:false,
      isSS:false
    })
    const [timmerPosition,setTimmerPosition] = useState({
        left:null,
        top:null
    })
    useEffect(() => {
        // Start tracking the user's screen time
        if(!idl){
          const interval = setInterval(() => {
            setSS(ss + 1);
            if(ss > 59){
              setSS(0)
              setMM(mm +1);
            }
            if(mm > 59 ){
              setMM(0)
              setHH(hh + 1)
            }
            if(hh > 23){
              setHH(date.getHours())
            }
          }, 1000);
      
          return () => clearInterval(interval);
        }
      }, [ ss,idl ]);
      function handleDrag(e){
        const {clientX,clientY} = e
        setTimmerPosition({
            left:clientX,
            top:clientY
        })

        const timmerDiv = document.getElementsByClassName('main_div')
        timmerDiv[0].style.left = `${timmerPosition.left}px`
        timmerDiv[0].style.top = `${timmerPosition.top}px` 
      }
      function handleDragOver(e){
        const {clientX,clientY} = e
        
        // const timmerDiv = document.getElementsByClassName('main_div')
        // timmerDiv[0].style.left = `${timmerPosition.left}px`
        // timmerDiv[0].style.top = `${timmerPosition.top}px`      
      }
      function handleKeyDown(e){
        if(e.code === "Enter"){
          setIsEdit({
            editHH:false,
            editMM:isEdit.editMM,
            editSS:isEdit.editSS
          })
        }
      }

      function handleIdel(){
        setIdl(!idl)
        setIsEdit({
          editHH:!isEdit.editHH,
          editMM:!isEdit.editMM,
          editSS:!isEdit.editSS
        })
      }
    return(
        <div className="main_div" 
          draggable="true"
          onDrag={handleDrag}
          onDragOver={handleDragOver}
        >
            <div>
                <text>
                    Screen Time:
                </text>
            </div>
            <div className="time_div"> 
            {
              !isEdit.editHH ? 
              <span onClick={()=>{
                setIsEdit({
                  editHH:true,
                  editMM:isEdit.editMM,
                  editSS:isEdit.editSS
                })
              }}
              onMouseEnter={()=>{
                setHover({
                  isHH:true,
                  isMM:isHover.isMM,
                  isSS:isHover.isSS
                })
              }}
              onMouseLeave={()=>{
                setHover({
                  isHH:false,
                  isMM:isHover.isMM,
                  isSS:isHover.isSS
                })
              }}
              style={{
                backgroundColor:isHover.isHH ? "black":""
              }}
              >
                  {
                      hh
                  } 
              </span> : 
              <input value={hh >= 0 ? hh : 0} style={{width:"40px" }} onChange={(e)=>{
                setHH(e.target.value)
              }} 
              onKeyDown={handleKeyDown}
              />
            }
            {
              !isEdit.editMM ? 
                <span onClick={()=>{
                  setIsEdit({
                    editHH:isEdit.editHH,
                    editMM:true,
                    editSS:isEdit.editSS
                  })
                }}
                onMouseEnter={()=>{
                  setHover({
                    isHH:isHover.isHH,
                    isMM:true,
                    isSS:isHover.isSS
                  })
                }}
                onMouseLeave={()=>{
                  setHover({
                    isHH:isHover.isHH,
                    isMM:false,
                    isSS:isHover.isSS
                  })
                }}
                style={{
                  backgroundColor:isHover.isMM ? "black":""
                }}
                 >
                    {
                        mm >= 0 ? mm : mm / 60
                    } 
                </span> : 
                <input value={mm >= 0 ?  mm : 0} style={{width:"40px" }} 
                  onChange={(e)=>{
                    if(mm < 60){
                      setMM(e.target.value)
                    }
                  }}
                  onKeyDown={(e)=>{
                    if(e.code === 'Enter'){
                      setIsEdit({
                        editHH:isEdit.editHH,
                        editMM:false,
                        editSS:isEdit.editSS
                      })
                    }
                  }}
                />
            }
            {
              !isEdit.editSS ? 
                <span onClick={()=>{
                  setIsEdit({
                    editHH:isEdit.editHH,
                    editMM:isEdit.editMM,
                    editSS:true
                  })
                }} 
                onMouseEnter={()=>{
                  setHover({
                    isHH:isHover.isHH,
                    isMM:isHover.isMM,
                    isSS:true
                  })
                }}
                onMouseLeave={()=>{
                  setHover({
                    isHH:isHover.isHH,
                    isMM:isHover.isMM,
                    isSS:false
                  })
                }}
                style={{
                  backgroundColor:isHover.isSS ? "black":""
                }}
                >
                    {
                        ss
                    }
                </span> : 
                <input value={ss >= 0 ? ss : 0} style={{width:"40px" }} 
                   onChange={(e)=> {
                    if(ss < 60){
                      setSS(e.target.value)
                    }
                   }}
                   onKeyDown={(e)=> {
                    if(e.code === "Enter"){
                      setIsEdit({
                        editHH:isEdit.editHH,
                        editMM:isEdit.editMM,
                        editSS:false
                      })
                    }
                   }}
                />
            }
            </div>
            <button onClick={handleIdel} >{idl ? "START" : "IDLE" }</button>
        </div>
    )
}

export default Timmer