import VideoPlayer from './src/VideoPlayer';

export default class App  extends React.Component{

    render(): boolean | number | string | React$Element<*> | React$Portal | Iterable | null {
        return (
            <VideoPlayer 
                            url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}
                            text={'Lorem Ipsum dolor iset'}/>
        )
    }

}
