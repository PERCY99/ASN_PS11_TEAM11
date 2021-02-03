import React, { useRef, useState, useEffect } from "react";

import Webcam from "react-webcam";
import axios from "axios";
import history from '../history';
import { Button, notification, Space } from 'antd';
import 'antd/dist/antd.css';

//import SettingsHelp from "./components/SettingsHelp";

const Camera = (props) => {

  const [quiztaker, setQuiztaker] = useState('')



  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/${props.slug}`, {
      headers: {
        'Authorization': `token ${localStorage.getItem('token')}`
      }
    }).
      then(res => {
        console.log(res);
        setQuiztaker(res.data.quiz.quiztakers_set.id)
      }
      )
  }, [])


  const [readyToStream, setReadyToStream] = useState(false);
  const [msg, setMsg] = useState('')
  const [value, setValue] = useState(true)

  const iterating = useRef(false);
  const webcam = useRef(undefined);

  const openNotificationWithBrigtness = type => {
    notification[type]({
      message: 'Warning',
      description:
        'Please turn on lights',
      duration: 5,
    });
  };

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Warning',
      description:
        'Please concentrate on screen',
      duration: 5,
    });
  };

  const openNotificationWithPhone = type => {
    notification[type]({
      message: 'Warning',
      description:
        'Please close the phone',
      duration: 5,
    });
  };

  const openNotificationWithVerification = type => {
    notification[type]({
      message: 'Warning',
      description:
        'You are not the same person',
      duration: 5,
    });
  };
  const openNotificationWithMessage = type => {
    notification[type]({
      message: 'Warning',
      description:
        msg,
      duration: 5,
    });
  };
  const getSnapshot = () => {
    const image = webcam.current.getScreenshot();
    console.log(image);

    const headers = {
      'Content-Type': 'application/json',
    }

    axios.post('http://127.0.0.1:8000/api/quiz/verification/', {
      image: image,
      quiz_taker: quiztaker
    }).then((response) => {
      console.log(response.data);

      if (response.data === 1) {
        openNotificationWithIcon('warning')
      } else if (response.data === 2) {
        openNotificationWithPhone('warning')
      } else if (response.data === 3) {
        openNotificationWithBrigtness('warning')
      } else if(response.data === 4){
        openNotificationWithVerification('warning')
      }

      // axios.get(``)
      // .then(msg => {
      //   if (msg.data.length() > 0) {
      //     openNotificationWithMessage('warning')
      //     setMsg(msg)
      //   }
      // }
      //  )
  

      if (value){
        setTimeout(getSnapshot, 3000);
      }
      
    });

   
  };

  const setupWebcam = (instance) => {
    webcam.current = instance;

    const checkIfReady = () => {
      if (
        webcam.current &&
        webcam.current.state &&
        webcam.current.state.hasUserMedia
      ) {
        setReadyToStream(true);
        iterating.current = true;
        getSnapshot();
      } else setTimeout(checkIfReady, 250);
    };

    checkIfReady();
  };



  return (
    // <div className="App">
    //   <Header
    //     addUser={addUser}
    //     readyToStream={readyToStream}
    //     signedIn={signedIn}
    //     toggleRekognition={toggleRekognition}
    //   />
    // {signedIn ? (
    //   <>
    //     <SettingsHelp show={!window.rekognitionSettings} />
    //     <CameraHelp show={!readyToStream} />
    //     <Row>
    //       <Col md={8} sm={6}>
    <Webcam
      ref={setupWebcam}
      audio={true}
      screenshotFormat="image/jpeg"
      videoConstraints={{
        width: 200,
        height: 150,
        facingMode: "user",
      }}

    />
    //       </Col>
    //       <Col md={4} sm={6}>
    //         <EngagementSummary testResults={testResults} />
    //       </Col>
    //     </Row>
    //   </>
    // ) : (
    //   <div className="amplify-auth-container">
    //     <AmplifyAuthenticator usernameAlias="email">
    //       <AmplifySignIn
    //         slot="sign-in"
    //         usernameAlias="email"
    //         formFields={[
    //           {
    //             type: "email",
    //             label: "Username *",
    //             placeholder: "Enter your username",
    //             required: true,
    //             inputProps: { autoComplete: "off" },
    //           },
    //           {
    //             type: "password",
    //             label: "Password *",
    //             placeholder: "Enter your password",
    //             required: true,
    //             inputProps: { autoComplete: "off" },
    //           },
    //         ]}
    //       >
    //         <div slot="secondary-footer-content"></div>
    //       </AmplifySignIn>
    //     </AmplifyAuthenticator>
    //   </div>
    //   )}
    // </div>
  );
};

export default Camera;
