import React from 'react'
import ProjectList from '@vb/widgets/Forms/projectList'
import CommentProject from '@vb/widgets/WidgetsGeneral/Comments'

const ProjectsDetails = () => {
  return (
    <div className="col-md-10">
      <div className="row">
        <div className="col-md-3">
          <ProjectList />
        </div>
        <div className="col-md-9">
          <CommentProject />
        </div>
      </div>
    </div>
  )
}

export default ProjectsDetails
