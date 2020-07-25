import React from "react";
import {View, TouchableOpacity, StyleSheet, Text, Image} from "react-native";
//import {VideoSkipBack,VideoSkipForward,VideoPause,VideoPlay,VideoPrevious,VideoNext} from "../../../assets/icons";
//"react-native-video": "^4.4.5",
import * as PropTypes from 'prop-types';
import VideoSkipBack from '../icons/video-backward.png';
import VideoSkipForward from '../icons/video-forward.png';
import VideoPause from '../icons/video-pause.png';
import VideoPlay from '../icons/video-play.png';
import VideoNext from '../icons/video-next.png';
import VideoPrevious from'../icons/video-previous.png';

export const PlayerControls=({playing,showPreviousAndNext,showSkip,prevDisabled,nextDisabled,onPlay,onPause,skipFwd,skipBack,onNext,onPrev})=>(
    <View style={styled.wrapper}>
        {showPreviousAndNext&&(
            <TouchableOpacity
                style={[styled.touchable,prevDisabled&&styled.touchableDisabled]}
                onPress={onPrev}
                disabled={prevDisabled}>
                <Image source={VideoPrevious} />
            </TouchableOpacity>
        )}

        {showSkip&&(
            <TouchableOpacity style={styled.touchable} onPress={skipBack}>
                <Image source={VideoSkipBack} />
            </TouchableOpacity>
        )}

        <TouchableOpacity
            style={styled.touchable} onPress={playing?onPause:onPlay}>
            {playing?<Image source={VideoPause} />:<Image source={VideoPlay} />}
        </TouchableOpacity>

        {showSkip&&(
            <TouchableOpacity style={styled.touchable} onPress={skipFwd}>
                <Image source={VideoSkipForward} />
            </TouchableOpacity>
        )}

        {showPreviousAndNext&&(
            <TouchableOpacity style={[styled.touchable,nextDisabled&&styled.touchableDisabled]}
                              onPress={onNext} disabled={nextDisabled}>
                <Image source={VideoNext} />
            </TouchableOpacity>
        )}

    </View>
);

PlayerControls.PropTypes={
    playing: PropTypes.bool,
    showPreviousAndNext: PropTypes.bool,
    showSkip: PropTypes.bool,
    prevDisabled: PropTypes.bool,
    nextDisabled: PropTypes.bool,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    skipFwd: PropTypes.func,
    skipBack: PropTypes.func,
    onNext: PropTypes.func,
    onPrev: PropTypes.func
};


const styled=StyleSheet.create({
    wrapper:{
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 3
    },
    touchable: {
        padding: 5
    },
    touchableDisabled:{
        opacity: 0.3
    }
});

