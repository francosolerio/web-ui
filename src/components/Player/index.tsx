import * as React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import {Link} from "react-router-dom";
import {getPrettyDate} from "../../utils";

import 'react-h5-audio-player/src/styles.scss'
import './styles.scss'

interface IProps {
    episode?: any
    onPlay?: any
    onPause?: any
    onCanPlay?: any
}

export default class Player extends React.Component<IProps> {
    state = {
        playing: false,
    }

    player = React.createRef<AudioPlayer>()

    constructor(props: IProps) {
        super(props)
        // fix this in handlers
        this.onCanPlay = this.onCanPlay.bind(this)
        this.onPlay = this.onPlay.bind(this)
        this.onPause = this.onPause.bind(this)
    }

    onCanPlay() {
        if (this.props.onCanPlay){
            this.props.onCanPlay()
        }
    }

    play(){
        this.player.current.audio.current.play()
    }

    pause(){
        this.player.current.audio.current.pause()
    }

    onPlay() {
        if (this.props.onPlay){
            this.props.onPlay()
        }
        this.setState({
            playing: true,
        })
    }

    onPause() {
        if (this.props.onPause){
            this.props.onPause()
        }
        this.setState({
            playing: false,
        })
    }

    render() {
        const {episode} = this.props
        const date = getPrettyDate(episode.datePublished)
        return (
            <div className="player-media-controls">
                <AudioPlayer
                    ref={this.player}
                    header={
                        <div className="player-info">
                            <div className="player-show-title">
                                <p title={episode.title}>{episode.title}</p>
                            </div>
                            <div className="player-podcast-name">
                                {episode.feedTitle !== undefined ?
                                    <Link to={`/podcast/${episode.feedId}`} title={episode.feedTitle}>
                                        from: {episode.feedTitle}
                                    </Link>
                                    : ""
                                }
                            </div>
                            <p>
                                <time dateTime={date}>{date}</time>
                            </p>
                        </div>
                    }
                    autoPlayAfterSrcChange={false}
                    autoPlay={false}
                    src={episode.enclosureUrl}
                    onCanPlay={this.onCanPlay}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onEnded={this.onPause}
                    customAdditionalControls={[
                        <a
                            className="player-feed-button"
                            // href={}
                            style={{width: 30}}
                        >
                            {/* <img src={FeedIcon} /> */}
                        </a>,
                    ]}

                />
            </div>
        )
    }
}
