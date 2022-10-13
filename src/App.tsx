
import { useState, useEffect, SetStateAction } from 'react';
import styled from '@emotion/styled'
//components
import Footer from './Components/Footer';
import Header from './Components/Header';
import VoyageProgressBar from './Components/VoyageProgressBar';
//img
import background from './dfdsShip.jpg'



type portOfLoading = string;
type portOfDischarge = string;
type departureTime = Date;
type arrivalTime = Date;


const H1 = styled.h1`
  color:#253d5e;
  text-align:center;
`

function App() {

  let today = new Date();
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const [portOfLoading, setPortOfLoading] = useState<portOfLoading>("");
  const [portOfDischarge, setPortOfDischarge] = useState<portOfDischarge>("");
  const [departureTime, setDepartureTime] = useState<departureTime>(today)
  const [arrivalTime, setArrivalTime] = useState<arrivalTime>(tomorrow);
  const [message, setMessage] = useState("");
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

      if (diffTilNow.days >= 1 || diffTilNow.hours >= 1 || diffTilNow.minutes > 30) {
        setStatusOfShip(() => Math.ceil((timeCompletedtilNowInMinutes / totalHoursTravel) * 100));
        setMessage(`Ship is on its way to ${portOfDischarge}`);
      }
      if (diffTilNow.days < 1 && diffTilNow.hours < 1 && diffTilNow.minutes > 1 && diffTilNow.minutes <= 30) {
        setMessage(`Ship just started from ${portOfLoading}.(~<30min.)`);
        setStatusOfShip(() => Math.ceil((timeCompletedtilNowInMinutes / totalHoursTravel) * 100));
      }

    }
    else {
      setMessage(`Please enter place and time to see the status.`);
      setStatusOfShip(0);
    }


  }, [departureTime, arrivalTime])


  //handler functions 
  const handlePortOfLoading = (e: { target: { value: SetStateAction<string>; }; }) => setPortOfLoading(e.target.value)

  const handlePortOfDischarge = (e: { target: { value: SetStateAction<string>; }; }) => setPortOfDischarge(e.target.value)

  const handleDepartureTime = (e: React.ChangeEvent<HTMLInputElement>) => setDepartureTime(new Date(e.target.value))

  const handleArrivalTime = (e: React.ChangeEvent<HTMLInputElement>) => setArrivalTime(new Date(e.target.value))




  return (
    <div >
      <Header
        portOfLoading={portOfLoading}
        portOfDischarge={portOfDischarge}
        departureTime={departureTime}
        arrivalTime={arrivalTime}
        handlePortOfLoading={handlePortOfLoading}
        handlePortOfDischarge={handlePortOfDischarge}
        handleDepartureTime={handleDepartureTime}
        handleArrivalTime={handleArrivalTime}
      />

      <VoyageProgressBar
        statusOfShip={statusOfShip}
        message={message}
        portOfLoading={portOfLoading}
        portOfDischarge={portOfDischarge} />
        <img src={background} alt="ship img" width={1600} height={250}/>
   
      <Footer />
    </div>
  );
}

export default App;
