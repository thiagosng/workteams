import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsWpPostShort from '@vb/widgets/AppPartials/WpPostShort'
import WidgetsLists28 from '@vb/widgets/WidgetsLists/28'
import WidgetsLists4 from '@vb/widgets/WidgetsLists/4'

const Dashboard = () => {
  return (
    <div>
      <Helmet title="Home" />
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <AppPartialsWpPostShort />
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists28 />
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-body mt-3">
              <WidgetsLists4 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
