import React from 'react'
import { Row, Col, Card, Statistic, Table, Tag } from 'antd'
import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import ReactECharts from 'echarts-for-react'
import { useThemeStore } from '@/store/themeStore'
import { sortDataByTime } from '@/utils/tableSort'
import './Dashboard.css'

const Dashboard: React.FC = () => {
  const { theme: themeMode } = useThemeStore()

  const statCards = [
    {
      title: '今日患者',
      value: 128,
      prefix: <Users size={20} />,
      trend: 12.5,
      trendUp: true,
    },
    {
      title: '预约挂号',
      value: 86,
      prefix: <Calendar size={20} />,
      trend: 8.3,
      trendUp: true,
    },
    {
      title: '在线医生',
      value: 24,
      prefix: <Activity size={20} />,
      trend: -2.1,
      trendUp: false,
    },
    {
      title: '今日收入',
      value: 45680,
      prefix: <TrendingUp size={20} />,
      trend: 15.7,
      trendUp: true,
      suffix: '元',
    },
  ]

  const patientNames = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '钱一', '刘二', '陈三', '杨四', '黄五', '林六', '何七', '马八', '罗九', '梁十', '宋一', '郑二']
  const doctorNames = ['李医生', '王医生', '赵医生', '刘医生', '陈医生', '张医生', '杨医生', '黄医生', '周医生', '吴医生']
  const departments = ['内科', '外科', '儿科', '妇科', '眼科', '骨科', '口腔科', '皮肤科', '神经科', '急诊科']
  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
  const statuses = ['completed', 'in-progress', 'pending']

  const generateAppointments = (count: number) => {
    const appointments = []
    for (let i = 1; i <= count; i++) {
      appointments.push({
        key: `${i}`,
        patient: patientNames[Math.floor(Math.random() * patientNames.length)] + (Math.floor(Math.random() * 100)),
        doctor: doctorNames[Math.floor(Math.random() * doctorNames.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        time: times[Math.floor(Math.random() * times.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
      })
    }
    return appointments
  }

  const recentAppointments = generateAppointments(100)

  const sortedAppointments = sortDataByTime(recentAppointments, 'time')

  const appointmentColumns = [
    {
      title: '患者姓名',
      dataIndex: 'patient',
      key: 'patient',
    },
    {
      title: '医生',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '预约时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          completed: { text: '已完成', color: 'success' },
          'in-progress': { text: '进行中', color: 'processing' },
          pending: { text: '待就诊', color: 'warning' },
        }
        const { text, color } = statusMap[status] || { text: '未知', color: 'default' }
        return <Tag color={color}>{text}</Tag>
      },
    },
  ]

  const patientTrendOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['新增患者', '复诊患者'],
      textStyle: {
        color: themeMode === 'dark' ? '#DCDCDC' : '#262626',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        color: themeMode === 'dark' ? '#ADADAD' : '#595959',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: themeMode === 'dark' ? '#ADADAD' : '#595959',
      },
    },
    series: [
      {
        name: '新增患者',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: {
          color: '#177DDC',
        },
      },
      {
        name: '复诊患者',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: {
          color: '#49AA19',
        },
      },
    ],
  }

  const departmentDistributionOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: themeMode === 'dark' ? '#DCDCDC' : '#262626',
      },
    },
    series: [
      {
        name: '科室分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: themeMode === 'dark' ? '#141414' : '#FFFFFF',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '内科' },
          { value: 735, name: '外科' },
          { value: 580, name: '儿科' },
          { value: 484, name: '妇科' },
          { value: 300, name: '眼科' },
        ],
      },
    ],
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">仪表盘</h1>
      </div>

      <Row gutter={[20, 20]}>
        {statCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card">
              <Statistic
                title={card.title}
                value={card.value}
                prefix={card.prefix}
                suffix={card.suffix}
                valueStyle={{
                  color: themeMode === 'dark' ? '#DCDCDC' : '#262626',
                  fontSize: '24px',
                  fontWeight: 500,
                }}
              />
              <div className="stat-trend">
                {card.trendUp ? (
                  <ArrowUp size={16} className="trend-up" />
                ) : (
                  <ArrowDown size={16} className="trend-down" />
                )}
                <span className={`trend-value ${card.trendUp ? 'trend-up' : 'trend-down'}`}>
                  {Math.abs(card.trend)}%
                </span>
                <span className="trend-label">较昨日</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: '20px' }}>
        <Col xs={24} lg={16}>
          <Card title="患者趋势" className="chart-card">
            <ReactECharts option={patientTrendOption} style={{ height: '350px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="科室分布" className="chart-card">
            <ReactECharts option={departmentDistributionOption} style={{ height: '350px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: '20px' }}>
        <Col xs={24}>
          <Card title="今日预约" className="table-card">
            <Table
              columns={appointmentColumns}
              dataSource={sortedAppointments}
              pagination={{ pageSize: 10 }}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
