import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeaderRegister'
import Forms3 from '@vb/widgets/Forms/formProjects'
import { useParams } from 'react-router-dom'

const ProjectsRegister = () => {
  const { id } = useParams()

  return (
    <div className="card">
      <Helmet title={id ? 'Editar projeto' : 'Novo projeto'} />
      <div className="card-header">
        <HeadersCardHeader
          data={{
            title: id ? 'Editar projeto' : 'Novo Projeto',
            route: id ? `/projects/details/${id}` : '/projects',
          }}
        />
      </div>
      <div className="card-body">
        <Forms3 />
      </div>
    </div>
  )
}

export default ProjectsRegister
