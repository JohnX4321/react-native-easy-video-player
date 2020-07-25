import React,{useState,useEffect} from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    StatusBar,
    Image, Alert
} from "react-native";
import Video,{OnSeekData,OnLoadData,OnProgressData} from "react-native-video";
import Orientation from "react-native-orientation-locker";
import FullscreenClose from '../icons/fullscreen-close.png';
import FullscreenOpen from '../icons/fullscreen-open.png';

import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import * as Progress from 'react-native-progress';



export const VideoPlayer=({uri,text})=>{
    let videoRef=React.createRef();

    interface VState {
        fullscreen: boolean,
        play: boolean,
        currTime: boolean,
        duration: number,
        showControls: number
    }


    const [state,setState]=useState({
        fullscreen: false,
        play: false,
        currTime: 0,
        duration: 0,
        showControls: true
    });
    useEffect(()=>{
        Orientation.addOrientationListener(handleOrientation);

        return ()=>{
            Orientation.removeOrientationListener(handleOrientation);
        };
    },[]);

    const renderBuffer=()=>(
        <Progress.Circle size={30} indeterminate={true} />
    )


    return (

        <View style={styled.container}>
            <TouchableWithoutFeedback onPress={showControlsFunction}>
                <View>
                    <Video ref={(ref)=>{videoRef=ref}}
                           source={{uri: uri}}
                           style={state.fullscreen?styled.fullscreenVideo:styled.video}
                           controls={false}
                           resizeMode={'contain'} onLoad={onLoadEnd} onProgress={onProgress}
                           onError={()=>Alert.alert("Error","Unable to load Video. Try again later. If the problem persists, report the bug",{cancelable: true})}
                           onBuffer={renderBuffer}
                           onEnd={onEnd} paused={!state.play} />


                        <View style={styled.controlOverlay}>
                            <TouchableOpacity onPress={handleFullscreen} hitSlop={{top: 10,bottom: 10,left: 10,right: 10}} style={styled.fullscreenButton}>
                                {state.fullscreen?<Image source={FullscreenClose} style={{width: 24,height: 24}}/>:<Image source={FullscreenOpen} style={{width: 24,height: 24}}/>}
                            </TouchableOpacity>

                            <PlayerControls
                                onPlay={handlePlayPause}
                                onPause={handlePlayPause}
                                playing={state.play}
                                showPreviousAndNext={false}
                                showSkip={false}
                                skipBack={skipBackward}
                                skipFwd={skipForward} />

                                <VideoProgressBar
                                    currTime={state.currTime}
                                    duration={state.duration>0?state.duration:0}
                                    onSlideStart={handlePlayPause}
                                    onSlideComplete={handlePlayPause}
                                    onSlideCapture={onSeek} />


                        </View>

                </View>
            </TouchableWithoutFeedback>

            <ScrollView>
                <Text style={styled.text}>
                    {text}
                </Text>
            </ScrollView>

        </View>

    );


    function handleOrientation(orientation) {

        orientation==='LANDSCAPE-LEFT'||orientation==='LANDSCAPE-RIGHT'
        ?(setState(s=>({...s,fullscreen: true})),StatusBar.setHidden(true))
            :(setState(s=>({...s,fullscreen: false})),StatusBar.setHidden(false));

    }

    function handleFullscreen() {
        state.fullscreen?Orientation.unlockAllOrientations():Orientation.lockToLandscapeLeft();
    }

    function handlePlayPause() {
        if (state.play) {
            setState({...state,play: false,showControls: true});
            return;
        }

        setState({...state,play: true});
        setTimeout(()=>setState(s=>({...s,showControls: false})),2000);
    }


    function skipBackward() {
        videoRef.seek(state.currTime-15);
        setState({...state,currTime: state.currTime-15});
    }

    function skipForward() {
        videoRef.seek(state.currTime+15);
        setState({...state,currTime: state.currTime+15});
    }


    function onSeek(data) {
        videoRef.seek(data.seekTime);
        setState({...state,currTime: data.seekTime});
    }


    function onLoadEnd(data) {
        setState(s => ({
            ...s,
            duration: data.duration,
            currTime: data.currentTime,
        }));
    }

    function onProgress(data) {
        setState(s => ({
            ...s,
            currTime: data.currentTime,
        }));
    }

    function onEnd() {
        setState({...state, play: false});
        videoRef.seek(0);
    }

    function showControlsFunction() {
        state.showControls
            ? setState({...state, showControls: false})
            : setState({...state, showControls: true});
    }


}


const styled=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ebebeb'
    },
    video:{
        height: Dimensions.get("window").width*(9/16),
        width: Dimensions.get("window").width,
        backgroundColor: 'black',
    },
    fullscreenVideo :{
        height: Dimensions.get("window").width,
        width: Dimensions.get("window").height,
        backgroundColor: 'black'
    },
    text:{
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 15,
        textAlign: 'justify'
    },
    fullscreenButton:{
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: 10
    },
    controlOverlay:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000c4',
        justifyContent: 'space-between'
    }
});
