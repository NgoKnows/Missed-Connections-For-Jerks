import React, { Component, PropTypes } from 'react';
import Radium from 'radium'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { MAPBOX_KEY } from '../../secret'

require('../../bouncemaker.es6.js')


export default class MyMap extends Component {
    //constructor(props) {
    //    super(props)
    //}

    render() {
        const { center, zoom, events } = this.props;

        return (
            <Map id="map"
                 center={center}
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
                        bounceOnAddCallback={() => console.log("done")}
                        key={index}>
                    <Popup>
                        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                    </Popup>
                </Marker>
            )
        })
    }
}

Map.propTypes = {};
Map.defaultProps = {};
