



import { useState, useEffect } from 'react';
import styled from '@emotion/styled'

interface isCompletedProps {
  isShipAtDeparture: boolean;
  hasShipReached: boolean;
}
interface StatusFiller {
  showStatusOfTheShip: boolean;
}


type portOfLoading = string;
type portOfDischarge = string;
type departureTime = Date;
type arrivalTime = Date;


const InputWrapper = styled.form`
padding:2%;
background-color:#32505e;
display:grid;
grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
justify-items:center;
align-items:center;
`
const RenderPorts = styled.div`
  display:flex;
  justify-content:space-between;
  background-color:lightcyan;
  width:70%;
  padding:0 15%;
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


const DotWrapper = styled.div`

display:grid;
height:70%;
width:70%;
align-items:center;
justify-items:center;
grid-template-columns:repeat(11,1fr);
grid-template-rows:minmax(30px,auto);
padding:0 15%;
`

/* const PortInputs = styled.section`
  display:flex;
  flex-wrap:wrap;
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

const Label = styled.label`
margin:1%;
display:block;
color:lightcyan;
`

const ErrorMessage = styled.p`
  color:red;
  display:block;
`


const travelDistanceStatusArray: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function App() {

  let today = new Date();
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const [portOfLoading, setPortOfLoading] = useState<portOfLoading>("Copenhagen");
  const [portOfDischarge, setPortOfDischarge] = useState<portOfDischarge>("Oslo");
  const [departureTime, setDepartureTime] = useState<departureTime>(today)
  const [arrivalTime, setArrivalTime] = useState<arrivalTime>(tomorrow);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    loadingErrorMessage: "", dischargeErrorMessage: ""
  });

  const [statusOfShip, setStatusOfShip] = useState(0);

  //caluculate time difference
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

  //useEffect
  useEffect(() => {

    let totalTravelTime = timeDiffCalc(arrivalTime.getTime(), departureTime.getTime())
    console.log("totalTravelTime", totalTravelTime)
    if (today.getTime() < departureTime.getTime()) {

      setMessage(`Ship is still at the ${portOfLoading}`);

      return setStatusOfShip(0);
    }
    else if (today.getTime() > arrivalTime.getTime()) {

      setMessage(`Ship has already arrived the  ${portOfDischarge}`);

      return setStatusOfShip(100);
    }

    else if (departureTime.getTime() < arrivalTime.getTime()) {
      let diffTilNow;
      diffTilNow = timeDiffCalc(today.getTime(), departureTime.getTime());
      let timeCompletedtilNowInMinutes = diffTilNow.days * 24 * 60 + diffTilNow.hours * 60 + diffTilNow.minutes;
      let totalHoursTravel = (totalTravelTime.days * 24 * 60 + totalTravelTime.hours * 60 + totalTravelTime.minutes);

      console.log("checking", diffTilNow)
      if (diffTilNow.days >= 1 || diffTilNow.hours >= 1 || diffTilNow.minutes > 30) {
        console.log("diff til now", diffTilNow);
        setStatusOfShip(() => Math.ceil((timeCompletedtilNowInMinutes / totalHoursTravel) * 100));
        setMessage(`Ship is on its way to ${portOfDischarge}`);
      }
      if (diffTilNow.days < 1 && diffTilNow.hours < 1 && diffTilNow.minutes > 1 && diffTilNow.minutes <= 30) {
        console.log("diff til now", diffTilNow);
        setMessage(`Ship just started from ${portOfLoading}.(~<30min.)`);
        setStatusOfShip(() => Math.ceil((timeCompletedtilNowInMinutes / totalHoursTravel) * 100));

      }

    }
    else {
      setMessage(`Please enter place and time to see the status.`);
      setStatusOfShip(0);
    }


  }, [departureTime, arrivalTime])


  return (
    <div >
      <header>

        <h1>Voyage progress.</h1>

        <InputWrapper>
          <div>

            <Label>Please enter port name and time of departure. </Label>

            <input
              value={portOfLoading}
              onChange={(e) => setPortOfLoading(e.target.value)}
              placeholder="Port name of loading."
              className="input"
              onBlur={() => !portOfLoading ? setErrorMessage({ ...errorMessage, loadingErrorMessage: 'Please enter the port of loading' }) : setErrorMessage({ ...errorMessage, loadingErrorMessage: '' })}
            />
            <input
              type="datetime-local"
              defaultValue={departureTime.toLocaleTimeString("en-au")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDepartureTime(new Date(e.target.value))}
            />


            <ErrorMessage>{!portOfLoading && errorMessage.loadingErrorMessage}</ErrorMessage>
          </div>
          <div>

            <Label>Please enter port name and time of Arrival. </Label>

            <input
              value={portOfDischarge}
              onChange={(e) => setPortOfDischarge(e.target.value)}
              placeholder="Port name of discharge."
              onBlur={() => !portOfDischarge ? setErrorMessage({ ...errorMessage, dischargeErrorMessage: 'Please enter the port of discharge' }) : setErrorMessage({ ...errorMessage, dischargeErrorMessage: '' })}

            />
            <input
              type="datetime-local"
              defaultValue={arrivalTime.toLocaleTimeString("en-au")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setArrivalTime(new Date(e.target.value))}
              min={departureTime.toLocaleDateString('en-au')}
            />


            <ErrorMessage>{!portOfDischarge && errorMessage.dischargeErrorMessage}</ErrorMessage>
          </div>



        </InputWrapper>
      </header>
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
        <RenderPorts data-testid="renderPorts">
          <p data-testid="renderPort1">{portOfLoading}</p>
          <p data-testid="renderPort2">{portOfDischarge}</p>
        </RenderPorts>

      </Wrapper>
    </div>
  );
}

export default App;
