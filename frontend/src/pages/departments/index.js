import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import TablesAntd3 from '@vb/widgets/TablesAntd/listDepartments'

const Departments = () => {
  return (
    <div>
      <Helmet title="Ant Design" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Departamentos',
                  button: 'Cadastrar',
                  url: 'https://ant.design/components/table/',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Departamentos', route: '/department/register' }} />
            </div>
            <div className="card-body">
              <TablesAntd3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Departments
