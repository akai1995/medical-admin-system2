import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
  Tag,
  Steps,
} from 'antd'
import './UGT1A1QualityControl.css'
import {
  Upload,
  Eye,
  Download,
  FileText,
  ChevronDown,
  ChevronUp,
  Dna,
  Database,
  Cpu,
  CheckCircle,
  FolderOpen,
} from 'lucide-react'

interface TemplateOption {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

interface VersionGroup {
  version: string
  options: TemplateOption[]
}

interface UGT1A1Item {
  id: number
  sampleNumber: string
  pathologyNumber: string
  hospitalNumber: string
  patientName: string
  projectName: string
  sampleQuality: string
  nucleicAcidExtraction: string
  machineQuality: string
  kitNumber: string
}

const generateMockData = (count: number = 50): UGT1A1Item[] => {
  const data: UGT1A1Item[] = []
  const projects = ['UGT1A1基因检测', 'UGT1A1*6检测', 'UGT1A1*28检测']
  const qualities = ['合格', '不合格', '待检测']
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      sampleNumber: `SAMPLE-${String(i).padStart(6, '0')}`,
      pathologyNumber: `BL-${Math.floor(Math.random() * 9000) + 1000}`,
      hospitalNumber: `HZ-${Math.floor(Math.random() * 90000) + 10000}`,
      patientName: ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'][Math.floor(Math.random() * 8)] + Math.floor(Math.random() * 100),
      projectName: projects[Math.floor(Math.random() * projects.length)],
      sampleQuality: qualities[Math.floor(Math.random() * qualities.length)],
      nucleicAcidExtraction: qualities[Math.floor(Math.random() * qualities.length)],
      machineQuality: qualities[Math.floor(Math.random() * qualities.length)],
      kitNumber: `KIT-${String(Math.floor(Math.random() * 900) + 100)}`,
    })
  }
  return data.sort((a, b) => b.id - a.id)
}

