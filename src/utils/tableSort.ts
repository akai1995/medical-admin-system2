export interface SortConfig {
  field: string
  order: 'asc' | 'desc'
}

export const sortTableData = <T extends Record<string, any>>(
  data: T[],
  sortField?: string,
  sortOrder: 'asc' | 'desc' = 'desc'
): T[] => {
  if (!sortField) {
    return [...data]
  }

  return [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (!aValue && !bValue) return 0
    if (!aValue) return 1
    if (!bValue) return -1

    const aTime = new Date(aValue).getTime()
    const bTime = new Date(bValue).getTime()

    if (isNaN(aTime) || isNaN(bTime)) {
      return sortOrder === 'desc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    }

    return sortOrder === 'desc' ? bTime - aTime : aTime - bTime
  })
}

export const getPrimaryTimeField = (data: any[]): string | undefined => {
  if (data.length === 0) return undefined

  const timeFields = [
    'applyTime',
    'uploadTime',
    'applicationTime',
    'notifyTime',
    'qualityTime',
    'time',
    'createTime',
    'updateTime',
    'reportTime'
  ]

  const firstItem = data[0]
  for (const field of timeFields) {
    if (firstItem[field]) {
      return field
    }
  }

  return undefined
}

export const sortDataByTime = <T extends Record<string, any>>(
  data: T[],
  sortField?: string
): T[] => {
  const field = sortField || getPrimaryTimeField(data)
  return sortTableData(data, field, 'desc')
}
