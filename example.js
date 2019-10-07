import VideoComponent from './src/VideoComponent';

export default class App  extends React.Component{

    render(): boolean | number | string | React$Element<*> | React$Portal | Iterable | null {
        return (
            <VideoComponent videoWidth={640} videoHeight={640}
                            url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}
                            duration={634} title={'Easy Video Player'}/>
        )
    }

}
