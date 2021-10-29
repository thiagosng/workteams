import React from 'react'
import style from './style.module.scss'

const General22 = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={`${style.item} mb-xl-0 mb-3`}>
          <span className={style.icon}>
            <i className="fe fe-home" />
          </span>
          <div className={style.desc}>
            <span className={style.title}>Seus Projetos</span>
            <p>Pagina de exibição dos projetos</p>
          </div>
          <div className={`${style.line} bg-primary`} />
        </div>
      </div>
    </div>
  )
}

export default General22
