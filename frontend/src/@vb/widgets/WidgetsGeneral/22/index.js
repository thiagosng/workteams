import React from 'react'
import style from './style.module.scss'

const General22 = () => {
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className={`${style.item} mb-xl-0 mb-3`}>
          <span className={style.icon}>
            <i className="fe fe-home" />
          </span>
          <div className={style.desc}>
            <span className={style.title}>Block Title</span>
            <p>Waiting for review</p>
          </div>
          <div className={`${style.line} bg-success`} />
        </div>
      </div>
    </div>
  )
}

export default General22
