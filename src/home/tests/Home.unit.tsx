import * as React from 'react'
import {shallow, ShallowWrapper} from 'enzyme'
import {
    HomePageComponent, HomePageDispatchProps, HomePageStateProps, mapDispatchToProps,
    mapStateToProps
} from '../Home'
import {UIBlocker} from '../../app/reducers/uiBlockers'
import {issueCall} from '../actions/creators'
import {RootState} from '../../app/reducers'

describe('home/Home', () => {
    describe('HomePageComponent', () => {
        let HomeDom: ShallowWrapper
        let blockers: UIBlocker[]
        const onIssueCall = jest.fn()
        beforeEach(() => {
            blockers = [
                {
                    duration: 1,
                    id: '1234',
                    callName: 'callName1',
                    callStart: 5678,
                },
                {
                    duration: 2,
                    id: '456',
                    callName: 'callName2',
                    callStart: 9,
                }
            ]
            HomeDom = shallow(<HomePageComponent onIssueCall={onIssueCall} blockers={blockers}/>)
        })

        it('should have a header', () => {
            const header = HomeDom.find('div.Home h2')
            expect(header).toHaveLength(1)
            expect(header.props().children).toBe('Saga Demo')
        })

        it('should have a button', () => {
            const button = HomeDom.find('button')
            expect(button).toHaveLength(1)
            expect(button.props().onClick).toBe(onIssueCall)
        })

        it('should have a blocking call table', () => {
            const blockersTable = HomeDom.find('table.table')
            expect(blockersTable).toHaveLength(1)
            const tableHeaderData = blockersTable.find('th[scope="col"]')
            expect(tableHeaderData).toHaveLength(3)

            expect(tableHeaderData.children().at(0).text()).toBe('Uid')
            expect(tableHeaderData.children().at(1).text()).toBe('Method Name')
            expect(tableHeaderData.children().at(2).text()).toBe('Duration')
        })

        it('should have 2 blocking calls', () => {
            const tableRows = HomeDom.find('tbody tr')
            expect(tableRows).toHaveLength(2)

            const row1 = tableRows.at(0)
            const row1cells = row1.children()
            expect(row1cells).toHaveLength(3)
            expect(row1cells.get(0).type).toBe('th')
            expect(row1cells.get(0).props.children).toBe('1234')
            const row1cellsTDs = row1cells.find('td')
            expect(row1cellsTDs.at(0).props().children).toBe('callName1')
            expect(row1cellsTDs.at(1).props().children).toBe(1)

            const row2 = tableRows.at(1)
            const row2cells = row2.children()
            expect(row2cells.get(0).type).toBe('th')
            expect(row2cells.get(0).props.children).toBe('456')
            const row2cellsTDs = row2cells.find('td')
            expect(row2cellsTDs.at(0).props().children).toBe('callName2')
            expect(row2cellsTDs.at(1).props().children).toBe(2)
        })
    })

    describe('mapStateToProps', () => {
        const state: RootState = {
            uiBlockers: {
                list: [{
                    id: '1234',
                    callName: 'call1',
                    duration: 1,
                    callStart: 1
                }],
                count: 1
            }
        }
        let result: HomePageStateProps

        beforeEach(() => {
            result = mapStateToProps(state)
        })

        it('should return HomePageStateProps', () => {
            expect(result).toEqual({
                blockers: state.uiBlockers.list
            })
        })
    })

    describe('mapDispatchToProps', () => {
        const dispatchSpy = jest.fn()
        let result: HomePageDispatchProps
        beforeEach(() => {
            result = mapDispatchToProps(dispatchSpy)
        })
        it('should return dispatchProps with onIssueCall', () => {
            result.onIssueCall()

            expect(dispatchSpy).toHaveBeenCalledWith(issueCall())

        })
    })
})