import React, { useState, useEffect } from 'react'
import { Table, Button, Input, Form, Space, Upload, message, Modal } from 'antd'
import { Eye, Upload as UploadIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { sortDataByTime } from '@/utils/tableSort'
import './ExperimentalData.css'

interface ExperimentalDataItem {
  key: string
  applicationTime: string
  applicationCode: string
  name: string
  gender: string
  age: number
  pathologyNumber: string
  uploadTime: string
  uploader: string
}

const generateMockData = (): ExperimentalDataItem[] => {
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '王十二']
  const genders = ['男', '女']
  const uploaders = ['管理员', '李医生', '张护士', '王技术员']
  
  return Array.from({ length: 20 }, (_, i) => ({
    key: `${i + 1}`,
    applicationTime: `2026-04-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    applicationCode: `EXP-${String(i + 1).padStart(6, '0')}`,
    name: names[i % names.length],
    gender: genders[Math.floor(Math.random() * genders.length)],
    age: Math.floor(Math.random() * 70) + 18,
    pathologyNumber: `BL-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    uploadTime: `2026-04-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    uploader: uploaders[Math.floor(Math.random() * uploaders.length)],
  }))
}

const ExperimentalData: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState(() => generateMockData())
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<ExperimentalDataItem | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setData(prevData => sortDataByTime(prevData, 'applicationTime'))
  }, [])

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  }

  const handleSearch = () => {
    const formValues = form.getFieldsValue()
    const filteredData = generateMockData().filter(item => {
      if (formValues.name && !item.name.includes(formValues.name)) {
        return false
      }
      if (formValues.pathologyNumber && !item.pathologyNumber.includes(formValues.pathologyNumber)) {
        return false
      }
      return true
    })
    setData(sortDataByTime(filteredData, 'applicationTime'))
  }

  const handleReset = () => {
    form.resetFields()
    setData(generateMockData())
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
      setData(generateMockData())
    }, 1500)
    
    return false
  }

  const uploadProps = {
    beforeUpload: handleFileUpload,
    accept: '.xlsx,.xls',
    showUploadList: false,
    maxCount: 1,
  }

  const columns = [
    {
      title: '申请时间',
      dataIndex: 'applicationTime',
      key: 'applicationTime',
      width: 150,
    },
    {
      title: '申请编码',
      dataIndex: 'applicationCode',
      key: 'applicationCode',
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 80,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 60,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 60,
    },
    {
      title: '病理号',
      dataIndex: 'pathologyNumber',
      key: 'pathologyNumber',
      width: 120,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 150,
    },
    {
      title: '上传人',
      dataIndex: 'uploader',
      key: 'uploader',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_: any, record: ExperimentalDataItem) => (
        <Button type="link" icon={<Eye size={16} />} onClick={() => {
          setSelectedRecord(record)
          setDrawerVisible(true)
        }}>
          详情
        </Button>
      ),
    },
  ]

  return (
    <div className="experimental-data-page">
      <div className="page-header">
        <h1 className="page-title">实验数据导入</h1>
      </div>

      <div className="search-panel">
        <Form form={form} className={`search-form ${expanded ? 'expanded' : ''}`}>
          <Form.Item label="姓名" name="name">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="病理号" name="pathologyNumber">
            <Input placeholder="请输入病理号" />
          </Form.Item>
          <Form.Item label="申请编码" name="applicationCode">
            <Input placeholder="请输入申请编码" />
          </Form.Item>
          <Form.Item label="患者姓名" name="patientName" className="hidden">
            <Input placeholder="请输入患者姓名" />
          </Form.Item>
          <Form.Item label="住院号" name="hospitalNumber" className="hidden">
            <Input placeholder="请输入住院号" />
          </Form.Item>
          <Form.Item label="身份证号" name="idCard" className="hidden">
            <Input placeholder="请输入身份证号" />
          </Form.Item>
          <Form.Item label="项目名称" name="projectName" className="hidden">
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <div className="search-actions-wrapper">
            <div className="search-actions">
              <Button onClick={handleReset}>重置</Button>
              <Button type="primary" htmlType="submit" onClick={handleSearch}>
                查询
              </Button>
              <Button type="text" className="expand-btn" onClick={toggleExpand}>
                {expanded ? '收起' : '展开'}
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
          </div>
        </Form>
      </div>

      <div className="table-container">
        <Table
          dataSource={data}
          columns={columns}
          rowSelection={rowSelection}
          pagination={{ 
            pageSize: 10,
            pageSizeOptions: ['10', '20', '50', '100'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `共 ${total} 条数据，当前显示 ${range[0]}-${range[1]} 条`
          }}
          scroll={{ x: 1000 }}
          title={() => (
            <div className="table-actions">
              <Space>
                <Upload {...uploadProps}>
                  <Button type="primary" icon={<UploadIcon size={16} />}>
                    导入实验数据
                  </Button>
                </Upload>
              </Space>
            </div>
          )}
        />
      </div>

      <Modal
        title="实验数据详情"
        open={drawerVisible}
        onCancel={() => setDrawerVisible(false)}
        footer={null}
        width={500}
        centered
      >
        {selectedRecord && (
          <div>
            <p><strong>申请时间：</strong>{selectedRecord.applicationTime}</p>
            <p><strong>申请编码：</strong>{selectedRecord.applicationCode}</p>
            <p><strong>姓名：</strong>{selectedRecord.name}</p>
            <p><strong>性别：</strong>{selectedRecord.gender}</p>
            <p><strong>年龄：</strong>{selectedRecord.age}</p>
            <p><strong>病理号：</strong>{selectedRecord.pathologyNumber}</p>
            <p><strong>上传时间：</strong>{selectedRecord.uploadTime}</p>
            <p><strong>上传人：</strong>{selectedRecord.uploader}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ExperimentalData