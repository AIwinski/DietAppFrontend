import styled from 'styled-components'
import { NAV_HEADROOM } from '../../styles/variables'

export const VideoChatStyled = styled.div`
    position: relative;
    height: calc(100vh - ${NAV_HEADROOM});
    display: grid;
    grid-template-columns: 2fr 1fr;
    box-sizing: border-box;
    grid-gap: 0.5rem;
`

export const ChatSection = styled.div`
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid red;
`

export const VideoSection = styled.div`
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #d0d;
    overflow: hidden;
    position: relative;
`

export const MainVideo = styled.video`
    border: 2px solid green;
    position: absolute;
    top: 50%; 
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    min-width: 100%; 
    min-height: 100%; 
    width: auto; 
    height: auto;
    z-index: -1000; 
    overflow: hidden;
`

export const SmallVideo = styled.video`
    border: 2px solid green;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    height: 20%;
    filter: opacity(1);
`