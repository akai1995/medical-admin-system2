import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  Space,
  message,
} from 'antd'
import {
  Download,
  Upload as UploadIcon,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { sortDataByTime } from '@/utils/tableSort'
import './PendingSettlement.css'

const { RangePicker } = DatePicker

interface SettlementItem {
  key: string
  registerDate: string
  applyCode: string
  name: string
  submitUnit: string
  submitHospital: string
  projectName: string
  projectAmount: number
  patientType: string
}

const generateMockData = (count: number): SettlementItem[] => {
  const submitUnits = ['第一医院', '第二医院', '第三医院', '社区卫生服务中心', '民营医院']
  const submitHospitals = ['总院', '分院A', '分院B', '分院C']
  const projectNames = ['血常规', '尿常规', '肝功能', '肾功能', '血糖检测', '血脂检测', '心电图', 'B超', 'CT', 'MRI']
  const patientTypes = ['普通患者', 'VIP患者', '医保患者', '自费患者']
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十']

  const data: SettlementItem[] = []
  for (let i = 1; i <= count; i++) {
    data.push({
      key: `${i}`,
      registerDate: `2026-04-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      applyCode: `SJ${String(i).padStart(8, '0')}`,
      name: names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100),
      submitUnit: submitUnits[Math.floor(Math.random() * submitUnits.length)],
      submitHospital: submitHospitals[Math.floor(Math.random() * submitHospitals.length)],
      projectName: projectNames[Math.floor(Math.random() * projectNames.length)],
      projectAmount: Math.floor(Math.random() * 5000) + 100,
      patientType: patientTypes[Math.floor(Math.random() * patientTypes.length)],
    })
  }
  return data
}

const PendingSettlement: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<SettlementItem[]>(() => generateMockData(50))
  const [modalVisible, setModalVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    setData(prevData => sortDataByTime(prevData, 'registerDate'))
  }, [])

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  }

  const handleSearch = () => {
    const formValues = form.getFieldsValue()
    const filteredData = generateMockData(50).filter(item => {
      if (formValues.registerDate && formValues.registerDate.length === 2) {
        const startDate = formValues.registerDate[0].startOf('day')
        const endDate = formValues.registerDate[1].endOf('day')
        const itemDate = new Date(item.registerDate)
        if (itemDate < startDate.toDate() || itemDate > endDate.toDate()) {
          return false
        }
      }
      if (formValues.name && !item.name.includes(formValues.name)) {
        return false
      }
      if (formValues.applyCode && !item.applyCode.includes(formValues.applyCode)) {
        return false
      }
      if (formValues.projectName && !item.projectName.includes(formValues.projectName)) {
        return false
      }
      if (formValues.submitHospital && !item.submitHospital.includes(formValues.submitHospital)) {
        return false
      }
      if (formValues.patientType && !item.patientType.includes(formValues.patientType)) {
        return false
      }
      return true
    })
    setData(sortDataByTime(filteredData, 'registerDate'))
  }

  const handleReset = () => {
    form.resetFields()
    setData(sortDataByTime(generateMockData(50), 'registerDate'))
  }

  const handleBatchExport = () => {
    Modal.confirm({
      title: '批量导出确认',
      content: '是否导出当前查询的所有数据？',
      okText: '确认',
      cancelText: '取消',
      width: 400,
      onOk() {
        message.success('批量导出功能开发中')
      },
    })
  }

  const handleFileUpload = (file: any) => {
    const isExcel = file.type === 'application/vnd.ms-excel' || 
                   file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const isXlsx = file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    
    if (!isExcel && !isXlsx) {
      message.error('请选择Excel文件')
      return false
    }
    
    message.success(`正在导入文件: ${file.name}`)
    
    setTimeout(() => {
      message.success('文件导入成功')
      setModalVisible(false)
      setData(sortDataByTime(generateMockData(50), 'registerDate'))
    }, 1500)
    
    return false
  }

  const handleImportTemplateDownload = () => {
    const templateContent = `登记日期,申请编码,姓名,送检单位,送检医院,项目名称,项目金额,患者类型
2026-04-01 10:00:00,SJ00000001,张三,第一医院,总院,血常规,200,普通患者
2026-04-02 14:30:00,SJ00000002,李四,第二医院,分院A,肝功能,500,医保患者`
    
    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = '结算数据导入模板.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    message.success('模板下载成功')
  }

  const handleViewDetail = (record: SettlementItem) => {
    message.info(`查看详情: ${record.applyCode} - ${record.name}`)
  }

  const columns = [
    {
      title: '登记日期',
      dataIndex: 'registerDate',
      key: 'registerDate',
      width: 160,
    },
    {
      title: '申请编码',
      dataIndex: 'applyCode',
      key: 'applyCode',
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '送检单位',
      dataIndex: 'submitUnit',
      key: 'submitUnit',
      width: 120,
    },
    {
      title: '送检医院',
      dataIndex: 'submitHospital',
      key: 'submitHospital',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 100,
    },
    {
      title: '项目金额',
      dataIndex: 'projectAmount',
      key: 'projectAmount',
      width: 100,
      render: (amount: number) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '患者类型',
      dataIndex: 'patientType',
      key: 'patientType',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_: unknown, record: SettlementItem) => (
        <Button type="link" icon={<Eye size={16} />} onClick={() => handleViewDetail(record)}>
          详情
        </Button>
      ),
    },
  ]

  return (
    <div className="pending-settlement-page">
      <div className="page-header">
        <h1 className="page-title">待结算列表</h1>
      </div>

      <div className="search-panel">
        <Form form={form} layout="horizontal" className="search-form">
          <Form.Item label="登记日期" name="registerDate">
            <RangePicker
              placeholder={['起始日期', '截止日期']}
            />
          </Form.Item>
          <Form.Item label="姓名" name="name">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="申请编码" name="applyCode">
            <Input placeholder="请输入申请编码" />
          </Form.Item>
          {expanded && (
            <>
              <Form.Item label="项目名称" name="projectName">
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item label="送检医院" name="submitHospital">
                <Input placeholder="请输入送检医院" />
              </Form.Item>
              <Form.Item label="患者类型" name="patientType">
                <Input placeholder="请输入患者类型" />
              </Form.Item>
            </>
          )}
          <div className="search-actions-wrapper">
            <div className="search-actions">
              <Button onClick={handleReset}>重 置</Button>
              <Button type="primary" onClick={handleSearch}>查 询</Button>
              <Button
                type="text"
                onClick={() => setExpanded(!expanded)}
                className="expand-btn"
              >
                {expanded ? (
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
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
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
                  onClick={handleBatchExport}
                  icon={<Download size={16} />}
                >
                  批量导出
                </Button>
                <Button
                  type="primary"
                  onClick={() => setModalVisible(true)}
                  icon={<UploadIcon size={16} />}
                >
                  结算数据导入
                </Button>
                <Button
                  type="primary"
                  onClick={handleImportTemplateDownload}
                  icon={<FileText size={16} />}
                >
                  导入模板下载
                </Button>
              </Space>
            </div>
          )}
        />
      </div>

      <Modal
        title="结算数据导入"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
        ]}
      >
        <Upload
          beforeUpload={handleFileUpload}
          accept=".xlsx,.xls"
          showUploadList={false}
          maxCount={1}
        >
          <Button type="primary" icon={<UploadIcon size={16} />}>
            选择文件
          </Button>
        </Upload>
        <p style={{ marginTop: 16, color: '#8C8C8C', fontSize: 12 }}>
          支持 .xlsx 和 .xls 格式的 Excel 文件
        </p>
      </Modal>
    </div>
  )
}

export default PendingSettlement