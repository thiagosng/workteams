import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user })

const General23 = ({ user }) => {
  return (
    <div className="py-4 text-center">
      <div className="vb__utils__avatar vb__utils__avatar--rounded vb__utils__avatar--size84 border border-5 border-white d-inline-block mb-3">
        <img src="resources/images/avatars/2.jpg" alt="Anna Gray" />
      </div>
      <div className="font-weight-bold font-size-24 text-dark">{user.name}</div>
      <div className="font-size-18 text-gray-6 mb-4 mt-n1">{user.email}</div>
    </div>
  )
}

export default connect(mapStateToProps)(General23)
