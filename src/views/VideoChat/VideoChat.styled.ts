import styled from 'styled-components'
import { NAV_HEADROOM, COLORS, BREAKPOINTS } from '../../styles/variables'

export const VideoChatStyled = styled.div`
    position: relative;
    height: calc(100vh - ${NAV_HEADROOM});
    display: grid;
    grid-template-columns: 2fr 1fr;
    box-sizing: border-box;
    grid-gap: 0.5rem;

    @media (max-width: ${BREAKPOINTS.md}) {
        grid-template-columns: 1fr;
    }
`

export const ChatSection = styled.div`
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border-left: 1px solid #ccc;
    padding: 1rem;
`

export const VideoSection = styled.div`
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${BREAKPOINTS.md}) {
        width: 100%;
        height: 60vh;
    }
`

export const MainVideo = styled.video`
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
    border: 1px solid #ccc;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    height: 20%;
    filter: opacity(1);
    background: #0f0f0f;

    @media (max-width: ${BREAKPOINTS.md}) {
        height: 25%;
    }
`

export const VideoInfo = styled.div`
    font-weight: bold;
    font-size: 1.8rem;
`

export const Cont = styled.div`
    
`

export const Buttons = styled.div`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    display: flex;
`

export const Toggle = styled.button`
    border-radius: 6rem;
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    width: 6rem;
    height: 6rem;
    font-size: 2.8rem;
    background: white;
    color: ${COLORS.blue};
    cursor: pointer;
`
