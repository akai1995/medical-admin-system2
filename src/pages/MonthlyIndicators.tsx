import React, { useState } from 'react'
import { Card, DatePicker, Row, Col, Statistic } from 'antd'
import { FileText, Package } from 'lucide-react'
import ReactECharts from 'echarts-for-react'
import dayjs, { Dayjs } from 'dayjs'
import { useThemeStore } from '@/store/themeStore'
import './MonthlyIndicators.css'

const applicationNames = ['尿常规', '血常规', '血糖', '血脂', '肝功能', '肾功能', '心电图', 'B超', 'X光片', 'CT', 'MRI', '病理切片']

const specimenTypes = ['血液', '尿液', '粪便', '痰液', '组织', '骨髓', '脑脊液', '胸水', '腹水', '关节液', '分泌物', '引流液']

const seededRandom = (seed: string) => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  return () => {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff
    return hash / 0x7fffffff
  }
}

const generateApplicationData = (dateStr: string) => {
  const random = seededRandom(dateStr)
  return applicationNames.map((name) => ({
    name,
    value: Math.floor(random() * 500) + 100,
  }))
}

const generateSpecimenData = (dateStr: string) => {
  const random = seededRandom(dateStr)
  return specimenTypes.map((name) => ({
    name,
    value: Math.floor(random() * 400) + 80,
  }))
}

const getBarChartOption = (data: { name: string; value: number }[], color: string, theme: 'light' | 'dark') => {
  const backgroundColor = theme === 'dark' ? '#262626' : '#EBEBEB'
  const textColor = theme === 'dark' ? '#ADADAD' : '#595959'
  const axisLineColor = theme === 'dark' ? '#2C2C2C' : '#E5E5E5'
  const splitLineColor = theme === 'dark' ? '#2C2C2C' : '#F0F0F0'

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: '{b}: {c}',
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 10,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
        rotate: 45,
        fontSize: 12,
        color: textColor,
      },
      axisLine: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 12,
        color: textColor,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: splitLineColor,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        data: data.map(item => item.value),
        barWidth: '50%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: color },
              { offset: 1, color: `${color}80` },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        showBackground: true,
        backgroundStyle: {
          color: backgroundColor,
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: color },
                { offset: 1, color: `${color}CC` },
              ],
            },
          },
        },
      },
    ],
  }
}

const MonthlyIndicators: React.FC = () => {
  const { theme: themeMode } = useThemeStore()
  // 每个模块独立的日期状态，默认展示本月和本年
  const [appMonthDate, setAppMonthDate] = useState<Dayjs>(dayjs())
  const [appYearDate, setAppYearDate] = useState<Dayjs>(dayjs())
  const [specimenMonthDate, setSpecimenMonthDate] = useState<Dayjs>(dayjs())
  const [specimenYearDate, setSpecimenYearDate] = useState<Dayjs>(dayjs())

  // 根据日期生成数据，日期变化时数据会自动更新
  const applicationMonthData = generateApplicationData('app_month_' + appMonthDate.format('YYYY-MM'))
  const applicationYearData = generateApplicationData('app_year_' + appYearDate.format('YYYY'))
  const specimenMonthData = generateSpecimenData('specimen_month_' + specimenMonthDate.format('YYYY-MM'))
  const specimenYearData = generateSpecimenData('specimen_year_' + specimenYearDate.format('YYYY'))

  const totalAppCount = applicationMonthData.reduce((sum, item) => sum + item.value, 0)
  const totalSpecimenCount = specimenMonthData.reduce((sum, item) => sum + item.value, 0)
  const yearTotalAppCount = applicationYearData.reduce((sum, item) => sum + item.value, 0)
  const yearTotalSpecimenCount = specimenYearData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="monthly-indicators-page">
      <div className="page-header">
        <h1 className="page-title">月度指标</h1>
      </div>

      <Row gutter={20} className="stats-row">
        <Col span={6}>
          <Card className="stat-card">
            <Statistic
              title="当月申请单"
              value={totalAppCount}
              prefix={<FileText size={24} />}
              suffix="份"
              valueStyle={{ color: '#177DDC' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card">
            <Statistic
              title="当年申请单"
              value={yearTotalAppCount}
              prefix={<FileText size={24} />}
              suffix="份"
              valueStyle={{ color: '#52C41A' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card">
            <Statistic
              title="当月标本"
              value={totalSpecimenCount}
              prefix={<Package size={24} />}
              suffix="份"
              valueStyle={{ color: '#FA8C16' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card">
            <Statistic
              title="当年标本"
              value={yearTotalSpecimenCount}
              prefix={<Package size={24} />}
              suffix="份"
              valueStyle={{ color: '#EB2F96' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={20} className="charts-row">
        <Col span={12}>
          <Card
            title="申请单（月）统计"
            extra={
              <DatePicker
                picker="month"
                value={appMonthDate}
                onChange={(date) => date && setAppMonthDate(date)}
              />
            }
            className="chart-card"
          >
            <ReactECharts
              option={getBarChartOption(applicationMonthData, '#177DDC', themeMode)}
              style={{ height: '350px' }}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="申请单（年）统计"
            extra={
              <DatePicker
                picker="year"
                value={appYearDate}
                onChange={(date) => date && setAppYearDate(date)}
              />
            }
            className="chart-card"
          >
            <ReactECharts
              option={getBarChartOption(applicationYearData, '#52C41A', themeMode)}
              style={{ height: '350px' }}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="标本（月）统计"
            extra={
              <DatePicker
                picker="month"
                value={specimenMonthDate}
                onChange={(date) => date && setSpecimenMonthDate(date)}
              />
            }
            className="chart-card"
          >
            <ReactECharts
              option={getBarChartOption(specimenMonthData, '#FA8C16', themeMode)}
              style={{ height: '350px' }}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="标本（年）统计"
            extra={
              <DatePicker
                picker="year"
                value={specimenYearDate}
                onChange={(date) => date && setSpecimenYearDate(date)}
              />
            }
            className="chart-card"
          >
            <ReactECharts
              option={getBarChartOption(specimenYearData, '#EB2F96', themeMode)}
              style={{ height: '350px' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default MonthlyIndicators