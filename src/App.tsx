import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme as antTheme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useThemeStore } from '@/store/themeStore'
import router from '@/router'
import './theme/index.css'

const App: React.FC = () => {
  const { theme: themeMode } = useThemeStore()

  useEffect(() => {
    document.body.className = `${themeMode}-theme`
  }, [themeMode])

  return (
    <div style={{ minHeight: '100vh' }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm:
            themeMode === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
          token: {
            colorPrimary: '#177DDC',
            borderRadius: 4,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
          },
          components: {
            Layout: {
              headerBg: themeMode === 'dark' ? '#141414' : '#FFFFFF',
              siderBg: themeMode === 'dark' ? '#141414' : '#FFFFFF',
            },
            Menu: {
              itemBg: 'transparent',
              itemSelectedBg: themeMode === 'dark' ? '#141F28' : '#E7F2FB',
              itemSelectedColor: '#177DDC',
            },
            Card: {
              colorBgContainer: themeMode === 'dark' ? '#141414' : '#FFFFFF',
              colorBorderSecondary: themeMode === 'dark' ? '#2C2C2C' : '#E5E5E5',
            },
            Table: {
              headerBg: themeMode === 'dark' ? '#1D1D1D' : '#F5F5F5',
              headerColor: themeMode === 'dark' ? '#ADADAD' : '#595959',
              colorBgContainer: themeMode === 'dark' ? '#141414' : '#FFFFFF',
            },
            Input: {
              colorBgContainer: themeMode === 'dark' ? '#141414' : '#FFFFFF',
              colorBorder: themeMode === 'dark' ? '#2C2C2C' : '#D9D9D9',
              colorText: themeMode === 'dark' ? '#DCDCDC' : '#262626',
              colorTextPlaceholder: themeMode === 'dark' ? '#7E7E7E' : '#8C8C8C',
            },
            Select: {
              colorBgContainer: themeMode === 'dark' ? '#141414' : '#FFFFFF',
              colorBorder: themeMode === 'dark' ? '#2C2C2C' : '#D9D9D9',
              colorText: themeMode === 'dark' ? '#DCDCDC' : '#262626',
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  )
}

export default App
