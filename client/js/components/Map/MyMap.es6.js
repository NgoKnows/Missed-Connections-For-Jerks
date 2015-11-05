import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import '../../bouncemaker.es6.js'

import { MAPBOX_KEY } from '../../secret'

export default class MyMap extends Component {
    render() {
        const { center, zoom, events } = this.props;

        return (
            <Map id="map"
                 center={center.toJS()}
                 zoom={zoom}>
                <TileLayer
                    url='http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                    accessToken={MAPBOX_KEY}
                    id='ngoknows.ddd6c31a'
                    detectRetina='true'
                />
                {this._getRows()}
            </Map>
        );
    }

    _getRows() {
        const { events } = this.props;

        return events.map((event, index) => {
            return (
                <Marker position={[event.latitude, event.longitude]}
                        bounceOnAdd={true}
                        bounceOnAddOptions= {{duration: 500, height: 100}}
                        key={event.id}>
                    <Popup>
                        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
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
