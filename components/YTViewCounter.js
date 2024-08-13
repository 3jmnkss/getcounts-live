'use client'
import { useEffect, useState, useRef } from 'react';
import { getVideo } from '../utils/youtube'

export default function YTViewCounter({ t_map }) {
    const t = (key) => t_map[key];

    const videoIdRef = useRef();
    const [videoId, setVideoId] = useState(null)
    const intervalRef = useRef();
    const [panelHeight, setPanelHeight] = useState(200)

    function handleResize() {
        //TODO fix rotation
        setPanelHeight(window.innerHeight - 165)
    }

    useEffect(() => {
        console.log(window.charsToFit)
        window.addEventListener('resize', handleResize)
    })

    useEffect(() => {
        console.log("MUDOU VIDEO ID", videoId)
        if (videoId) {
            intervalRef.current && clearInterval(intervalRef.current);
            var main = document.getElementById('main');
            var alerta = document.getElementById('alerta');
            if (main) main.style.display = 'none';
            if (alerta) alerta.style.display = 'none';
            getVideo(videoId)
            const interval = setInterval(getVideo, 10000, videoId);
            intervalRef.current = interval;
        }
    }, [videoId])

    useEffect(() => {
        handleResize()
        // setVideoId('https://www.youtube.com/watch?v=B1q8dTkaoVk')
    }, [])


    return <div>
        <form style={{ display: "inline" }} action="javascript:void(0);">
            <div id="search" style={{ height: 35, maxWidth: 325, margin: "auto", marginBottom: 20 }}>
                <input
                    ref={videoIdRef}
                    size={40}
                    type="search"
                    id="video-id"
                    placeholder={t('yt-search-video-placeholder')}
                    style={{ height: "100%", width: "80%" }}
                />
                <input
                    type="submit"
                    value={"🔎"}
                    onClick={() => setVideoId(videoIdRef.current.value.trim())}
                    style={{ height: "100%" }}
                />
            </div>
        </form>
        <div
            id="alerta"
            style={{
                display: "none",
                marginTop: "30px !important",
                backgroundColor: "darkred",
                width: "max-content",
                marginTop: 30,
                marginRight: "auto",
                marginBottom: "auto",
                marginLeft: "auto",
                paddingTop: 10,
                paddingBottom: 12,
                color: "white",
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 20
            }}
        >
            ⚠️ {t('video-not-found')}
        </div>
        <div
            id="main"
            style={{
                display: "none",
                marginTop: 10,
                width: "100%",
                height: panelHeight,
                backgroundSize: "cover"
            }}
        >
            <div
                style={{
                    display: 'flex', alignItems: 'center',
                    flexDirection: 'column',
                    width: "100%",
                    height: "100%",
                    backdropFilter: "blur(10px) brightness(40%)"
                }}
            >
                <div
                    id="titulo"
                    style={{ margin: "auto", opacity: "0.8", padding: "0px 25px", marginTop: 40 }}
                />
                <div id="view-counter" style={{
                    flexGrow: 1, display: 'flex', paddingBottom: 50,
                    flexDirection: 'column', justifyContent: 'center'
                }}>
                    <div id="contador" />
                    <div id="timestamp">
                        {t('views-at')} |
                        <span id="clock" style={{ marginLeft: 5 }}>
                            <span id="hours" className="number">
                                00
                            </span>
                            :
                            <span id="minutes" className="number">
                                00
                            </span>
                            :
                            <span id="seconds" className="number">
                                00
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}