import * as React from 'react'
import './Home.css'
import {SFC} from 'react'
import {RootState} from '../app/reducers'
import {issueCall} from './actions/creators'
import {connect, Dispatch} from 'react-redux'
import {UIBlocker} from '../app/reducers/uiBlockers'

export interface HomePageStateProps {
    blockers: UIBlocker[],
}

export interface HomePageDispatchProps {
    onIssueCall: () => void
}

export interface HomeProps extends HomePageStateProps, HomePageDispatchProps {

}

export const HomePageComponent: SFC<HomeProps> = ({blockers, onIssueCall}) =>
    <div className="Home">
        <h2>Saga Demo</h2>
        <div>
            <button onClick={onIssueCall}>Issue a call</button>
        </div>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Uid</th>
                <th scope="col">Method Name</th>
                <th className="duration" scope="col">Duration</th>
            </tr>
            </thead>
            <tbody>
            {blockers.map(({id, callName, duration}) => (
                <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>{callName}</td>
                    <td className="duration">{duration}</td>
                </tr>
            ))}

            </tbody>
        </table>
    </div>

export const mapStateToProps: (_: RootState) => HomePageStateProps = state =>
    ({
        blockers: state.uiBlockers.list
    })

export const mapDispatchToProps = (dispatch: Dispatch<RootState>): HomePageDispatchProps => ({
    onIssueCall: () => dispatch(issueCall()),
})

export const Home = connect<HomePageStateProps, HomePageDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(HomePageComponent)