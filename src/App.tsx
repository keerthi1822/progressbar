



import { useState, useEffect } from 'react';
import styled from '@emotion/styled'

interface isCompletedProps {
  isShipAtDeparture: boolean;
  isShipAtDestination: boolean;
}

type portOfLoading = string;
type portOfDischarge = string;
type departureTime = Date;
type arraivalTime = Date;


const InputWrapper = styled.div`
padding:2%;
background-color:#fb6d6d;
display:flex;
align-items:center;
justify-content:space-around;
`
const InputGroup = styled.div`
  
`

const Wrapper = styled.div`
margin:auto;
height:200px;
position:relative;
justify-content:center;
background-color:lightcyan;
`

const PinWrapper = styled.div`
padding:0;
margin:0;
background-color:lightcyan;
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
  border-radius:15% 15% 15% 0%;
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


const DotWrapper = styled.div`

display:grid;
height:70%;
width:100%;
align-items:end;
justify-items:center;
grid-template-columns:repeat(11,1fr);
grid-template-rows:minmax(30px,auto);
`

const Port = styled.div<isCompletedProps>`
 
  background-color: ${props => (props.isShipAtDeparture && props.isShipAtDestination) ? "#253d5e" : "#cabada"} ;
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

const Dot = styled.div`
  background-color: #cabada;
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
const travelDistanceStatusArray: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function App() {

  let today = new Date();
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const [portOfLoading, setPortOfLoading] = useState<portOfLoading>("Copenhagen");
  const [portOfDischarge, setPortOfDischarge] = useState<portOfDischarge>("Oslo");
  const [departureTime, setDepartureTime] = useState<departureTime>(today)
  const [arraivalTime, setArraivalTime] = useState<arraivalTime>(today);
  const [isShipAtDeparture, setIsShipAtDeparture] = useState(true);
  const [isShipAtDestination, setIsShipAtDestination] = useState(false);
  const [statusOfShip, setStatusOfShip] = useState(0);

  function timeDiffCalc(dateFuture: number, dateNow: number) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

    return { days: days, hours: hours, minutes: minutes };
  }

  useEffect(() => {

    let totalTravelTime = timeDiffCalc(arraivalTime.getTime(), departureTime.getTime())

    if (today.getTime() < departureTime.getTime()) return setStatusOfShip(0)

    else {
      let diffTilNow;

      diffTilNow = timeDiffCalc(today.getTime(), departureTime.getTime())

      if (diffTilNow.days > 1 || diffTilNow.hours > 1) {
        let timeCompletedtilNowInHours = diffTilNow.days * 24 + diffTilNow.hours
        let totalHoursTravel = (totalTravelTime.days * 24 + totalTravelTime.hours)
        setStatusOfShip(() => Math.ceil((timeCompletedtilNowInHours / totalHoursTravel) * 100))
      }
      else
        setStatusOfShip(0)
    }
  }, [departureTime, arraivalTime])

  return (
    <div >
      <header>

        <h1>Voyage progress.</h1>
        <p>  Please enter the departure and destination and time. </p>

        <InputWrapper>
          <div>

            <input
              value={portOfLoading}
              onChange={(e) => setPortOfLoading(e.target.value)}
              placeholder="portOfLoading"
              className="input"
            />
            <input
              type="datetime-local"
              defaultValue={departureTime.toLocaleDateString('en-au')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDepartureTime(new Date(e.target.value))}
            />

          </div>
          <div>
            <input
              value={portOfDischarge}
              onChange={(e) => setPortOfDischarge(e.target.value)}
              placeholder="portOfDischarge"
            />
            <input
              type="datetime-local"
              defaultValue={arraivalTime.toLocaleDateString('en-au')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setArraivalTime(new Date(e.target.value))}
            />

          </div>
        </InputWrapper>
        {/* <p></p> */}
      </header>
      <Wrapper>
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
              {(i === 0 || i === travelDistanceStatusArray.length - 1) ? <Port isShipAtDeparture={isShipAtDeparture} isShipAtDestination={isShipAtDestination} /> : <Dot />}

              {/*  {i===0 && <p>{portOfLoading}</p>}
              {i===travelDistanceStatusArray.length-1 && <p>{portOfDischarge}</p>} */}
            </AlignDotsWithPin>

          })}

          {/*  <p>{portOfDischarge}</p> */}
        </DotWrapper>

      </Wrapper>

    </div>
  );
}

export default App;
