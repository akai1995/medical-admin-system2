import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSidebarStore } from '@/store/sidebarStore'
import { useThemeStore } from '@/store/themeStore'
import './MainLayout.css'

const { Content } = Layout

const MainLayout: React.FC = () => {
  const { width, collapsed } = useSidebarStore()
  const { theme: themeMode } = useThemeStore()

  return (
    <Layout className={`main-layout main-layout-${themeMode}`}>
      <Sidebar />
      <Layout
        style={{
          marginLeft: collapsed ? 64 : width,
          transition: 'margin-left 200ms ease-in-out',
        }}
      >
        <Header />
        <Content className="content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
