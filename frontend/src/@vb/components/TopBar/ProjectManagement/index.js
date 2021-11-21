import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

const ProjectManagement = () => {
  const menu = (
    <Menu selectable={false}>
      <Menu.ItemGroup title="Gerenciamento">
        <Menu.Item>
          <Link to="/projects">Gerenciar Projetos</Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
      <div className={styles.dropdown}>
        <i className={`${styles.icon} fe fe-database`} />
        <span className="d-none d-xl-inline">
          <FormattedMessage id="topBar.projectManagement" />
        </span>
      </div>
    </Dropdown>
  )
}

export default ProjectManagement
