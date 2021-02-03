// import './App.css';
import React from "react";
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Card, Avatar } from 'antd';
import { MessageOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import Gallery from "./Carousel";
import Chat from "./Chat";
import axios from 'axios'


const { Meta } = Card;

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // data: [
      //   {
      //     profile_name: 'Prashant',
      //     id: '2',
      //     images: [
      //       'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      //       'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
      //     ],
      //     errors: '3',
      //     profile_image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
      //   },
      //   {
      //     profile_name: 'abhishek',
      //     id: '3',
      //     images: [
      //       'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      //       'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png'
      //     ],
      //     errors: '3',
      //     profile_image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
      //   },
      // ],
      visible: false,
      show: false,
      deleteChat: false,
      pics: [],
      chatid: null
    }
  }

  showChat = (index) => {
    this.setChat(index)
    this.setState({
      show: true
    })
  }
  showModal = (index) => {
    console.log('fired');
    this.setImages(index);
    this.setState({
      visible: true,
    });
    this.setData()
  };

  setChat = (index) => {
    this.setState({
      chatid: this.state.data[index].user_id
    })
  }
  setImages = (index) => {
    this.setState({
      pics: this.state.data[index].images
    })
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      show: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      show: false,
      deleteChat: true
    });

  };

  setData = () => {
    axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/verification/${this.props.match.params.id}/`, {
    }).then(
      res => {
        console.log(res);
        this.setState({ data: res.data })
      }).catch(error =>
        console.log(error))

    setTimeout(() => {
      this.setData()
    }, 2000);

  }
  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/quiz/quizzes/verification/${this.props.match.params.id}/`, {
    }).then(
      res => {
        console.log(res);
        this.setState({ data : res.data })
      }
    ).catch(error =>
      console.log('error'))

  }

  render() {



    return (
      <>
      {
        console.log(this.state.data)
      } 
        <Row >
          {
            this.state.data ? 
            this.state.data.map((val, index) => {

              return (

                <Col key={index} style={{ paddingLeft: "50px", paddingTop: "100px" }} xs={{ span: 5 }}>
                  <Card
                    hoverable
                    style={{ width: 250 }}
                    cover={
                      <img alt="example"
                        src={val.profile_image} />}

                    actions={[
                      <MessageOutlined onClick={() => this.showChat(index)} key="message" />,
                      <EditOutlined onClick={() => this.showModal(index)} key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Meta style={{ color: 'red' }} title={val.profile_name}
                      description={val.errors} />

                  </Card>
                  {
                    console.log(this.state.data[index].images)

                  }

                  <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okButtonProps={{ disabled: true }}
                    cancelButtonProps={{ disabled: true }}
                    width={1000}
                    footer={null}
                  >

                    <Gallery images={this.state.pics} />

                  </Modal>
                  <Modal
                    visible={this.state.show}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Chat id={this.state.chatid} />
                  </Modal>

                </Col>


              )
            } ) : null
          } 
        </Row>
      </>

    )

  }
}


export default Dashboard;
