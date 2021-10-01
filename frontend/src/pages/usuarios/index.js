import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import TablesAntd3 from '@vb/widgets/TablesAntd/listaUsuarios'

const Users = () => {
  return (
    <div>
      <Helmet title="Ant Design" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Usuários',
                  button: 'Adicionar Usuário',
                  url: 'https://ant.design/components/table/',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Usuários', route: '/users/register' }} />
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

export default Users
