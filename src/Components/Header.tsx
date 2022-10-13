import React, { useState } from 'react'
import styled from '@emotion/styled'

const InputWrapper = styled.form`
padding:2%;
background-color:#32505e;
display:grid;
grid-template-columns:repeat(auto-fit,minmax(500px,1fr));
justify-items:center;
align-items:center;
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

  
const H1 = styled.h1`
  color:#253d5e;
  text-align:center;
`

type Props = {
    portOfLoading: string;
    portOfDischarge: string;
    departureTime: Date;
    arrivalTime:Date;
    handlePortOfLoading: (e:React.ChangeEvent<HTMLInputElement>) => void; 
    handlePortOfDischarge: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleDepartureTime: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleArrivalTime: (e:React.ChangeEvent<HTMLInputElement>) => void;
   /*  handleErrorMessage: (e:{ target: { value: SetStateAction<string>; }; }) => FocusEventHandler<HTMLInputElement>; */
}

const Header = ({ 
    portOfLoading, 
    portOfDischarge ,
    departureTime, 
    arrivalTime, 
    handlePortOfLoading, 
    handlePortOfDischarge,
    handleDepartureTime,
    handleArrivalTime}:Props) => {

    const [errorMessage, setErrorMessage] = useState<string>("");
    
    return (
        <header data-testId = "headerTest">
            <H1>Voyage progress.</H1>
            <InputWrapper>
                <div>
                    <Label>Enter port name and time of departure.</Label>
                    <input
                        value={portOfLoading}
                        onChange={handlePortOfLoading}
                        placeholder="Port name of loading."
                        className="input"
                        onBlur={()=>!portOfLoading ?setErrorMessage('Please enter the port of loading') : setErrorMessage('')}
                    />
                    <input
                        type="datetime-local"
                        defaultValue={departureTime.toLocaleTimeString("en-au")}
                        onChange={handleDepartureTime}
                    />

                </div>
                <div>
                    <Label>Enter port name and time of arraival.</Label>

                    <input
                        value={portOfDischarge}
                        onChange={handlePortOfDischarge}
                        placeholder="Port name of discharge."
                        onBlur={()=>!portOfDischarge ?setErrorMessage('Please enter the port of discharge') : setErrorMessage('')}

                    />
                    <input
                        type="datetime-local"
                        defaultValue={arrivalTime.toLocaleTimeString("en-au")}
                        onChange={handleArrivalTime}
                        min={departureTime.toLocaleDateString('en-au')}
                    />

                </div>

                <ErrorMessage>{errorMessage}</ErrorMessage>
            </InputWrapper>
        </header>
    )
}

export default Header