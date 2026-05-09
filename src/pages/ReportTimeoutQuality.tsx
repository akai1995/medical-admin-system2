import React, { useState, useEffect } from 'react'
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
} from 'antd'
import {
  Download,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { sortDataByTime } from '@/utils/tableSort'
import './ReportTimeoutQuality.css'

const { Option } = Select

interface ReportTimeoutQuality {
  key: string
  applyTime: string
  applyCode: string
  hospitalNo: string
  patientName: string
  testItem: string
  group: string
  notifyTime: string
  paymentStatus: string
  paymentDate: string
  qualityStatus: string
  reportStatus: string
  timeoutTime: string
}

const generateMockData = (count: number): ReportTimeoutQuality[] => {
  const paymentStatuses = ['已缴费', '未缴费', '已退费', '待结算', '免费', '待办理', '待缴费', '地州待缴费']
  const qualityStatuses = ['待质控', '合格', '不合格']
  const reportStatuses = ['未制作', '已制作', '制作中', '未上传', '已上传', '待补充', '已审核']
  const groups = ['生化组', '免疫组', '微生物组', '血液组']
  const testItems = ['血常规', '尿常规', '肝功能', '肾功能', '血糖', '血脂', '心电图', 'B超', 'CT', 'MRI']
  const patientNames = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十']

  const data: ReportTimeoutQuality[] = []
  for (let i = 1; i <= count; i++) {
    const isTimeout = Math.random() > 0.6
    data.push({
      key: `${i}`,
      applyTime: `2024-01-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      applyCode: `SQ${String(i).padStart(8, '0')}`,
      hospitalNo: `ZY${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
      patientName: patientNames[Math.floor(Math.random() * patientNames.length)] + Math.floor(Math.random() * 100),
      testItem: testItems[Math.floor(Math.random() * testItems.length)],
      group: groups[Math.floor(Math.random() * groups.length)],
      notifyTime: `2024-01-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      paymentDate: Math.random() > 0.3 ? `2024-01-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}` : '',
      qualityStatus: qualityStatuses[Math.floor(Math.random() * qualityStatuses.length)],
      reportStatus: reportStatuses[Math.floor(Math.random() * reportStatuses.length)],
      timeoutTime: isTimeout ? `${Math.floor(Math.random() * 24)}小时${Math.floor(Math.random() * 60)}分钟` : '',
    })
  }
  return data
}

const ReportTimeoutQuality: React.FC = () => {
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [showAllFields, setShowAllFields] = useState(false)

  const [data, setData] = useState<ReportTimeoutQuality[]>(() => generateMockData(50))

  useEffect(() => {
    setData(prevData => sortDataByTime(prevData, 'applyTime'))
  }, [])

  const handleSearch = () => {
    const formValues = form.getFieldsValue()
    const filteredData = generateMockData(50).filter(item => {
      if (formValues.patientName && !item.patientName.includes(formValues.patientName)) {
        return false
      }
      if (formValues.hospitalNo && !item.hospitalNo.includes(formValues.hospitalNo)) {
        return false
      }
      if (formValues.testItem && !item.testItem.includes(formValues.testItem)) {
        return false
      }
      if (formValues.paymentStatus && item.paymentStatus !== formValues.paymentStatus) {
        return false
      }
      if (formValues.qualityStatus && item.qualityStatus !== formValues.qualityStatus) {
        return false
      }
      if (formValues.reportStatus && item.reportStatus !== formValues.reportStatus) {
        return false
      }
      return true
    })
    setData(sortDataByTime(filteredData, 'applyTime'))
  }

  const handleReset = () => {
    form.resetFields()
    setData(generateMockData(50))
  }

  const columns = [
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
      width: 140,
    },
    {
      title: '申请编号',
      dataIndex: 'applyCode',
      key: 'applyCode',
      width: 120,
    },
    {
      title: '住院号',
      dataIndex: 'hospitalNo',
      key: 'hospitalNo',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'testItem',
      key: 'testItem',
      width: 100,
    },
    {
      title: '分组',
      dataIndex: 'group',
      key: 'group',
      width: 80,
    },
    {
      title: '通知时间',
      dataIndex: 'notifyTime',
      key: 'notifyTime',
      width: 140,
    },
    {
      title: '缴费状态',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '已缴费': 'success',
          '未缴费': 'error',
          '已退费': 'default',
          '待结算': 'warning',
          '免费': 'success',
          '待办理': 'warning',
          '待缴费': 'error',
          '地州待缴费': 'warning',
        }
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
      },
    },
    {
      title: '缴费日期',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      width: 100,
    },
    {
      title: '质控状态',
      dataIndex: 'qualityStatus',
      key: 'qualityStatus',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '待质控': 'warning',
          '合格': 'success',
          '不合格': 'error',
        }
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
      },
    },
    {
      title: '报告状态',
      dataIndex: 'reportStatus',
      key: 'reportStatus',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '未制作': 'error',
          '已制作': 'success',
          '制作中': 'processing',
          '未上传': 'error',
          '已上传': 'success',
          '待补充': 'warning',
          '已审核': 'success',
        }
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
      },
    },
    {
      title: '报告超时时间',
      dataIndex: 'timeoutTime',
      key: 'timeoutTime',
      width: 120,
      render: (time: string) => {
        return time ? <Tag color="error">{time}</Tag> : '-'
      },
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys as string[]),
  }

  const handleBatchExport = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择数据')
      return
    }
    Modal.confirm({
      title: '批量导出确认',
      content: '是否导出当前查询的所有数据？',
      okText: '确认',
      cancelText: '取消',
      width: 400,
      onOk() {
        message.success(`已导出 ${selectedRowKeys.length} 条数据`)
      },
    })
  }

  return (
    <div className="report-timeout-quality-page">
      <div className="page-header">
        <h1 className="page-title">报告超时质控</h1>
      </div>

      <div className="search-panel">
        <Form form={form} className="search-form">
          <Form.Item label="患者姓名" name="patientName">
            <Input
              placeholder="请输入患者姓名"
            />
          </Form.Item>
          <Form.Item label="住院号" name="hospitalNo">
            <Input
              placeholder="请输入住院号"
            />
          </Form.Item>
          <Form.Item label="项目名称" name="testItem">
            <Input
              placeholder="请输入项目名称"
            />
          </Form.Item>
          {showAllFields && (
            <Form.Item label="缴费状态" name="paymentStatus">
              <Select placeholder="请选择缴费状态">
                <Option value="已缴费">已缴费</Option>
                <Option value="未缴费">未缴费</Option>
                <Option value="已退费">已退费</Option>
                <Option value="待结算">待结算</Option>
                <Option value="免费">免费</Option>
                <Option value="待办理">待办理</Option>
                <Option value="待缴费">待缴费</Option>
                <Option value="地州待缴费">地州待缴费</Option>
              </Select>
            </Form.Item>
          )}
          {showAllFields && (
            <Form.Item label="质控状态" name="qualityStatus">
              <Select placeholder="请选择质控状态">
                <Option value="待质控">待质控</Option>
                <Option value="合格">合格</Option>
                <Option value="不合格">不合格</Option>
              </Select>
            </Form.Item>
          )}
          {showAllFields && (
            <Form.Item label="报告状态" name="reportStatus">
              <Select placeholder="请选择报告状态">
                <Option value="未制作">未制作</Option>
                <Option value="已制作">已制作</Option>
                <Option value="制作中">制作中</Option>
                <Option value="未上传">未上传</Option>
                <Option value="已上传">已上传</Option>
                <Option value="待补充">待补充</Option>
                <Option value="已审核">已审核</Option>
              </Select>
            </Form.Item>
          )}
          <div className="search-actions-wrapper">
            <div className="search-actions">
              <Button onClick={handleReset}>
                重置
              </Button>
              <Button type="primary" onClick={handleSearch}>
                查询
              </Button>
              <Button 
                type="text" 
                onClick={() => setShowAllFields(!showAllFields)}
                className="expand-btn"
              >
                {showAllFields ? (
                  <>
                    <span>收起</span>
                    <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    <span>展开</span>
                    <ChevronDown size={16} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Form>
      </div>

      <div className="table-container">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{ 
            pageSize: 10,
            pageSizeOptions: ['10', '20', '50', '100'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `共 ${total} 条数据，当前显示 ${range[0]}-${range[1]} 条`
          }}
          scroll={{ x: 1400 }}
          title={() => (
            <div className="table-actions">
              <Space>
                <Button
                  type="primary"
                  onClick={handleBatchExport}
                  icon={<Download size={16} />}
                >
                  批量导出
                </Button>
              </Space>
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default ReportTimeoutQuality