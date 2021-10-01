import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import Sidebar from '@vb/components/Sidebar'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({
  logo: settings.logo,
  isGrayTopbar: settings.isGrayTopbar,
  isCardShadow: settings.isCardShadow,
  isSquaredBorders: settings.isSquaredBorders,
  isBorderless: settings.isBorderless,
  authPagesColor: settings.authPagesColor,
  isAuthTopbar: settings.isAuthTopbar,
})

const AuthLayout = ({
  children,

  isCardShadow,
  isSquaredBorders,
  isBorderless,
  authPagesColor,
}) => {
  return (
    <Layout className="vb__layout">
      <Layout.Content>
        <Sidebar />
        <div
          className={classNames(`${style.container}`, {
            vb__layout__squaredBorders: isSquaredBorders,
            vb__layout__cardsShadow: isCardShadow,
            vb__layout__borderless: isBorderless,
            [style.white]: authPagesColor === 'white',
            [style.gray]: authPagesColor === 'gray',
          })}
          style={{
            backgroundImage:
              authPagesColor === 'image' ? 'url(resources/images/content/photos/8.jpeg)' : '',
          }}
        >
          <div className="mb-5">{children}</div>
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default withRouter(connect(mapStateToProps)(AuthLayout))
