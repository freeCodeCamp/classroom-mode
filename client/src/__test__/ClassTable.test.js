import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ClassTable from '../components/home/ClassTable'

Enzyme.configure({ adapter: new Adapter() })

describe('ClassTable When Student List Is Empty', () => {
  let mountedClassTable
  const classTable = () => {
    if (!mountedClassTable) {
      mountedClassTable = mount(
        <ClassTable students={[]} errors={['classroom is empty']} />
      )
    }
    return mountedClassTable
  }

  it('always renders a div', () => {
    const divs = classTable().find('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('displays a special message if the student list is empty', () => {
    expect(
      classTable()
        .find('.has-no-students')
        .text()
    ).toEqual('This classroom is empty')
  })

  it('do not display table if student list is empty', () => {
    expect(classTable().find('table').length).toEqual(0)
  })
})

describe('ClassTable When Student List Is Not Empty', () => {
  let mountedClassTable
  const classTable = () => {
    if (!mountedClassTable) {
      mountedClassTable = mount(
        <ClassTable
          students={[
            {
              name: 'Utsab',
              email: 'kdj@dfj',
              notes: 'kdlfj',
              daysInactive: 1,
              newSubmissionsCount: 2,
            },
          ]}
        />
      )
    }
    return mountedClassTable
  }

  it('always renders a div', () => {
    const divs = classTable().find('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('populates student data as a table', () => {
    expect(classTable().find('.ClassTable').length).toEqual(1)
    expect(classTable().find('table').length).toEqual(1)
    expect(classTable().find('th').length).toEqual(6)
    expect(classTable().find('td').length).toEqual(6)
    expect(
      classTable()
        .find('tr')
        .last()
        .childAt(0)
        .text()
    ).toEqual('Utsab')
    expect(
      classTable()
        .find('tr')
        .last()
        .childAt(1)
        .text()
    ).toEqual('kdj@dfj')
    expect(
      classTable()
        .find('tr')
        .last()
        .childAt(2)
        .text()
    ).toEqual('kdlfj')
    expect(
      classTable()
        .find('tr')
        .last()
        .childAt(3)
        .text()
    ).toEqual('1')
    expect(
      classTable()
        .find('tr')
        .last()
        .childAt(4)
        .text()
    ).toEqual('2')
  })

  it('does not render errors div', () => {
    expect(classTable().find('.errors').length).toEqual(0)
  })
})
