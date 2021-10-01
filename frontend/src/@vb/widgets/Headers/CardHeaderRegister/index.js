import React from 'react'
import { Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import store from 'store'
// import style from './style.module.scss'

const Header = ({ data }) => {
  return (
    <div className="row">
      <div className="col-11">
        <h5 className="mb-0">
          <strong>{data.title}</strong>
        </h5>
      </div>
      <div className="col-1">
        <Link to={data.route}>
          <Button type="primary" onClicl={store.remove('idNewClient')}>
            <LeftOutlined />
            Voltar
          </Button>
        </Link>
      </div>
      {/* <div className="col-1">
        <Link to={`${data.route}`} className={`btn btn-success ${style.btnWithAddon}`}>
          <span className={`${style.btnAddon}`}>
            <i className={`${style.btnAddonIcon} fe fe-plus-circle`} />
          </span>
          Cadastrar
        </Link>
      </div> */}
    </div>
  )
}

Header.defaultProps = {
  data: {
    title: 'Basic header',
  },
}

export default Header
