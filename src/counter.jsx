import React from 'react'

function Counter() {
  let count =0;
 function increaseCount(){
  
     count = count+1
     console.log(count)
 }
  return (
    <>
    <h3>counter</h3>
    <button onClick={()=>{increaseCount()}}> clickme!</button>
    </>
  )
}

export default Counter