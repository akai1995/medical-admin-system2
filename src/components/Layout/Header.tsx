import React from 'react'
import { Layout, Avatar, Dropdown } from 'antd'
import { Moon, Sun, User, LogOut, Settings, Menu, X } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useSidebarStore } from '@/store/sidebarStore'
import './Header.css'

const { Header: AntHeader } = Layout

const Header: React.FC = () => {
  const { theme: themeMode, toggleTheme } = useThemeStore()
  const { collapsed, width, toggleCollapsed } = useSidebarStore()

  const sidebarWidth = collapsed ? 64 : width

  const userMenuItems = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <User size={16} />,
    },
    {
      key: 'settings',
      label: '设置',
      icon: <Settings size={16} />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogOut size={16} />,
      danger: true,
    },
  ]

  return (
    <AntHeader
      className={`header header-${themeMode}`}
      style={{ left: sidebarWidth }}
    >
      <div className="header-left">
        <div
          className="collapse-button"
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <Menu size={20} />
          ) : (
            <X size={20} />
          )}
        </div>
      </div>

      <div className="header-right">
        <div
          className="action-button theme-toggle"
          onClick={toggleTheme}
        >
          {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </div>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div className="action-button">
            <Avatar size={32} icon={<User size={16} />} />
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  )
}

export default Header