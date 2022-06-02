import React from 'react'
import style from './style.module.css'

const Billionare = ({item}) => {
  return (
    <div className={style.container}>
      <img src={item.image} alt={item.name} className={style.image}  />
      <h3 className={style.name}>{item.name}</h3>
      <h4 className={style.title}>{item.title}</h4>
      
    </div>
  )
}

export default Billionare