import { mount } from '@vue/test-utils'

import SbPagination from '..'

const factory = propsData => {
  return mount(SbPagination, {
    propsData
  })
}

describe('SbPagination component', () => {
  describe('when use the SbPagination with intial data', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10
    })

    it('should have a per page select information with correct state', () => {
      expect(
        wrapper.find('[data-testid="per-page-select"]').element.value
      ).toBe('10')
    })

    it('should have a page select information with correct state', () => {
      expect(
        wrapper.find('[data-testid="page-select"]').element.value
      ).toBe('1')
    })

    it('should have the previous button disabled', () => {
      expect(
        wrapper.find('[data-testid="pagination-previous-button"]').element.disabled
      ).toBe(true)
    })

    it('should have a text showing how many pages are', () => {
      expect(
        wrapper.findAll('.sb-pagination__placeholder').at(1).text()
      ).toBe('of 10 pages')
    })
  })

  describe('when pass a specific page property', () => {
    const wrapper = factory({
      value: 3,
      total: 100,
      perPage: 25
    })

    it('should have the page select with this specific page', () => {
      expect(
        wrapper.find('[data-testid="page-select"]').element.value
      ).toBe('3')
    })

    it('should not have the previous and next buttons disabled', () => {
      expect(
        wrapper.find('[data-testid="pagination-previous-button"]').element.disabled
      ).toBe(false)

      expect(
        wrapper.find('[data-testid="pagination-next-button"]').element.disabled
      ).toBe(false)
    })
  })

  describe('when pass a specific perPage property', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 20
    })

    it('should have the per page select with this specific value', () => {
      expect(
        wrapper.find('[data-testid="per-page-select"]').element.value
      ).toBe('20')
    })

    it('should have the correct text with how many pages information', () => {
      expect(
        wrapper.findAll('.sb-pagination__placeholder').at(1).text()
      ).toBe('of 5 pages')
    })
  })

  describe('when changes the perPage by using the select', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10
    })

    beforeEach(async () => {
      await wrapper.find('[data-testid="per-page-select"]').setValue(20)

      await wrapper.vm.$nextTick()
    })

    it('should emit the per-page-change event with the value select', () => {
      // getting the first result from first emit
      expect(wrapper.emitted('per-page-change')[0][0]).toBe(20)
    })

    it('should update the text with how many pages information', async () => {
      await wrapper.setProps({
        perPage: 20
      })
      expect(
        wrapper.findAll('.sb-pagination__placeholder').at(1).text()
      ).toBe('of 5 pages')
    })
  })

  describe('when changes the page by using the select', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10
    })

    beforeEach(async () => {
      await wrapper.find('[data-testid="page-select"]').setValue(4)

      await wrapper.vm.$nextTick()
    })

    it('should emit the input event with the value selected', () => {
      expect(wrapper.emitted('input')[0][0]).toBe(4)
    })
  })
})