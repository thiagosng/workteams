import React from 'react'
import { Helmet } from 'react-helmet'
import PainelDnd from '../../@vb/components/PainelDnd'

const Dashboard = () => {
  return (
    <div>
      <Helmet title="Dashboard" />
      <PainelDnd />
      <div />
    </div>
  )
}

export default Dashboard
