import * as React from 'react'
import {shallow, ShallowWrapper} from 'enzyme'
import {AppComponent, AppStateProps, mapStateToProps} from '../App'
import {NavLink} from 'react-router-dom'
import {RootState} from '../reducers'

describe('app/App', () => {

    describe('component', () => {

        let AppComponentDom: ShallowWrapper

        describe('when not issuing calls', () => {
            beforeEach(() => {
                AppComponentDom = shallow(<AppComponent uiBlocked={false}/>)
            })

            it('should have a header with an paused image', () => {
                const home = AppComponentDom.find('div.Home')
                expect(home).toHaveLength(1)
                const homeHeader = home.find('div.Home-header')
                expect(homeHeader).toHaveLength(1)
                const logo = homeHeader.find('img.Home-logo')
                expect(logo).toHaveLength(1)
                const {src, className, alt} = logo.props()
                expect(src).toBe('test-file-stub')
                expect(className).toBe('Home-logo paused')
                expect(alt).toBe('logo')
            })

            it('should have a navigation bar', () => {
                const nav = AppComponentDom.find('nav.navbar-inverse.navbar-default')
                expect(nav).toHaveLength(1)
                const navLinks = nav.find(NavLink)
                expect(navLinks.at(0).props().children).toBe('Home')
                expect(navLinks.at(0).props().to).toBe('/')
                expect(navLinks.at(1).props().children).toBe('Page 1')
                expect(navLinks.at(1).props().to).toBe('/test1')
                expect(navLinks.at(2).props().children).toBe('Page 2')
                expect(navLinks.at(2).props().to).toBe('/test2')
                expect(navLinks.at(3).props().children).toBe('Page 3')
                expect(navLinks.at(3).props().to).toBe('/test3')
                expect(navLinks.at(4).props().children).toBe('Page 4')
                expect(navLinks.at(4).props().to).toBe('/test4')
            })
        })

        describe('when issuing blocking calls', () => {
            beforeEach(() => {
                AppComponentDom = shallow(<AppComponent uiBlocked={true}/>)
            })

            it('should have a header with an animated image', () => {
                const logo = AppComponentDom.find('img.Home-logo')
                expect(logo.hasClass('busy')).toBe(true)
            })
        })
    })

    describe('mapStateToProps', () => {
        let initialState: RootState

        let result: AppStateProps

        describe('UI is blocked', () => {

            beforeEach(() => {
                initialState = {
                    uiBlockers: {
                        list: [
                            {
                                callStart: 0,
                                callName: 'name1',
                                id: '1234',
                                duration: 1000,
                            }
                        ],
                        count: 1
                    }
                }
                result = mapStateToProps(initialState)
            })

            it('should return new state indicating ui blockage', () => {
                expect(result).toEqual({
                    uiBlocked: true
                })
            })
        })

        describe('UI is not blocked', () => {
            beforeEach(() => {
                initialState = {
                    uiBlockers: {
                        list: [],
                        count: 0
                    }
                }
                result = mapStateToProps(initialState)
            })
            it('should return a state indicating no ui blockage', () => {
                initialState.uiBlockers.list = []
                initialState.uiBlockers.count = 0
                result = mapStateToProps(initialState)
                expect(result).toEqual({
                    uiBlocked: false
                })
            })
        })
    })
})