import React, {Component} from 'react';

import {View,Button} from 'react-native';
import * as proptypes from 'prop-types';
import {TouchableOpacity,Linking,Text} from 'react-native';
//import VideoPlayer from 'react-native-video-player';
import VideoPlayer from './VideoPlayer';

import Icon from 'react-native-vector-icons/MaterialIcons';



export default class VideoComponent extends Component {


    constructor(props) {
        super(props);

    }


    render() {
        return (

            <View>

                <Text style={{ fontSize: 22, marginTop: 22 }}>{this.props.title!=null?this.props.title:'Easy Video Player'}</Text>

                <VideoPlayer

                    // endWithThumbnail

                    // thumbnail={{ uri: this.state.thumbnailUrl }}

                    video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }}

                    videoWidth={640}

                    videoHeight={640}

                    duration={634}

                    ref={r => this.player = r}

                />



                <TouchableOpacity onPress={()=>this.player.stop()} style={{justifyContent: 'center',margin: 0,flexDirection: 'row',alignItems: 'center'}}>
                    <Icon name={'stop'} size={42} style={{padding: 0,color: 'red',borderRadius: 5,
                    borderColor: 'black',
                    borderStyle: 'dotted',
                    borderWidth: 4 }} />
                </TouchableOpacity>

            </View>

        );
    }
}


VideoComponent.propTypes={
    title: proptypes.string,
    url: proptypes.string.isRequired,
    thumbnailUrl: proptypes.string,
    videoWidth: proptypes.number,
    videoHeight: proptypes.number,
    duration: proptypes.number.isRequired
}

VideoComponent.defaultProps={
    videoWidth: 640,
    videoHeight: 640,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
}



