import styled from 'styled-components'
import { NAV_HEADROOM } from '../../styles/variables'

export const VideoChatStyled = styled.div`
    position: relative;
    height: calc(100vh - ${NAV_HEADROOM});
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-rows: 2fr 2fr;
    box-sizing: border-box;
    grid-gap: 0.5rem;
`

export const VideoSection = styled.div`
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid red;
`

export const ChatSection = styled.div`
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid red;
`

export const BottomSection = styled.div`
    border-radius: 3px;
    border: 1px solid #e0e;
    padding: 0.5rem;
    position: relative;
`

export const UpperSection = styled.div`
    border-radius: 3px;
    border: 1px solid #e0e;
    padding: 0.5rem;
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
`

export const MainVideoWrapper = styled.div`
    border: 1px solid red;
    width: 100%;
    display: flex;
    justify-content: center;
    object-fit: cover;
    position: relative;
    width: 100%;
`

export const MainVideo = styled.video`
    border: 1px solid blue;
    height: 100%;
`

export const SmallVideoWrapper = styled.div`
    border: 1px solid green;
    display: flex;
    justify-content: center;
    object-fit: cover;
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 0;
    right: 0;
`

export const SmallVideo = styled.video`
    border: 1px solid yellow;
`