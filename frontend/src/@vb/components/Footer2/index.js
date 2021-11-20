import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const Footer = ({ settings: { isContentMaxWidth } }) => {
  return (
    <div
      className={classNames(style.footer, {
        [style.footerFullWidth]: !isContentMaxWidth,
      })}
    >
      <div className={style.inner}>
        <div className="row">
          <div className="col-md-8">
            <a
              href="https://google.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className={style.logo}
            >
              WORKTEAMS
            </a>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Footer)
