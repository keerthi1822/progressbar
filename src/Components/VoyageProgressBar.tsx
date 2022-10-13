import React from 'react'
import styled from '@emotion/styled';

interface isCompletedProps {
    isShipAtDeparture: boolean;
    hasShipReached: boolean;
}
interface StatusFiller {
    showStatusOfTheShip: boolean;
}

type Props = {
    statusOfShip: number;
    portOfLoading: string;
    portOfDischarge: string;
    message: string;
}


const RenderPorts = styled.div`
  display:flex;
  justify-content:space-between;
  width:70%;
  padding:0 15% ;
  margin:auto;
`

const Wrapper = styled.div`
margin:auto;
height:200px;
position:relative;
justify-content:center;
`

const PinWrapper = styled.div`
padding:0;
margin:0;
/* @media (max-width: 700px) {
  max-width:100%;
    } */`

const Pin = styled.div`
  background-color: #253d5e;
  display:flex;
  justify-content:center;
  align-items:center;
  width:50px;
  height:50px;
  transform: translate(0%,0%) rotate(-45deg);
  border-radius:30% 30% 30% 0%;
  @media (max-width: 576px) {
    width:30px;
    height:30px;
      }
`
const CircleInsidePin = styled.div`
  background-color: #f5f2f6;
  width:75%;
  height:75%;
  margin-left: auto;
  margin-right: auto;
  border-radius:50%;
 display:flex;
   align-items:center;
  justify-content:center;
`

const BoatInsidePinCircle = styled.div`
background-color: #f5f2f6;
border-bottom:10px solid #555;
border-left:3px solid transparent;
border-right:3px solid transparent;
transform: rotate(-135deg);
height:0;
width:50%;
`
/* const BoatTriangleInsidePinCircle = styled.div`
height:0;
width:0;
transform: rotate(45deg);
background-color: #8e7794;
border-left:3px solid transparent;
border-right:3px solid transparent;
border-bottom:10px solid #555;
` */

const Port = styled.div<isCompletedProps>`
  background-color: ${props => (props.hasShipReached) ? "#253d5e" : props.isShipAtDeparture ? "#253d5e" : "#cabada"} ;
  width:20px;
  height:20px;
  border-radius:50%;
`

const PortGroup = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const Dot = styled.div<StatusFiller>`
   background-color: ${props => (props.showStatusOfTheShip) ? "#253d5e" : "#cabada"};
  width:10px;
  height:10px;
  border-radius:50%;
`

const AlignDotsWithPin = styled.div`
margin:auto;
  height:100%;
  width:100%;
  display:grid;
  /* align-self:center; */
  align-items:end;
  justify-items:center;
  @media (max-width: 576px) {
    height:60%;
      }
`

const Message = styled.p`
margin:auto;
text-align:center;
font-style:italic;
font-size:20px;
`

const DotWrapper = styled.div`
margin:auto;
display:grid;
height:70%;
width:70%;
align-items:center;
justify-items:center;
grid-template-columns:repeat(11,1fr);
grid-template-rows:minmax(30px,auto);
`

const VoyageProgressBar = ({ statusOfShip, message, portOfLoading, portOfDischarge }:Props) => {

    const travelDistanceStatusArray: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    return (
        <Wrapper>
            <Message>{message}</Message>
            <DotWrapper>

                {travelDistanceStatusArray.map((s, i) => {
                    return <AlignDotsWithPin key={i}>

                        {i === Math.ceil(statusOfShip / 10) ?
                            <PinWrapper>
                                <Pin>
                                    <CircleInsidePin>
                                        <BoatInsidePinCircle></BoatInsidePinCircle>
                                    </CircleInsidePin>
                                </Pin>
                            </PinWrapper> : ""}
                        {(i === 0 || i === travelDistanceStatusArray.length - 1)
                            ? <Port isShipAtDeparture={i === 0 ? true : false} hasShipReached={i === Math.ceil(statusOfShip / 10) ? true : false} />

                            : <Dot showStatusOfTheShip={i <= Math.ceil(statusOfShip / 10) ? true : false} />}

                    </AlignDotsWithPin>

                })}


            </DotWrapper>
            <RenderPorts>
                <p>{portOfLoading}</p>
                <p>{portOfDischarge}</p>
            </RenderPorts>

        </Wrapper>
    )
}

export default VoyageProgressBar