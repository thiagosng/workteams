import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames'
import store from 'store'
import { find } from 'lodash'
import style from './style.module.scss'
import UserMenu from '../UserMenu'

const mapStateToProps = ({ menu, settings, user }) => ({
  menuData: menu.menuData,
  logo: settings.logo,
  version: settings.version,
  menuColor: settings.menuColor,
  role: user.role,
})

const MenuTop = ({
  menuData = [],
  location: { pathname },

  menuColor,
  // logo,
  role,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(store.get('app.menu.selectedKeys') || [])

  useEffect(() => {
    applySelectedKeys()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuData])

  const applySelectedKeys = () => {
    const flattenItems = (items, id) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item)
        if (Array.isArray(item[id])) {
          return flattenedItems.concat(flattenItems(item[id], id))
        }
        return flattenedItems
      }, [])
    const selectedItem = find(flattenItems(menuData, 'children'), ['url', pathname])
    setSelectedKeys(selectedItem ? [selectedItem.id] : [])
  }

  const handleClick = (e) => {
    store.set('app.menu.selectedKeys', [e.id])
    setSelectedKeys([e.id])
  }

  const generateMenuItems = () => {
    const generateItem = (item) => {
      const { id, title, url, icon, disabled, count } = item
      if (item.category) {
        return null
      }
      ;<UserMenu />
      if (item.url) {
        return (
          <Menu.Item key={id} disabled={disabled}>
            {item.target && (
              <a href={url} target={item.target} rel="noopener noreferrer">
                {icon && <span className={`${icon} ${style.icon}`} />}
                <span className={style.title}>{title}</span>
                {count && <span className="badge badge-success ml-2">{count}</span>}
              </a>
            )}
            {!item.target && (
              <Link to={url}>
                {icon && <span className={`${icon} ${style.icon}`} />}
                <span className={style.title}>{title}</span>
                {count && <span className="badge ">{count}</span>}
              </Link>
            )}
          </Menu.Item>
        )
      }
      return (
        <Menu.Item key={id} disabled={disabled}>
          {!item.target && (
            <Link to={url}>
              {icon && <span className={`${icon} ${style.icon}`} />}
              <span className={style.title}>{title}</span>
              {count && <span className="badge badge-success ml-2">{count}</span>}
            </Link>
          )}
        </Menu.Item>
      )
    }

    const generateSubmenu = (items) =>
      items.map((menuItem) => {
        if (menuItem.children) {
          const subMenuTitle = (
            <span key={menuItem.id}>
              {menuItem.icon && <span className={`${menuItem.icon} ${style.icon}`} />}
              <span className={style.title}>{menuItem.title}</span>
              {menuItem.count && <span className="badge badge-success ml-2">{menuItem.count}</span>}
            </span>
          )
          return (
            <Menu.SubMenu title={subMenuTitle} key={menuItem.id}>
              {generateSubmenu(menuItem.children)}
            </Menu.SubMenu>
          )
        }
        return generateItem(menuItem)
      })
    return menuData.map((menuItem) => {
      if (menuItem.roles && !menuItem.roles.includes(role)) {
        return null
      }
      if (menuItem.children) {
        const subMenuTitle = (
          <span key={menuItem.id}>
            {menuItem.icon && <span className={`${menuItem.icon} ${style.icon}`} />}
            <span className={style.title}>{menuItem.title}</span>
            {menuItem.count && <span className="badge badge-success ml-2">{menuItem.count}</span>}
          </span>
        )
        return (
          <Menu.SubMenu title={subMenuTitle} key={menuItem.id}>
            {generateSubmenu(menuItem.children)}
          </Menu.SubMenu>
        )
      }
      return generateItem(menuItem)
    })
  }

  return (
    <div
      className={classNames(`${style.menu}`, {
        [style.white]: menuColor === 'white',
        [style.gray]: menuColor === 'gray',
        [style.dark]: menuColor === 'dark',
      })}
    >
      <div className={style.logoContainer}>
        <div className={style.logo}>
          <div className={style.name}>WORKTEAMS</div>
          <div className={`${style.descr} text-capitalize`} />
        </div>
      </div>
      <div className={style.navigation}>
        <Menu onClick={handleClick} selectedKeys={selectedKeys} mode="horizontal">
          {generateMenuItems()}
        </Menu>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(MenuTop))
