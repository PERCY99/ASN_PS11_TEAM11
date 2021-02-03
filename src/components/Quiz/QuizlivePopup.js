import React, { Component } from 'react';
import {Modal, ModalBody,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default class QuizlivePopup extends Component {
    
    render() {
        
        return (
            <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
              <Modal.Header closeButton>
        <Modal.Title>{this.props.quizdata.name}</Modal.Title>
  </Modal.Header>
              <ModalBody>
                  {this.props.quizdata.islive===false?(this.props.quizdata.nextslot.duration!==undefined?(
                      <div>
                          <div>
                          This quiz will start at {this.props.quizdata.nextslot.startTime}.
                        </div>
                        <div>Start button will automatically appear below at {this.props.quizdata.nextslot.startTime}</div>
                      </div>
                  ):(
                  <div>
                      <div style={{fontSize:'14px'}}>Give this live quiz held some days before and comapre your performance with top notch students like you</div>
                
                <div className="row mt-4">
               
                 <Button className="mx-auto"> <Link to={`/start/${this.props.quizdata.slug}`} style={{color:'white'
                }} className="no-hover px-2">Start</Link></Button></div>
                   
                  </div>)):<div>
                      <div>
                      This quiz has multiple slots.One of them is live, You can give exam in any of the listed below
                      </div>
                      
                      <div>
                      {this.props.quizdata.quizslot_set!=undefined?this.props.quizdata.quizslot_set.map(slot=>{
                          return  <div >
                          <div className="d-flex" style={{color:'green',fontSize:'14px'}}>
                            {slot.start_datetime}
                          </div>
                      </div>
                      }):""}
                         
                      </div>
                      <div style={{color:'red',fontSize:'14px'}}>Current live slot started at: {this.props.quizdata.currentslot!=undefined?this.props.quizdata.currentslot.startTime:""}</div>
                      <div>Select Start Button to start the test in current slot or you may give test at next slot if available above</div>
                      <div className="row">
                      <Button className="mx-auto"><Link style={{color:'white'
                }} className="no-hover px-4"  to={`/start/${this.props.quizdata.slug}`}>Start</Link></Button>
                </div>
                    <div>Note:Current Slot Test will end at {this.props.quizdata.currentslot!=undefined?this.props.quizdata.currentslot.endTime:""}</div>
                      </div>}
              </ModalBody>
              <Modal.Footer>
                <div className="row d-flex justify-content-center">

                  </div>
              </Modal.Footer>
          </Modal>
        )
    }
}
