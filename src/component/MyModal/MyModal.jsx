import React from 'react';
import stylModul from './MyModel.module.css'

function MyModal ({children, visible, setVisible}) {

  const rootClasses = [stylModul.myModal];
  if(visible){
    rootClasses.push(stylModul.active)
  }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={stylModul.myModalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default MyModal