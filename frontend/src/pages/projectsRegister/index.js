import React from 'react'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeaderRegister'
import Forms3 from '@vb/widgets/Forms/formProjects'
import './styles.css'

const ProjectsRegister = () => {
  return (
    <div className="card">
      <div className="card-header">
        <HeadersCardHeader data={{ title: 'Novo projeto', route: '/projects' }} />
      </div>
      <div className="card-body">
        <Forms3 />
      </div>
    </div>
  )
}

export default ProjectsRegister
