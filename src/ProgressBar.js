import React from "react";
import Slider from '@react-native-community/slider';
import {View,Text,StyleSheet} from "react-native";


interface Props {
    currentTime: number;
    duration: number;
    onSlideCapture: (data: {seekTime: number}) => void;
    onSlideStart: () => void;
    onSlideComplete: () => void;
}


export const VideoProgressBar =({currTime,duration,onSlideCapture,onSlideStart,onSlideComplete})=>{
    const pos=getMinFromSec(currTime),fullDuration=getMinFromSec(duration);

    return(
        <View style={styled.wrapper}>
            <Slider
                value={currTime}
                minimumValue={0} maximumValue={duration}
                step={1} onValueChange={handleOnSlide}
                onSlidingStart={onSlideStart} onSlidingComplete={onSlideComplete}
                minimumTrackTintColor={'#F44336'} maximumTrackTintColor={'#ffffff'} />
                <View style={styled.timeWrapper}>
                    <Text style={styled.timeLeft}>{pos}</Text>
                    <Text style={styled.timeRight}>{fullDuration}</Text>
                </View>
        </View>
    );

    function handleOnSlide(time: number)  {
        onSlideCapture({seekTime: time});
    }

}


function getMinFromSec(time: number) {

    const min=time>=60?Math.floor(time/60):0;
    const sec=Math.floor(time-min*60);

    return `${min>=10?min:'0'+min}:${sec>=10?sec:'0'+sec}`;

}

const styled=StyleSheet.create({
    wrapper: {
        flex: 1
    },
    timeWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    timeLeft: {
        flex: 1,
        fontSize: 16,
        color: '#ffffff',
        paddingLeft: 10
    },
    timeRight:{
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'right',
        paddingRight: 10,
    }
});




