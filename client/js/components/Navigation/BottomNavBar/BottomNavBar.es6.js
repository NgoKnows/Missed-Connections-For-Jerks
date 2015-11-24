import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

@Radium
export default class BottomNavBar extends Component {
    render() {
        const { actions } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.navButton}
                     onClick={() => actions.updatePath('/')}
                     key={1}>
                    <i style={STYLES.icon} className="fa fa-map" />
                    <span>Map</span>
                </div>
                <div style={STYLES.navButton}
                     onClick={() => actions.updatePath('/list')}
                     key={2}>
                    <i style={STYLES.icon} className="fa fa-list" />
                    <span>List</span>
                </div>
                <div style={STYLES.navButton}
                     onClick={() => actions.updatePath('/form')}
                     key={3}>
                    <i style={STYLES.icon} className="fa fa-user-times" />
                    <span>Submit an asshole!</span>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container:{
        alignItems      : 'center',
        backgroundColor : 'rgb(178,89,79)',
        bottom          : 0,
        display         : 'flex',
        flexDirection   : 'row',
        height          : '3.5rem',
        justifyContent  : 'space-around',
        opacity         : 0.95,
        position        : 'absolute',
        width           : '80vw',
        zIndex          : 999
    },

    navButton: {
        color    : 'rgba(242, 241, 239, 0.95)',
        fontSize : '1.75rem',
        ':hover' : {
            filter : 'blur(1px)',
            cursor : 'pointer'
        }
    },

    icon: {
        marginRight: '1rem',
    }
};

BottomNavBar.propTypes = {};
BottomNavBar.defaultProps = {};
