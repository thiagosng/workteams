import React from 'react'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeaderRegister'
import Forms3 from '@vb/widgets/Forms/formSegment'
import './styles.css'

const SegmentsRegister = () => {
  return (
    <div className="card">
      <div className="card-header">
        <HeadersCardHeader data={{ title: 'Novo Segmento', route: '/segments' }} />
      </div>
      <div className="card-body">
        <Forms3 />
      </div>
    </div>
  )
}

export default SegmentsRegister
