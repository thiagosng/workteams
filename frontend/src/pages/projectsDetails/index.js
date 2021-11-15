import React from 'react'
import { Helmet } from 'react-helmet'
import ProjectList from '@vb/widgets/Forms/projectList'
import CommentProject from '@vb/widgets/WidgetsGeneral/Comments'
import PainelDnd from '@vb/components/PainelDnd'

const ProjectsDetails = () => {
  return (
    <div className="col-md-12">
      <Helmet title="Detalhes do projeto" />
      <div className="row">
        <div className="col-md-3">
          <ProjectList />
        </div>
        <div className="col-md-9">
          <div>
            <PainelDnd />
          </div>
          <CommentProject />
        </div>
      </div>
    </div>
  )
}

export default ProjectsDetails