const UGT1A1QualityControl: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<UGT1A1Item[]>(() => generateMockData(50))
  const [expanded, setExpanded] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [barcodeValue, setBarcodeValue] = useState('')
  const [importModalVisible, setImportModalVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  useEffect(() => {
    setData(generateMockData(50))
  }, [])

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  }

  const handleSearch = () => {
    const formValues = form.getFieldsValue()
    console.log('搜索条件:', formValues)
    message.info('搜索功能开发中')
  }

  const handleReset = () => {
    form.resetFields()
    setData(generateMockData(50))
  }

  const handleDNAImport = () => {
    setImportModalVisible(true)
    setCurrentStep(1)
    setSelectedTemplate('')
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const handleNext = () => {
    if (currentStep === 1 && !selectedTemplate) {
      message.warning('请选择一个模板')
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleUpload = () => {
    message.success('文件上传功能开发中')
    setImportModalVisible(false)
  }

  const handleModalCancel = () => {
    setImportModalVisible(false)
    setCurrentStep(1)
    setSelectedTemplate('')
  }

  const versionGroups: VersionGroup[] = [
    {
      version: '宏石1.0',
      options: [
        {
          id: 'lung-cancer',
          name: '肺癌基因',
          icon: <Dna size={24} />,
          description: 'KNBP基因、BRAF基因',
        },
      ],
    },
    {
      version: '宏石8.2.2',
      options: [
        {
          id: 'msi',
          name: 'MSI基因',
          icon: <Cpu size={24} />,
          description: '需要计算列Tm1、Rm1、Tm2、Rm2列',
        },
        {
          id: 'lung-cancer-3-13',
          name: '肺癌3、肺癌13',
          icon: <Database size={24} />,
          description: 'PIK3CA基因、子宫内膜癌、UGT1A1基因',
        },
        {
          id: 'cervical-cancer',
          name: '宫颈癌基因导入',
          icon: <CheckCircle size={24} />,
          description: '上传前需要删除数据行前后多余的数据',
        },
      ],
    },
  ]

  const handleViewControls = () => {
    Modal.info({
      title: '阴、阳控数据',
      content: (
        <div>
          <p><strong>阴性控制：</strong>CT值 &gt; 35</p>
          <p><strong>阳性控制：</strong>CT值 25-30</p>
          <p><strong>当前状态：</strong>✓ 质控通过</p>
        </div>
      ),
      width: 400,
    })
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

  const handleReagentUsage = () => {
    Modal.info({
      title: '试剂使用情况',
      content: (
        <div>
          <p><strong>当前试剂盒：</strong>KIT-521</p>
          <p><strong>已使用：</strong>120 次</p>
          <p><strong>剩余次数：</strong>80 次</p>
          <p><strong>有效期：</strong>2026-12-31</p>
        </div>
      ),
      width: 400,
    })
  }

  const handleBarcodeSearch = () => {
    if (!barcodeValue) {
      message.warning('请输入条码')
      return
    }
    message.success(`正在查询条码: ${barcodeValue}`)
    setBarcodeValue('')
  }

  const handleNucleicAcidClick = (record: UGT1A1Item) => {
    Modal.info({
      title: '核酸提取详情',
      content: (
        <div>
          <p><strong>样本编号：</strong>{record.sampleNumber}</p>
          <p><strong>检测结果：</strong>{record.nucleicAcidExtraction}</p>
          <p><strong>试剂盒号：</strong>{record.kitNumber}</p>
        </div>
      ),
      width: 400,
    })
  }

  const handleMachineClick = (record: UGT1A1Item) => {
    Modal.info({
      title: '上机质控详情',
      content: (
        <div>
          <p><strong>样本编号：</strong>{record.sampleNumber}</p>
          <p><strong>检测结果：</strong>{record.machineQuality}</p>
          <p><strong>病理号：</strong>{record.pathologyNumber}</p>
        </div>
      ),
      width: 400,
    })
  }

  const columns = [
    {
      title: '样本编号',
      dataIndex: 'sampleNumber',
      key: 'sampleNumber',
      width: 120,
    },
    {
      title: '病理号',
      dataIndex: 'pathologyNumber',
      key: 'pathologyNumber',
      width: 100,
    },
    {
      title: '住院号',
      dataIndex: 'hospitalNumber',
      key: 'hospitalNumber',
      width: 120,
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 140,
    },
    {
      title: '样本质控',
      dataIndex: 'sampleQuality',
      key: 'sampleQuality',
      width: 100,
      render: (text: string) => (
        <Tag color={text === '合格' ? 'green' : text === '不合格' ? 'red' : 'orange'}>
          {text}
        </Tag>
      ),
    },
    {
      title: '核酸提取',
      dataIndex: 'nucleicAcidExtraction',
      key: 'nucleicAcidExtraction',
      width: 120,
      render: (text: string, record: UGT1A1Item) => (
        <Button
          type="link"
          onClick={() => handleNucleicAcidClick(record)}
          className="ant-btn-link"
        >
          <Eye size={14} style={{ marginRight: 4 }} />
          {text}
        </Button>
      ),
    },
    {
      title: '上机质控',
      dataIndex: 'machineQuality',
      key: 'machineQuality',
      width: 120,
      render: (text: string, record: UGT1A1Item) => (
        <Button
          type="link"
          onClick={() => handleMachineClick(record)}
          className="ant-btn-link"
        >
          <Eye size={14} style={{ marginRight: 4 }} />
          {text}
        </Button>
      ),
    },
    {
      title: '试剂盒号',
      dataIndex: 'kitNumber',
      key: 'kitNumber',
      width: 100,
    },
  ]

  return (
    <div className="ugt1a1-quality-page">
      <div className="page-header">
        <h1 className="page-title">UGT1A1项目质控</h1>
      </div>

      <div className="search-panel">
        <Form form={form} className="search-form">
          <Form.Item label="患者姓名" name="patientName">
            <Input placeholder="请输入患者姓名" />
          </Form.Item>
          <Form.Item label="住院号" name="hospitalNumber">
            <Input placeholder="请输入住院号" />
          </Form.Item>
          <Form.Item label="项目名称" name="projectName">
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          {expanded && (
            <Form.Item label="身份证号" name="idCard">
              <Input placeholder="请输入身份证号" />
            </Form.Item>
          )}
          {expanded && (
            <Form.Item label="核酸提取质控" name="nucleicAcidQuality">
              <Select placeholder="请选择">
                <Select.Option value="qualified">合格</Select.Option>
                <Select.Option value="unqualified">不合格</Select.Option>
                <Select.Option value="pending">待检测</Select.Option>
              </Select>
            </Form.Item>
          )}
          {expanded && (
            <Form.Item label="上机质控" name="machineQuality">
              <Select placeholder="请选择">
                <Select.Option value="qualified">合格</Select.Option>
                <Select.Option value="unqualified">不合格</Select.Option>
                <Select.Option value="pending">待检测</Select.Option>
              </Select>
            </Form.Item>
          )}
          <div className="search-actions-wrapper">
            <div className="search-actions">
              <Button onClick={handleReset}>重置</Button>
              <Button type="primary" onClick={handleSearch}>查询</Button>
              <Button
                type="text"
                onClick={() => setExpanded(!expanded)}
                className="expand-btn"
              >
                <span>{expanded ? '收起' : '展开'}</span>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="table-container">
        <div className="table-actions">
          <Space>
            <Button
              type="primary"
              onClick={handleDNAImport}
              icon={<Upload size={16} />}
            >
              DNA数据导入
            </Button>
            <Button
              type="primary"
              onClick={handleViewControls}
              icon={<Eye size={16} />}
            >
              查看阴、阳控数据
            </Button>
            <Button
              type="primary"
              onClick={handleBatchExport}
              icon={<Download size={16} />}
            >
              批量导出
            </Button>
            <Button
              type="primary"
              onClick={handleReagentUsage}
              icon={<FileText size={16} />}
            >
              试剂使用情况
            </Button>
          </Space>
          <div className="barcode-search">
            <Input.Search
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              onSearch={handleBarcodeSearch}
              placeholder="条码查询"
              enterButton
              style={{ width: 220 }}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `共 ${total} 条数据，当前显示 ${range[0]}-${range[1]} 条`,
          }}
          rowKey="id"
        />
      </div>

      <Modal
        title="DNA数据导入"
        open={importModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={700}
        centered
      >
        <Steps current={currentStep - 1} onChange={handleStepChange} style={{ marginBottom: 30 }}>
          <Steps.Step title="选择模板" />
          <Steps.Step title="上传文件" />
        </Steps>

        {currentStep === 1 && (
          <div className="import-step-content">
            <div className="template-groups">
              {versionGroups.map((group) => (
                <div key={group.version} className="template-group">
                  <h3 className="group-title">{group.version}</h3>
                  <div className="template-options">
                    {group.options.map((option) => (
                      <div
                        key={option.id}
                        className={`template-option ${selectedTemplate === option.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTemplate(option.id)}
                      >
                        <div className="option-icon">{option.icon}</div>
                        <div className="option-info">
                          <div className="option-name">{option.name}</div>
                          <div className="option-description">{option.description}</div>
                        </div>
                        {selectedTemplate === option.id && (
                          <CheckCircle size={20} className="option-check" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="import-step-content">
            <div className="upload-section">
              <div className="upload-area">
                <div className="upload-icon">
                  <FolderOpen size={48} />
                </div>
                <p className="upload-text">点击或拖拽文件到此处上传</p>
                <p className="upload-hint">支持 .csv, .xlsx, .txt 格式文件</p>
                <Button type="primary" icon={<Upload size={16} />} onClick={handleUpload}>
                  选择文件
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="modal-footer">
          {currentStep === 1 && (
            <Button type="primary" onClick={handleNext} disabled={!selectedTemplate}>
              下一步
            </Button>
          )}
          {currentStep === 2 && (
            <>
              <Button onClick={handlePrev}>上一步</Button>
              <Button type="primary" onClick={handleUpload}>
                确认上传
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default UGT1A1QualityControl