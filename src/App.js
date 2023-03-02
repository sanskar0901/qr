import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { IconButton } from "@material-ui/core";
import { CameraAlt } from "@material-ui/icons";
import "tailwindcss/tailwind.css";
import axios from "axios";

function App() {
  const [data, setData] = useState("No result");
  const [readData, setReadData] = useState(false);
  const [ticketData, setTicketData] = useState({});
  useEffect(() => {
    axios
      .get(`https://api.srmmilan.org/api/v1/ticket/${data}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiZGs2ODU3QHNybWlzdC5lZHUuaW4iLCJpYXQiOjE2Nzc3NDU0OTQsImV4cCI6MTY3ODE3NzQ5NH0.AIBJ0cpDMhTg2_8xabGH01iYgq8fCKViO4pgBxXdFP8",
        },
      })
      .then((res) => {
        console.log(res.data);
        // if (res.data.data) {
        //   setTicketData(res.data.data);
        // }
        // else {

        setTicketData(res.data);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);
  const onSubmit = async () => {
    await axios
      .put(
        `https://api.srmmilan.org/api/v1/ticket/issue/${data}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoicmlzaGl0c2hpdmVzaEBnbWFpbC5jb20iLCJpYXQiOjE2Nzc3NDc2MDMsImV4cCI6MTY3ODE3OTYwM30.a9aR6yA_d28ZVcjrkMFvlKoUBhwQ9YnUKUss2ozksOY",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        window.alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400) {
          window.alert(err.response.data.message);
        } else {
          window.alert("Error Occured");
        }
      });
  };
  const [chkData, setChkData] = useState("");
  const [pymtData, setPymtData] = useState("");
  const [paymentData, setPaymentData] = useState("");
  const [pData, setPData] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.srmmilan.org/api/v1/payment/${paymentData}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiZGs2ODU3QHNybWlzdC5lZHUuaW4iLCJpYXQiOjE2Nzc3NDU0OTQsImV4cCI6MTY3ODE3NzQ5NH0.AIBJ0cpDMhTg2_8xabGH01iYgq8fCKViO4pgBxXdFP8",
        },
      })
      .then((res) => {
        console.log(res.data);
        // if (res.data.data) {
        //   setTicketData(res.data.data);
        // }
        // else {

        setPData(res.data);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [paymentData]);
  const onPaymentSubmit = async () => {
    await axios
      .put(
        `https://api.srmmilan.org/api/v1/payment/issue/${paymentData}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoicmlzaGl0c2hpdmVzaEBnbWFpbC5jb20iLCJpYXQiOjE2Nzc3NDc2MDMsImV4cCI6MTY3ODE3OTYwM30.a9aR6yA_d28ZVcjrkMFvlKoUBhwQ9YnUKUss2ozksOY",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        window.alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400) {
          window.alert(err.response.data.message);
        } else {
          window.alert("Error Occured");
        }
      });
  };

  console.log(ticketData);
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
      {readData ? (
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              setReadData(false);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
      ) : null}

      <div
        onClick={() => {
          setData(null);
          setTicketData(null);
          setReadData(true);
        }}
      >
        <CameraAlt />
      </div>
      <p>Check in Manually</p>

      <div>
        <input
          type="email"
          placeholder="Enter Email Id"
          onChange={(e) => {
            setChkData(e.target.value);
          }}
        />
        <button onClick={() => setData(chkData)}>Check Data</button>
      </div>
      {/* {JSON.stringify(ticketData)} */}
      {ticketData?.data ? (
        <div>
          <p
            style={{
              color: "green",
            }}
          >
            Status Code: {ticketData.statusCode}
          </p>
          <p>Message: {ticketData.message}</p>
          {ticketData.data.pId ? (
            <p>Transaction Id: {ticketData.data.pId}</p>
          ) : (
            <p>Transaction Id: {ticketData.data.pID}</p>
          )}
          {/* <p>Transaction Id: {ticketData.data.pId ? ticketData.data.pId : ticketData.data.pID}</p> */}
          <p>Purchased At: {ticketData.data.purchasedAt}</p>
          {ticketData.data.emailID ? (
            <p>
              Issued to: {ticketData.data.emailID}
              {/* {ticketData.data.emailID */}
              {/* ? ticketData.data.emailID */}
              {/* : ticketData.data.emailuId} */}
            </p>
          ) : (
            <p>Issued to: {ticketData.data.emailId}</p>
          )}
          {/* <p>Issued to: {ticketData.data.emailID}</p> */}
          <p>Ticket Type: {ticketData.data.ticketType}</p>
          <p>Ticket Status: {ticketData.data.ticketIssued ? "Yes" : "No"}</p>
          <button onClick={onSubmit}>Issue Ticket</button>
        </div>
      ) : (
        <p>Data cannot be verified or no data found</p>
      )}

      <br />
      <hr />
      <br />

      <p>Check in Payment Manually</p>
      <br />
      <i>
        Warning : Use this only for multiple payment on single emails after
        having used the method 1{" "}
      </i>
      <br />
      <b>
        While Issuing ticket, please ensure that the payment ID on above method
        is not the same as the payment ID being issued here.
      </b>
      <br />
      <div>
        <input
          type="text"
          placeholder="Enter Payment Id"
          onChange={(e) => {
            setPymtData(e.target.value);
          }}
        />
        <button onClick={() => setPaymentData(pymtData)}>Check Data</button>
      </div>

      {pData?.data ? (
        <div>
          <p
            style={{
              color: "green",
            }}
          >
            Status Code: {pData.statusCode}
          </p>
          <p>Message: {pData.message}</p>
          {pData.data.pId ? (
            <p>Transaction Id: {pData.data.pId}</p>
          ) : (
            <p>Transaction Id: {pData.data.pID}</p>
          )}
          {/* <p>Transaction Id: {ticketData.data.pId ? ticketData.data.pId : ticketData.data.pID}</p> */}
          <p>Purchased At: {pData.data.purchasedAt}</p>
          {pData.data.emailID ? (
            <p>Issued to: {pData.data.emailID}</p>
          ) : (
            <p>Issued to: {pData.data.emailId}</p>
          )}
          {/* <p>Issued to: {ticketData.data.emailID}</p> */}
          <p>Ticket Type: {pData.data.ticketType}</p>
          <p>Ticket Status: {pData.data.ticketIssued ? "Yes" : "No"}</p>
          <button onClick={onPaymentSubmit}>Issue Secondary Ticket</button>
        </div>
      ) : (
        <p>Data cannot be verified or no data found</p>
      )}
    </div>
  );
}

export default App;
