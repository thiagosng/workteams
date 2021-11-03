import React from 'react'
import { useHistory } from 'react-router-dom'
import style from './style.module.scss'

const General22 = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/projects/register')
  }

  return (
    <div className={`${style.card}`}>
      <div className="row">
        <div
          className="col-lg-12"
          onClick={handleClick}
          onKeyDown={handleClick}
          role="button"
          tabIndex={0}
        >
          <div className={`${style.item} mb-xl-0 mb-3`}>
            <span className={style.icon}>
              <i className="fe fe-plus-square" />
            </span>
            <div className={style.desc}>
              <span className={style.title}>Criar novo projeto</span>
              <p>Clique aqui para criar um novo projeto</p>
            </div>
            <div className={`${style.line} bg-primary`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default General22
