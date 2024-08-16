'use client'
import { extractChannelId, populaInscritosCanal, puxarDetalhesCanal } from '../utils/youtube'
import { useEffect, useState, useRef } from 'react';

const isProd = process.env.NODE_ENV === 'production'
const isDevBuild = process.env.NEXT_PUBLIC_DEV_BUILD === 'true'

export default function YTViewCounter({ t_map }) {
    const t = (key) => t_map[key];

    const videoIdRef = useRef();
    const intervalRef = useRef();
    const [videoId, setVideoId] = useState(null)
    const [panelHeight, setPanelHeight] = useState(200)
    const [showAlert, setShowAlert] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [plusMarginTopTitle, setPlusMarginTopTitle] = useState(0)

    function handleResize() {
        setPanelHeight(
            Math.max(325,
                window.scrollY ?
                    (window.innerHeight + 50) :
                    (window.innerHeight - 165)))
        setPlusMarginTopTitle(window.scrollY ? 40 : 0)
    }

    async function getYoutubeChannelSubscribers(channelId) {
        const [extractedChannelId, forHandle] = await extractChannelId(channelId);
        const detalhesCanal = await puxarDetalhesCanal(extractedChannelId, forHandle);
        populaInscritosCanal(detalhesCanal)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleResize)
    })

    useEffect(() => {
        (!isProd || isDevBuild) && console.log("MUDOU VIDEO ID", videoId)
        if (videoId) {
            clearInterval(intervalRef.current);
            setShowAlert(false); setShowPanel(false);
            getYoutubeChannelSubscribers(videoId)
                .then(() => {
                    const interval = setInterval(getYoutubeChannelSubscribers, 10000, videoId);
                    intervalRef.current = interval;
                    setShowPanel(true); setShowAlert(false);
                })
                .catch(error => {
                    console.error(error)
                    setShowPanel(false); setShowAlert(true);
                })
        }
    }, [videoId])

    useEffect(() => {
        handleResize();
        (!isProd || isDevBuild) && setVideoId('VI4JjLiqNl4')

        return () => {
            (!isProd || isDevBuild) && console.log("DESMONTANDO SubscriberCounter....")
            clearInterval(intervalRef.current);
        }
    }, [])


    return <div>
        <form style={{ display: "inline" }} action="javascript:void(0);">
            <div id="search" style={{ height: 35, maxWidth: 325, margin: "auto", marginBottom: 20 }}>
                <input
                    ref={videoIdRef}
                    size={40}
                    type="search"
                    id="video-id"
                    placeholder={t('yt-search-channel-placeholder')}
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
                display: showAlert ? "block" : "none",
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
            ⚠️ {t('channel-not-found')}
        </div>
        <div
            id="main"
            style={{
                display: showPanel ? "block" : "none",
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
                    style={{
                        margin: "auto", opacity: "0.8",
                        padding: "0px 25px", marginTop: 40 + plusMarginTopTitle
                    }}
                />
                <div id="subscriber-counter" style={{
                    flexGrow: 1, display: 'flex', paddingBottom: 50,
                    flexDirection: 'column', justifyContent: 'center'
                }}>
                    <div id="contador" />
                    <div id="timestamp">
                        {t('subscribers-at')} |
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