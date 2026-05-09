import { theme } from './index'

export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: ${theme.typography.fontSize.level3};
    line-height: ${theme.typography.lineHeight};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    transition: background-color ${theme.animation.duration.normal} ${theme.animation.easing.easeInOut};
  }

  .light-theme {
    background-color: ${theme.colors.light.background.global};
    color: ${theme.colors.light.text.primary};
  }

  .dark-theme {
    background-color: ${theme.colors.dark.background.global};
    color: ${theme.colors.dark.text.primary};
  }

  .light-theme .ant-layout {
    background-color: ${theme.colors.light.background.global};
  }

  .dark-theme .ant-layout {
    background-color: ${theme.colors.dark.background.global};
  }

  .light-theme .ant-layout-sider {
    background-color: ${theme.colors.sidebar.light.background};
    border-right: 1px solid ${theme.colors.sidebar.light.border};
  }

  .dark-theme .ant-layout-sider {
    background-color: ${theme.colors.sidebar.dark.background};
    border-right: 1px solid ${theme.colors.sidebar.dark.border};
  }

  .light-theme .ant-layout-header {
    background-color: ${theme.colors.header.light.background};
    border-bottom: 1px solid ${theme.colors.header.light.border};
  }

  .dark-theme .ant-layout-header {
    background-color: ${theme.colors.header.dark.background};
    border-bottom: 1px solid ${theme.colors.header.dark.border};
  }

  .light-theme .ant-card {
    background-color: ${theme.colors.light.background.card};
    border: 1px solid ${theme.colors.light.border.default};
  }

  .dark-theme .ant-card {
    background-color: ${theme.colors.dark.background.card};
    border: 1px solid ${theme.colors.dark.border.default};
  }

  .light-theme .ant-table {
    background-color: ${theme.colors.light.background.card};
  }

  .dark-theme .ant-table {
    background-color: ${theme.colors.dark.background.card};
  }

  .light-theme .ant-table-thead > tr > th {
    background-color: ${theme.colors.light.background.control};
    color: ${theme.colors.light.text.secondary};
  }

  .dark-theme .ant-table-thead > tr > th {
    background-color: ${theme.colors.dark.background.control};
    color: ${theme.colors.dark.text.secondary};
  }

  .light-theme .ant-input {
    background-color: ${theme.colors.light.background.card} !important;
    border-color: ${theme.colors.light.border.default} !important;
    color: ${theme.colors.light.text.primary} !important;
  }

  .light-theme .ant-input-outlined {
    background-color: ${theme.colors.light.background.card} !important;
    border-color: ${theme.colors.light.border.default} !important;
    color: ${theme.colors.light.text.primary} !important;
  }

  .dark-theme .ant-input {
    background-color: ${theme.colors.dark.background.card} !important;
    border-color: ${theme.colors.dark.border.default} !important;
    color: ${theme.colors.dark.text.primary} !important;
  }

  .dark-theme .ant-input-outlined {
    background-color: ${theme.colors.dark.background.card} !important;
    border-color: ${theme.colors.dark.border.default} !important;
    color: ${theme.colors.dark.text.primary} !important;
  }

  .dark-theme .ant-input-outlined:hover {
    border-color: ${theme.colors.dark.border.default} !important;
  }

  .dark-theme .ant-input-outlined:focus {
    border-color: ${theme.colors.dark.border.default} !important;
  }

  .light-theme .ant-select-selector {
    background-color: ${theme.colors.light.background.card} !important;
    border-color: ${theme.colors.light.border.default} !important;
    color: ${theme.colors.light.text.primary} !important;
  }

  .light-theme .ant-select-outlined .ant-select-selector {
    background-color: ${theme.colors.light.background.card} !important;
    border-color: ${theme.colors.light.border.default} !important;
    color: ${theme.colors.light.text.primary} !important;
  }

  .dark-theme .ant-select-selector {
    background-color: ${theme.colors.dark.background.card} !important;
    border-color: ${theme.colors.dark.border.default} !important;
    color: ${theme.colors.dark.text.primary} !important;
  }

  .dark-theme .ant-select-outlined .ant-select-selector {
    background-color: ${theme.colors.dark.background.card} !important;
    border-color: ${theme.colors.dark.border.default} !important;
    color: ${theme.colors.dark.text.primary} !important;
  }

  .dark-theme .ant-select-outlined:hover .ant-select-selector {
    border-color: ${theme.colors.dark.border.default} !important;
  }

  .dark-theme .ant-select-outlined:focus .ant-select-selector {
    border-color: ${theme.colors.dark.border.default} !important;
  }

  .light-theme .ant-picker {
    background-color: ${theme.colors.light.background.card} !important;
    border-color: ${theme.colors.light.border.default} !important;
    color: ${theme.colors.light.text.primary} !important;
  }

  .dark-theme .ant-picker {
    background-color: ${theme.colors.dark.background.card} !important;
    border-color: ${theme.colors.dark.border.default} !important;
    color: ${theme.colors.dark.text.primary} !important;
  }

  .light-theme .ant-input-number {
    background-color: ${theme.colors.light.background.card} !important;
    border-color: ${theme.colors.light.border.default} !important;
    color: ${theme.colors.light.text.primary} !important;
  }

  .dark-theme .ant-input-number {
    background-color: ${theme.colors.dark.background.card} !important;
    border-color: ${theme.colors.dark.border.default} !important;
    color: ${theme.colors.dark.text.primary} !important;
  }

  .light-theme .ant-input-textarea {
    background-color: ${theme.colors.light.background.card} !important;
    border-color: ${theme.colors.light.border.default} !important;
    color: ${theme.colors.light.text.primary} !important;
  }

  .dark-theme .ant-input-textarea {
    background-color: ${theme.colors.dark.background.card} !important;
    border-color: ${theme.colors.dark.border.default} !important;
    color: ${theme.colors.dark.text.primary} !important;
  }

  .light-theme .ant-btn {
    border-radius: ${theme.borderRadius.medium};
  }

  .dark-theme .ant-btn {
    border-radius: ${theme.borderRadius.medium};
  }

  .light-theme .ant-btn-primary {
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  .dark-theme .ant-btn-primary,
  .dark-theme .ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid {
    background-color: ${theme.colors.primary} !important;
    border-color: ${theme.colors.primary} !important;
    color: #ffffff !important;
  }

  .dark-theme .ant-btn-primary:hover,
  .dark-theme .ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid:hover {
    background-color: #0f63b3 !important;
    border-color: #0f63b3 !important;
    color: #ffffff !important;
  }

  .light-theme .ant-menu {
    background-color: transparent;
    border-right: none;
  }

  .dark-theme .ant-menu {
    background-color: transparent;
    border-right: none;
  }

  .light-theme .ant-menu-item {
    color: ${theme.colors.sidebar.light.text.default};
  }

  .dark-theme .ant-menu-item {
    color: ${theme.colors.sidebar.dark.text.default};
  }

  .light-theme .ant-menu-item:hover {
    background-color: ${theme.colors.sidebar.light.state.hover};
    color: ${theme.colors.sidebar.light.text.hover};
  }

  .dark-theme .ant-menu-item:hover {
    background-color: ${theme.colors.sidebar.dark.state.hover};
    color: ${theme.colors.sidebar.dark.text.hover};
  }

  .light-theme .ant-menu-item-selected {
    background-color: ${theme.colors.sidebar.light.state.active};
    color: ${theme.colors.sidebar.light.text.active};
  }

  .dark-theme .ant-menu-item-selected {
    background-color: ${theme.colors.sidebar.dark.state.active};
    color: ${theme.colors.sidebar.dark.text.active};
  }

  .light-theme .ant-menu-item-selected .anticon {
    color: ${theme.colors.sidebar.light.text.active};
  }

  .dark-theme .ant-menu-item-selected .anticon {
    color: ${theme.colors.sidebar.dark.text.active};
  }

  .light-theme .ant-modal-content {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }

  .dark-theme .ant-modal-content {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }

  .light-theme .ant-modal-content .ant-modal-header {
    border-bottom: 1px solid ${theme.colors.light.border.module} !important;
    margin-bottom: 24px !important;
    padding-bottom: 12px !important;
  }

  .dark-theme .ant-modal-content .ant-modal-header {
    border-bottom: 1px solid ${theme.colors.dark.border.module} !important;
    margin-bottom: 24px !important;
    padding-bottom: 12px !important;
  }

  .light-theme .ant-modal-title {
    color: ${theme.colors.light.text.title} !important;
    font-weight: 500 !important;
    display: flex !important;
    align-items: center !important;
  }

  .dark-theme .ant-modal-title {
    color: ${theme.colors.dark.text.title} !important;
    font-weight: 500 !important;
    display: flex !important;
    align-items: center !important;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .ant-layout-sider {
      position: fixed !important;
      z-index: 1000;
      height: 100vh;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .ant-layout-sider {
      width: 100% !important;
      max-width: 100% !important;
    }
  }
`
