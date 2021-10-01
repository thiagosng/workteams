import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

const Header = ({ data }) => {
  return (
    <div className="row">
      <div className="col-11">
        <h5 className="mb-0">
          <strong>{data.title}</strong>
        </h5>
      </div>
      <div className="col-1">
        <Link to={`${data.route}`} className={`btn btn-success ${style.btnWithAddon}`}>
          <span className={`${style.btnAddon}`}>
            <i className={`${style.btnAddonIcon} fe fe-plus-circle`} />
          </span>
          Cadastrar
        </Link>
      </div>
    </div>
  )
}

Header.defaultProps = {
  data: {
    title: 'Basic header',
  },
}

export default Header
