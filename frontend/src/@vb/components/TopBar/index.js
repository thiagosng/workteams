import React from 'react'
import FavPages from './FavPages'
import Search from './Search'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import LanguageSwitcher from './LanguageSwitcher'
import Actions from './Actions'
import UserMenu from './UserMenu'
import Cart from './Cart'
import style from './style.module.scss'

const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div className="mr-4">
        <FavPages />
      </div>
      <div className="mr-auto mr-md-1">
        <Search />
      </div>
      <div className="mr-4 d-none d-md-block">
        <IssuesHistory />
      </div>
      <div className="mr-auto d-xl-block d-none">
        <ProjectManagement />
      </div>
      <div className="mr-3 d-none d-sm-block ml-auto">
        <Cart />
      </div>
      <div className="mr-3 d-none d-sm-block">
        <Actions />
      </div>
      <div className="mr-3 d-none d-sm-block">
        <LanguageSwitcher />
      </div>
      <div className="">
        <UserMenu />
      </div>
    </div>
  )
}

export default TopBar
