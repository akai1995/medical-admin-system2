import React, { useState, useEffect } from 'react'
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  message,
} from 'antd'
import {
  Download,
  Edit,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { sortDataByTime } from '@/utils/tableSort'
import './ReportQuality.css'

const { RangePicker } = DatePicker
const { Option } = Select

interface ReportQuality {
  key: string
  applyTime: string
  uploadTime: string
  applyCode: string
  hospitalNo: string
  patientName: string
  testItem: string
  group: string
  qualityStatus: string
  qualityRemark: string
  qualityPerson: string
  qualityTime: string
}

const generateMockData = (count: number): ReportQuality[] => {
  const statuses = ['待质控', '已质控', '合格', '不合格']
  const groups = ['生化组', '免疫组', '微生物组', '血液组']
  const testItems = ['血常规', '尿常规', '肝功能', '肾功能', '血糖', '血脂', '心电图', 'B超']
  const patientNames = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十']

  const data: ReportQuality[] = []
  for (let i = 1; i <= count; i++) {
    data.push({
      key: `${i}`,
      applyTime: `2024-01-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      uploadTime: `2024-01-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      applyCode: `SQ${String(i).padStart(8, '0')}`,
      hospitalNo: `ZY${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
      patientName: patientNames[Math.floor(Math.random() * patientNames.length)] + Math.floor(Math.random() * 100),
      testItem: testItems[Math.floor(Math.random() * testItems.length)],
      group: groups[Math.floor(Math.random() * groups.length)],
      qualityStatus: statuses[Math.floor(Math.random() * statuses.length)],
      qualityRemark: Math.random() > 0.7 ? '质控通过，结果正常' : '',
      qualityPerson: Math.random() > 0.3 ? '李医生' : '',
      qualityTime: Math.random() > 0.3 ? `2024-01-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : '',
    })
  }
  return data
}

const ReportQuality: React.FC = () => {
  const [form] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [qualityForm] = Form.useForm()
  const [showAllFields, setShowAllFields] = useState(false)

  const [data, setData] = useState<ReportQuality[]>(() => generateMockData(50))

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
      width: 120,
    },
    {
      title: '报告上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 120,
    },
    {
      title: '申请编码',
      dataIndex: 'applyCode',
      key: 'applyCode',
      width: 100,
    },
    {
      title: '住院号',
      dataIndex: 'hospitalNo',
      key: 'hospitalNo',
      width: 100,
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 100,
    },
    {
      title: '送检项目',
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
      title: '质控状态',
      dataIndex: 'qualityStatus',
      key: 'qualityStatus',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '待质控': 'warning',
          '已质控': 'processing',
          '合格': 'success',
          '不合格': 'error',
        }
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
      },
    },
    {
      title: '质控备注',
      dataIndex: 'qualityRemark',
      key: 'qualityRemark',
      ellipsis: true,
    },
    {
      title: '质控人',
      dataIndex: 'qualityPerson',
      key: 'qualityPerson',
      width: 80,
    },
    {
      title: '质控时间',
      dataIndex: 'qualityTime',
      key: 'qualityTime',
      width: 120,
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys as string[]),
  }

  const handleQualityControl = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择数据')
      return
    }
    const report = data.find(item => item.key === selectedRowKeys[0])
    if (report) {
      qualityForm.setFieldsValue({
        reportName: report.testItem,
        qualityStatus: '',
        remark: '',
      })
      setModalVisible(true)
    }
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

  const handleExportMonthData = () => {
    message.success('已导出当月质控数据')
  }

  const handleQualitySave = () => {
    qualityForm.validateFields().then(() => {
      message.success('质控保存成功')
      setModalVisible(false)
      qualityForm.resetFields()
    })
  }

  return (
    <div className="report-quality-page">
      <div className="page-header">
        <h1 className="page-title">报告质控</h1>
      </div>

      <div className="search-panel">
        <Form form={form} className={`search-form ${showAllFields ? 'expanded' : ''}`}>
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
          <Form.Item label="送检项目" name="testItem">
            <Input
              placeholder="请输入送检项目"
            />
          </Form.Item>
          {showAllFields && (
            <Form.Item label="申请日期" name="applyDate">
              <RangePicker
                placeholder={['开始日期', '结束日期']}
              />
            </Form.Item>
          )}
          {showAllFields && (
            <Form.Item label="质控状态" name="qualityStatus">
              <Select placeholder="请选择质控状态">
                <Option value="待质控">待质控</Option>
                <Option value="已质控">已质控</Option>
                <Option value="合格">合格</Option>
                <Option value="不合格">不合格</Option>
              </Select>
            </Form.Item>
          )}
          {showAllFields && (
            <Form.Item label="审核日期" name="auditDate">
              <RangePicker
                placeholder={['开始日期', '结束日期']}
              />
            </Form.Item>
          )}
          {showAllFields && (
            <Form.Item label="项目分组" name="group">
              <Select placeholder="请选择分组">
                <Option value="生化组">生化组</Option>
                <Option value="免疫组">免疫组</Option>
                <Option value="微生物组">微生物组</Option>
                <Option value="血液组">血液组</Option>
              </Select>
            </Form.Item>
          )}
          <div className="search-actions-wrapper">
            <div className="search-actions">
              <Button onClick={handleReset}>
                重置
              </Button>
              <Button type="primary" htmlType="submit" onClick={handleSearch}>
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
          scroll={{ x: 1200 }}
          title={() => (
            <div className="table-actions">
              <Space>
                <Button
                  type="primary"
                  disabled={selectedRowKeys.length === 0}
                  onClick={handleQualityControl}
                  icon={<Edit size={16} />}
                >
                  报告质控
                </Button>
                <Button
                  type="primary"
                  disabled={selectedRowKeys.length === 0}
                  onClick={handleBatchExport}
                  icon={<Download size={16} />}
                >
                  批量导出
                </Button>
                <Button type="primary" onClick={handleExportMonthData} icon={<Calendar size={16} />}>
                  导出当月质控数据
                </Button>
              </Space>
            </div>
          )}
        />
      </div>

      <Modal
        title="报告质控"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          qualityForm.resetFields()
        }}
        footer={[
          <Button key="back" onClick={() => {
            setModalVisible(false)
            qualityForm.resetFields()
          }}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleQualitySave}>
            保存
          </Button>,
        ]}
      >
        <Form form={qualityForm} layout="vertical">
          <Form.Item label="报告名称" name="reportName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="报告质控" name="qualityStatus">
            <Select placeholder="请选择质控结果">
              <Option value="合格">合格</Option>
              <Option value="不合格">不合格</Option>
            </Select>
          </Form.Item>
          <Form.Item label="质控备注" name="remark">
            <Input.TextArea rows={3} placeholder="请输入质控备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ReportQuality