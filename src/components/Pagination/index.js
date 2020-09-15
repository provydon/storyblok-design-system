import './pagination.scss'

import SbIcon from '../Icon'
import SbTooltip from '../Tooltip'

const factorySelectOption = (value, factoryAriaLabel) => {
  return {
    value: value,
    label: value,
    ariaLabel: factoryAriaLabel(value)
  }
}

const buildSelectOptions = (iterations, ...args) => {
  return [...Array(iterations).keys()].map(number => {
    const value = number + 1
    return factorySelectOption(value, ...args)
  })
}

const SbPaginationButton = {
  name: 'SbPaginationButton',

  functional: true,

  props: {
    icon: {
      type: String
    },
    tooltipLabel: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  render (h, { props, listeners }) {
    const { icon, tooltipLabel, disabled } = props

    return h(SbTooltip, {
      props: {
        label: tooltipLabel,
        position: 'bottom'
      }
    }, [
      h('button', {
        staticClass: 'sb-pagination__button',
        attrs: {
          disabled
        },
        class: {
          'sb-pagination__button--disabled': disabled
        },
        on: {
          ...listeners
        }
      }, [
        h(SbIcon, {
          props: {
            name: icon,
            size: 'small'
          }
        })
      ])
    ])
  }
}

const SbPagesContainer = {
  name: 'SbPagesContainer',

  props: {
    pages: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number
    }
  },

  methods: {
    onSelectChange (event) {
      this.$emit('page-change', Number(event.target.value))
    }
  },

  render (h) {
    const pagesOptions = buildSelectOptions(
      this.pages,
      page => `Go to page ${page}`
    )

    return h('div', {
      staticClass: 'sb-pagination__pages-container'
    }, [
      h(SbPaginationSelect, {
        props: {
          options: pagesOptions,
          value: this.currentPage
        },
        on: {
          change: this.onSelectChange
        }
      }),
      h('span', {
        staticClass: 'sb-pagination__placeholder'
      }, 'of 11 pages')
    ])
  }
}

const SbPaginationSelect = {
  name: 'SbPaginationSelect',

  functional: true,

  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number
    }
  },

  render (h, { props, listeners }) {
    const { options } = props

    return h('select', {
      staticClass: 'sb-pagination__select',
      on: {
        ...listeners
      }
    }, [
      ...options.map(option => {
        return h('option', {
          attrs: {
            ...(option.ariaLabel && { 'aria-label': option.ariaLabel }),
            value: option.value,
            selected: props.value === option.value
          }
        }, option.label)
      })
    ])
  }
}

const SbPerPageContainer = {
  name: 'SbPerPageContainer',

  props: {
    perPage: {
      type: Number
    }
  },

  methods: {
    onSelectChange (event) {
      this.$emit('per-page-change', Number(event.target.value))
    }
  },

  render (h) {
    const perPageOptions = [
      factorySelectOption(10, perPage => `Select per page ${perPage} items`),
      factorySelectOption(20, perPage => `Select per page ${perPage} items`),
      factorySelectOption(30, perPage => `Select per page ${perPage} items`),
      factorySelectOption(40, perPage => `Select per page ${perPage} items`)
    ]
    return h('div', {
      staticClass: 'sb-pagination__per-page-container'
    }, [
      h('span', 'Itens per page:'),
      h(SbPaginationSelect, {
        props: {
          options: perPageOptions,
          value: this.perPage
        }
      }),
      h('span', {
        staticClass: 'sb-pagination__placeholder'
      }, '1-10 of 50 items')
    ])
  }
}

const SbPagination = {
  name: 'SbPagination',

  props: {
    value: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      default: 100
    },
    perPage: {
      type: Number,
      default: 10
    }
  },

  computed: {
    pages () {
      return this.total / this.perPage
    },
    isFirstDisabled () {
      return this.value <= 1
    },
    isLastDisabled () {
      return this.value >= this.pages
    }
  },

  methods: {
    handlePreviousPage () {
      if (!this.isFirstDisabled) {
        this.updateValue(this.value - 1)
      }
    },
    handleNextPage () {
      if (!this.isLastDisabled) {
        this.updateValue(this.value + 1)
      }
    },
    onPageChange (page) {
      this.updateValue(page)
    },
    onPerPageChange (perPage) {
      this.$emit('per-page-change', perPage)
    },
    updateValue (value) {
      this.$emit('input', value)
    }
  },

  render (h) {
    const leftArrowButton = h(SbPaginationButton, {
      props: {
        icon: 'chevron-left',
        tooltipLabel: 'Previous page',
        disabled: this.isFirstDisabled
      },
      on: {
        click: this.handlePreviousPage
      }
    })

    const rightArrowButton = h(SbPaginationButton, {
      props: {
        icon: 'chevron-right',
        tooltipLabel: 'Next page',
        disabled: this.isLastDisabled
      },
      on: {
        click: this.handleNextPage
      }
    })

    return h('div', {
      staticClass: 'sb-pagination'
    }, [
      h(SbPerPageContainer, {
        props: {
          total: this.total,
          perPage: this.perPage
        },
        on: {
          'per-page-change': this.onPerPageChange
        }
      }),
      h(SbPagesContainer, {
        props: {
          pages: this.pages,
          currentPage: this.value
        },
        on: {
          'page-change': this.onPageChange
        }
      }),
      leftArrowButton,
      rightArrowButton
    ])
  }
}

export default SbPagination
