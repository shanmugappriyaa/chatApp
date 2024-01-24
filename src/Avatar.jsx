import React from 'react'

function Avatar(userId,userName,online) {
  return (
    <div className='avatar'>
        <div className='ava-icon'>{userName[0]}</div>
        {online && (
          <div className='online-green'></div>
        )}
        {!online && (
            <div className='online-gray'></div> 
          )
        }
    </div>
  )
}

export default Avatar