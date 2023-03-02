import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { IconButton } from '@material-ui/core';
import { CameraAlt } from '@material-ui/icons';
import 'tailwindcss/tailwind.css';
import axios from 'axios';


function App() {

  const [data, setData] = useState('No result');
  const [readData, setReadData] = useState(false);
  const [ticketData, setTicketData] = useState({});
  useEffect(() => {
    axios.get(`https://api.srmmilan.org/api/v1/ticket/${data}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiZGs2ODU3QHNybWlzdC5lZHUuaW4iLCJpYXQiOjE2Nzc3NDU0OTQsImV4cCI6MTY3ODE3NzQ5NH0.AIBJ0cpDMhTg2_8xabGH01iYgq8fCKViO4pgBxXdFP8"
      }
    })
      .then(res => {
        console.log(res.data);
        // if (res.data.data) {
        //   setTicketData(res.data.data);
        // }
        // else {

        setTicketData(res.data);
        // }
      })
      .catch(err => {
        console.log(err);
      })
  }, [data])
  // const onSubmit = () => {
  //   axios.put(`https://api.srmmilan.org/api/v1/ticket/update/${data}`, {
  //     ticketType: ticketData.data.ticketType,
  //     checkedInBy: "Helpdesk",
  //     barcode: "abcd"
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoicmlzaGl0c2hpdmVzaEBnbWFpbC5jb20iLCJpYXQiOjE2Nzc3NDc2MDMsImV4cCI6MTY3ODE3OTYwM30.a9aR6yA_d28ZVcjrkMFvlKoUBhwQ9YnUKUss2ozksOY"
  //     }
  //   })
  //     .then(res => {
  //       console.log(res);
  //       window.alert("Ticket Checked In Successfully")
  //     })
  //     .catch(err => {
  //       window.alert("Ticket Check In Failed" + err)
  //     })
  // }
  const [chkData, setChkData] = useState("");
  return (
    <div className="container mx-auto">
      {/* <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">QR Code Reader</h1>
        {qrData ? (
          <div className="p-8">
            <p>{qrData}</p>
          </div>
        ) : (
          <div className="p-8">
            {qrReaderOpen ?
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              // onResult={(result) => {
              //   setQrData(result);
              //   setQrReaderOpen(false);
              // }}
              />
              : null}
          </div>
        )}
        <div className="flex justify-center mt-8">
          <IconButton
            color="primary"
            onClick={() => setQrReaderOpen(true)}
          >
            <CameraAlt />
          </IconButton>
        </div>
      </div> */}
      {
        readData ?
          <QrReader
            constraints={
              { facingMode: 'environment' }
            }
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
                setReadData(false);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
          : null

      }

      <div onClick={() => { setData(null); setTicketData(null); setReadData(true) }}><CameraAlt /></div>
      <p>Check in Manually</p>

      <div>
        <input type="email" placeholder="Enter Email Id" onChange={(e) => { setChkData(e.target.value) }} />
        <button onClick={() => setData(chkData)} >Check Data</button>
      </div>
      {/* {JSON.stringify(ticketData)} */}
      {ticketData?.data ?
        <div>
          <p style={{
            color: 'green'
          }}>Status Code: {ticketData.statusCode}</p>
          <p>Message: {ticketData.message}</p>
          {ticketData.data.pId ?

            <p>Transaction Id: {ticketData.data.pId}</p>
            :
            <p>Transaction Id: {ticketData.data.pID}</p>
          }
          {/* <p>Transaction Id: {ticketData.data.pId ? ticketData.data.pId : ticketData.data.pID}</p> */}
          <p>Purchased At: {ticketData.data.purchasedAt}</p>
          {
            ticketData.data.emailID ?
              <p>Issued to: {ticketData.data.emailID}</p>
              :
              <p>Issued to: {ticketData.data.uId}</p>
          }
          {/* <p>Issued to: {ticketData.data.emailID}</p> */}
          <p>Ticket Type: {ticketData.data.ticketType}</p>

          {/* <button onClick={onSubmit}>Issue Ticket</button> */}
        </div>
        : <p>Data cannot be verified or no data found</p>}
    </div >
  );
}

export default App;

