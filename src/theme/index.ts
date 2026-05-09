export const theme = {
  colors: {
    primary: '#177DDC',
    success: '#49AA19',
    warning: '#D89614',
    danger: '#F53F3F',
    light: {
      text: {
        title: '#000000',
        primary: '#262626',
        secondary: '#595959',
        auxiliary: '#8C8C8C',
        weak: '#B2B2B2',
      },
      background: {
        global: '#F7F7F7',
        card: '#FFFFFF',
        control: '#EBEBEB',
        controlDisabled: '#F5F5F5',
      },
      border: {
        default: '#D9D9D9',
        module: '#E5E5E5',
      },
    },
    dark: {
      text: {
        title: '#FFFFFF',
        primary: '#DCDCDC',
        secondary: '#ADADAD',
        auxiliary: '#7E7E7E',
        weak: '#5B5B5B',
      },
      background: {
        global: '#080808',
        card: '#141414',
        control: '#262626',
        controlDisabled: '#1D1D1D',
      },
      border: {
        default: '#373737',
        module: '#2C2C2C',
      },
    },
    sidebar: {
      light: {
        background: '#FFFFFF',
        border: '#E5E5E5',
        text: {
          default: '#262626',
          hover: '#262626',
          active: '#177DDC',
          disabled: '#B2B2B2',
        },
        state: {
          hover: '#F5F5F5',
          active: '#E7F2FB',
        },
      },
      dark: {
        background: '#141414',
        border: '#2C2C2C',
        text: {
          default: '#DCDCDC',
          hover: '#DCDCDC',
          active: '#177DDC',
          disabled: '#5B5B5B',
        },
        state: {
          hover: '#1D1D1D',
          active: '#141F28',
        },
      },
    },
    header: {
      light: {
        background: '#FFFFFF',
        border: '#E7E7E7',
      },
      dark: {
        background: '#141414',
        border: '#2C2C2C',
      },
    },
  },
  typography: {
    fontSize: {
      level1: '20px',
      level2: '16px',
      level3: '14px',
      level4: '12px',
      level5: '10px',
    },
    fontWeight: {
      medium: 500,
      regular: 400,
    },
    lineHeight: 1.5,
  },
  spacing: {
    pagePadding: '20px',
    moduleMargin: '20px',
    modulePadding: '20px',
    blockPadding: '16px',
    buttonGap: '10px',
  },
  borderRadius: {
    small: '2px',
    medium: '4px',
    large: '6px',
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      ease: 'ease',
      easeInOut: 'ease-in-out',
      modal: 'cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    },
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1280px',
  },
}
