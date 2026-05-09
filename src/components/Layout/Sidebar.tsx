import React, { useState, useEffect, useRef } from 'react'
import { Layout, Menu, Tooltip } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Activity,
  Calendar,
  Stethoscope,
  Pill,
  ClipboardList,
  FileCheck,
  Package,
} from 'lucide-react'
import { useSidebarStore } from '@/store/sidebarStore'
import { useThemeStore } from '@/store/themeStore'
import './Sidebar.css'

const { Sider } = Layout

interface MenuItem {
  key: string
  label: string
  icon: React.ReactNode
  path: string
  children?: MenuItem[]
}

type ItemType = {
  key: string
  icon: React.ReactNode | null
  label: string
  children?: ItemType[]
}

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: <LayoutDashboard size={20} />,
    path: '/',
  },
  {
    key: 'patients',
    label: '质控中心',
    icon: <Users size={20} />,
    path: '/patients',
    children: [
      {
        key: 'quality-control',
        label: '报告质控',
        icon: <FileText size={20} />,
        path: '/patients/quality-control',
      },
      {
        key: 'timeout-control',
        label: '报告超时质控',
        icon: <FileText size={20} />,
        path: '/patients/timeout-control',
      },
      {
        key: 'monthly-indicators',
        label: '月度指标',
        icon: <ClipboardList size={20} />,
        path: '/patients/monthly-indicators',
      },
      {
        key: 'experimental-data',
        label: '实验数据导入',
        icon: <ClipboardList size={20} />,
        path: '/patients/experimental-data',
      },
    ],
  },
  {
    key: 'appointments',
    label: '项目结算',
    icon: <Calendar size={20} />,
    path: '/appointments',
    children: [
      {
        key: 'pending-settlement',
        label: '待结算列表',
        icon: <ClipboardList size={20} />,
        path: '/appointments/pending-settlement',
      },
      {
        key: 'settled-list',
        label: '已结算列表',
        icon: <ClipboardList size={20} />,
        path: '/appointments/settled-list',
      },
    ],
  },
  {
    key: 'daily-management',
    label: '日常管理',
    icon: <FileText size={20} />,
    path: '/daily-management',
    children: [
      {
        key: 'ugt1a1-quality',
        label: 'UGT1A1项目质控',
        icon: <ClipboardList size={20} />,
        path: '/daily-management/ugt1a1-quality',
      },
    ],
  },
  {
    key: 'prescriptions',
    label: '处方管理',
    icon: <Pill size={20} />,
    path: '/prescriptions',
  },
  {
    key: 'doctors',
    label: '医生管理',
    icon: <Stethoscope size={20} />,
    path: '/doctors',
  },
  {
    key: 'monitoring',
    label: '健康监测',
    icon: <Activity size={20} />,
    path: '/monitoring',
  },
  {
    key: 'reports',
    label: '报表统计',
    icon: <ClipboardList size={20} />,
    path: '/reports',
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: <Settings size={20} />,
    path: '/settings',
  },
  {
    key: 'molecular-testing',
    label: '分子检测',
    icon: <FileCheck size={20} />,
    path: '/molecular-testing',
    children: [
      {
        key: 'molecular-testing-application',
        label: '分子检测申请单',
        icon: <FileCheck size={20} />,
        path: '/molecular-testing/application',
      },
      {
        key: 'molecular-testing-return',
        label: '样本返还',
        icon: <Package size={20} />,
        path: '/molecular-testing/return',
      },
    ],
  },
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { collapsed, width, toggleCollapsed, setWidth, setCollapsed } = useSidebarStore()
  const { theme: themeMode } = useThemeStore()
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [currentKey, setCurrentKey] = useState<string>('dashboard')
  const [openKeysState, setOpenKeysState] = useState<string[]>([])

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const newWidth = e.clientX
        if (newWidth >= 240 && newWidth <= 320) {
          setWidth(newWidth)
        }
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, setWidth])

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width < 1280 && width >= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (isTablet) {
      setCollapsed(true)
    }
  }, [isTablet, setCollapsed])

  useEffect(() => {
    const findSelectedKey = (items: MenuItem[]): string | undefined => {
      for (const item of items) {
        if (item.path === location.pathname) {
          return item.key
        }
        if (item.children) {
          const found = findSelectedKey(item.children)
          if (found) {
            return found
          }
        }
      }
      return undefined
    }
    const key = findSelectedKey(menuItems) || 'dashboard'
    setCurrentKey(key)
    // 刷新页面时不自动展开二级菜单，保持收起状态
  }, [location.pathname])

  const handleMenuClick = ({ key }: { key: string }) => {
    setCurrentKey(key)
    const findMenuItem = (items: MenuItem[]): MenuItem | undefined => {
      for (const item of items) {
        if (item.key === key) {
          return item
        }
        if (item.children) {
          const found = findMenuItem(item.children)
          if (found) {
            return found
          }
        }
      }
      return undefined
    }

    const menuItem = findMenuItem(menuItems)
    if (menuItem) {
      navigate(menuItem.path)
      if (isMobile) {
        toggleCollapsed()
      }
    }
  }

  const findParentKey = (items: MenuItem[], childKey: string): string | undefined => {
    for (const item of items) {
      if (item.children) {
        if (item.children.some(child => child.key === childKey)) {
          return item.key
        }
        const found = findParentKey(item.children, childKey)
        if (found) {
          return item.key
        }
      }
    }
    return undefined
  }

  const parentKey = findParentKey(menuItems, currentKey)
  const selectedKeys = parentKey ? [currentKey, parentKey] : [currentKey]

  const generateMenuItems = (items: MenuItem[], level: number = 0): ItemType[] => {
    return items.map((item): ItemType => ({
      key: item.key,
      icon: collapsed && level > 0 ? null : (collapsed ? (
        <Tooltip title={item.label} placement="right">
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {item.icon}
          </div>
        </Tooltip>
      ) : (
        item.icon
      )),
      label: item.label,
      children: item.children ? generateMenuItems(item.children, level + 1) : undefined,
    }))
  }

  return (
    <>
      <Sider
        ref={sidebarRef}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        width={width}
        collapsedWidth={64}
        className={`sidebar sidebar-${themeMode}`}
        trigger={null}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Stethoscope size={32} />
          </div>
          {!collapsed && <span className="logo-text">医疗管理系统</span>}
        </div>

        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeysState}
          onOpenChange={setOpenKeysState}
          onClick={handleMenuClick}
          className="sidebar-menu"
          items={generateMenuItems(menuItems)}
        />

      </Sider>

      {!collapsed && !isMobile && !isTablet && (
        <div
          className="resize-handle"
          onMouseDown={() => setIsResizing(true)}
          style={{
            position: 'fixed',
            left: width,
            top: 0,
            bottom: 0,
            width: '4px',
            cursor: 'col-resize',
            zIndex: 1001,
          }}
        />
      )}
    </>
  )
}

export default Sidebar