import { createHashRouter } from 'react-router-dom'
import MainLayout from '@/components/Layout/MainLayout'
import Dashboard from '@/pages/Dashboard'
import PlaceholderPage from '@/pages/PlaceholderPage'
import ReportQuality from '@/pages/ReportQuality'
import ReportTimeoutQuality from '@/pages/ReportTimeoutQuality'
import MonthlyIndicators from '@/pages/MonthlyIndicators'
import ExperimentalData from '@/pages/ExperimentalData'
import PendingSettlement from '@/pages/PendingSettlement'
import SettledList from '@/pages/SettledList'
import UGT1A1QualityControl from '@/pages/UGT1A1QualityControl'

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'patients',
        children: [
          {
            index: true,
            element: <PlaceholderPage title="质控中心" />,
          },
          {
            path: 'quality-control',
            element: <ReportQuality />,
          },
          {
            path: 'timeout-control',
            element: <ReportTimeoutQuality />,
          },
          {
            path: 'monthly-indicators',
            element: <MonthlyIndicators />,
          },
          {
            path: 'experimental-data',
            element: <ExperimentalData />,
          },
        ],
      },
      {
        path: 'appointments',
        children: [
          {
            index: true,
            element: <PlaceholderPage title="项目结算" />,
          },
          {
            path: 'pending-settlement',
            element: <PendingSettlement />,
          },
          {
            path: 'settled-list',
            element: <SettledList />,
          },
        ],
      },
      {
        path: 'daily-management',
        children: [
          {
            index: true,
            element: <PlaceholderPage title="日常管理" />,
          },
          {
            path: 'ugt1a1-quality',
            element: <UGT1A1QualityControl />,
          },
        ],
      },
      {
        path: 'prescriptions',
        element: <PlaceholderPage title="处方管理" />,
      },
      {
        path: 'doctors',
        element: <PlaceholderPage title="医生管理" />,
      },
      {
        path: 'monitoring',
        element: <PlaceholderPage title="健康监测" />,
      },
      {
        path: 'reports',
        element: <PlaceholderPage title="报表统计" />,
      },
      {
        path: 'settings',
        element: <PlaceholderPage title="系统设置" />,
      },
    ],
  },
])

export default router
