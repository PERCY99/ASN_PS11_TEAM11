import React, { useEffect } from 'react'
import QuizHead from './QuizHead'
import './QuizHead.css'
import QuizBody from './QuizBody'
import Timer from './Timer'
import Camera from './Camera'
import { usePageVisibility } from 'react-browser-hooks' 
import { Button, notification, Space } from 'antd';
import 'antd/dist/antd.css';




export default function Quiz (props) {

    
    const visibility = usePageVisibility()

    const openNotificationWithIcon = type => {
        notification[type]({
          message: 'Warning',
          description:
            'Please Dont Change the tab',
        duration : 5,
        });
      };
    
    useEffect(() => {

      document.title = visibility ? ('Test') : openNotificationWithIcon('warning')
    
    }, [visibility])

    
        return (

            <div>
                <div className="QuizHead">
                    <Camera slug={props.match.params.id} />
                    <QuizHead slug={props.match.params.id} />
                </div>
                <QuizBody slug={props.match.params.id} />
                


            </div>
        )
}
