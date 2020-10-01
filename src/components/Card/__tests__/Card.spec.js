import SbCard from '../'

import { mount } from '@vue/test-utils'

const factory = propsData => {
  return mount(SbCard, {
    propsData
  })
}

describe('Test Card component', () => {
  it('Test if card component renderer correctly without content', async () => {
    const wrapper = factory({
      title: 'Card Title',
      linkLabel: 'Awesome link name',
      url: 'https://storyblok.com'
    })

    expect(wrapper.find('div').classes('sb-card')).toBe(true)

    expect(wrapper.find('span').text()).toBe('Card Title')
    expect(wrapper.find('span').classes('sb-card--title')).toBe(true)

    expect(wrapper.find('a').text()).toBe('Awesome link name')
    expect(wrapper.find('a').attributes('href')).toBe('https://storyblok.com')
    expect(wrapper.find('a').attributes('title')).toBe('Link to Awesome link name.')
  })

  it('Test if full-width card renderer correctly', async () => {
    const wrapper = factory({
      isFullWidth: true
    })

    expect(wrapper.find('div').classes('sb-card--full-width')).toBe(true)
  })

  it('Test if card renderer without header and footer', async () => {
    const wrapper = factory({
      title: '',
      linkLabel: '',
      url: ''
    })

    expect(wrapper.find('div').classes('sb-card')).toBe(true)

    expect(wrapper.find('div').classes('sb-card--no-labels')).toBe(true)

    expect(wrapper.find('span').exists()).toBe(false)

    expect(wrapper.find('a').exists()).toBe(false)
  })
})
