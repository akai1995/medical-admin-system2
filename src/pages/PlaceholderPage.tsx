import React from 'react'
import { Card } from 'antd'

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
      </div>
      <Card>
        <p>此页面正在开发中...</p>
      </Card>
    </div>
  )
}

export default PlaceholderPage
