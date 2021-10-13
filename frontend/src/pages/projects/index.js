import React from 'react'
import WidgetsGeneral13 from '@vb/widgets/WidgetsGeneral/13'
import WidgetsGeneral22 from '@vb/widgets/WidgetsGeneral/22'

const Projects = () => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <WidgetsGeneral22 />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div>
            <div className="card">
              <div className="card-body">
                <WidgetsGeneral13 />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div>
            <div className="card">
              <div className="card-body">
                <WidgetsGeneral13 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
