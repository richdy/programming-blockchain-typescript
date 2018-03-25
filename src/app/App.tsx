import * as React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom'
import {Home} from '../home/Home'
import './App.css'
import logo from './react.svg'
import {RootState} from './reducers'
import {connect} from 'react-redux'

const activeStyle = {color: '#fff', backgroundColor: '#080808'}

export interface AppStateProps {
    uiBlocked: boolean
}

export class AppComponent extends React.Component<AppStateProps> {

    constructor(props: AppStateProps) {
        super(props)
    }

    public render() {
        const { uiBlocked } = this.props

        return (
            <div className="container">
                <div>
                    <div className="Home">
                        <div className="Home-header">
                            <img src={logo} className={`Home-logo ${uiBlocked === true ? 'busy' : 'paused'}`} alt="logo"/>
                        </div>
                    </div>
                    <nav className="navbar navbar-inverse navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                        data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                </button>

                            </div>
                            <div id="navbar" className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    <li><NavLink exact={true} to="/" activeStyle={activeStyle}>Home</NavLink></li>
                                    <li><NavLink to="/test1" activeStyle={activeStyle}>Page 1</NavLink></li>
                                    <li><NavLink to="/test2" activeStyle={activeStyle}>Page 2</NavLink></li>
                                    <li><NavLink to="/test3" activeStyle={activeStyle}>Page 3</NavLink></li>
                                    <li><NavLink to="/test4" activeStyle={activeStyle}>Page 4</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                </Switch>

            </div>
        )
    }
}

export const mapStateToProps = (state: RootState):AppStateProps => ({uiBlocked: state.uiBlockers.count > 0})

export const App = connect<AppStateProps>(mapStateToProps)(AppComponent)
