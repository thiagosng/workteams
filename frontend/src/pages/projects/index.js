import React from 'react'
import Helmet from 'react-helmet'
import WidgetsGeneral13 from '@vb/widgets/WidgetsGeneral/13'
import WidgetsGeneral22 from '@vb/widgets/WidgetsGeneral/22'
import style from './style.module.scss'

const Projects = () => {
  return (
    <div>
      <Helmet title="Projetos" />
      <div className={`${style.card}`}>
        <div className="card">
          <div className="card-body">
            <WidgetsGeneral22 />
          </div>
        </div>
      </div>
      <div>
        <WidgetsGeneral13 />
      </div>
    </div>
  )
}

export default Projects
