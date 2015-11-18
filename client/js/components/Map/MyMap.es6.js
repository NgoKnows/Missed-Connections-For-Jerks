import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import '../../bouncemaker.es6.js'

import { MAPBOX_KEY } from '../../secret'
import EventPopUp from './PopUp/EventPopUp.es6'

export default class MyMap extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.ui.get('openPopup') && prevProps.ui.get('openPopup') !== this.props.ui.get('openPopup')) {
            this.popup.leafletElement.openOn(this.map.getLeafletElement());
        }
    }

    render() {
        const { actions, center, zoom } = this.props;

        return (
            <Map
                id="map"
                center={center.toJS()}
                onClick={() => actions.hideAutocomplete()}
                onMoveEnd={this._updateCenter.bind(this, actions)}
                onZoomEnd={(event) => actions.setZoom(event.target._zoom)}
                onPopupClose={() => setTimeout(() => actions.openPopup(''), 1)}
                ref={(ref) => this.map = ref}
                zoom={zoom}
            >
                <TileLayer
                    url='http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                    accessToken={MAPBOX_KEY}
                    id='ngoknows.ddd6c31a'
                    detectRetina='true'
                />
                {this._getEventMarkers()}
            </Map>
        );
    }

    _updateCenter(actions) {
        try {
            let center = this.map.getLeafletElement().getCenter();
            actions.setCenter(center.lat, center.lng)
        } catch(err) {
            //error will freeze ui, but doesn't actually matter(?)
        }
    }

    _getEventMarkers() {
        const { events, ui } = this.props;

        const currentOpenPopup = ui.get('openPopup');

        return events.map((event, index) => {
            return (
                <Marker
                    position={[event.latitude, event.longitude]}
                    bounceOnAdd={true}
                    bounceOnAddOptions= {{duration: 500, height: 100}}
                    key={event.id}
                >
                    <Popup
                        ref={(ref) => currentOpenPopup === event.id ? this.popup = ref : null}
                    >
                        <EventPopUp event={event} />
                    </Popup>
                </Marker>
            )
        })
    }
}

MyMap.propTypes = {
    center : ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    events : ImmutablePropTypes.listOf(ImmutablePropTypes.recordOf({
        address    : PropTypes.string,
        content    : PropTypes.string,
        factual_id : PropTypes.string,
        id         : PropTypes.string,
        latitude   : PropTypes.number,
        locality   : PropTypes.string,
        longitude  : PropTypes.number,
        place_name : PropTypes.string,
        title      : PropTypes.string,
        user       : PropTypes.string,
        blah       : PropTypes.string
    })).isRequired,
    zoom : PropTypes.number.isRequired
};
