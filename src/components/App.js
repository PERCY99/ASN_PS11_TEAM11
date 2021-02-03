import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router,Route} from 'react-router-dom';
import history from './history';
import Homepage from './Homepage';
import ContactForm from './ContactForm';
import Jteam from './Jteam';
import NcertData from './Ncert/NcertData';
import Login from './Login';
import Signup from './Signup';
import AboutUs from './AboutUs';
import Term from './Terms';
import Display from './notes/Display'
import Quiz from './Quiz/Quiz';
import Submit from './Quiz/Submit';
import TestStart from './Quiz/TestStart';
import Cart from './Cart/Cart';
import CartA from './Cart/CartA';
import MCQlist from './Quiz/MCQlist';
import News from './News/News';
import Newsdata from './News/Newsdata';
import Articles from './Free resources/Articles';
import Forum from './Forum/Forum';
import Material from './My material/Material';
import Blog from './Blog';
import Suggestions from './Forum/Suggestions';
import PaymentSuccessful from './PaymentSuccessful';
import Signupsuccess from './Signupsuccess'
import QuestionPaper from './Quiz/QuestionPaper';
import QuizInfo from './Quiz/QuizInfo';
import ForgotPassword from './Settings/ForgotPassword';
import ChangePassword from './Settings/ChangePassword';
import FAQ from './Settings/FAQ';
import Dashboard from '../proctor/Dashboard';
import SlugPage from '../proctor/SlugPage';
class App extends React.Component{
    render(){
        return(
            <div>
                <Router history={history}>
                <div>
                    <Route path="/" exact component={Homepage} />
                    <Route path="/contact" exact component={ContactForm} />
                    <Route path="/join" exact component={Jteam} />
                    <Route path="/test/:id" exact component={Display} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    {/* <Route path="/aboutus" exact component={AboutUs} /> */}
                    <Route path="/terms" exact component={Term} />
                    <Route path="/quiz/:id" exact component={Quiz} />
                    <Route path="/submit/:id" exact component={Submit} />
                    <Route path="/start/:id" exact component={TestStart} />
                    <Route path="/checkout" exact component={Cart} />
                    <Route path="/TestSeries" exact component={MCQlist} />
                    <Route path="/news" exact component={Newsdata} />
                    <Route path="/articles" exact component={Articles} />
                    <Route path="/validation" exact component={CartA} />
                    <Route path="/forum" exact component={Forum} />
                    <Route path="/material" exact component={Material} />
                    <Route path="/blogs" exact component={Blog} />
                    <Route path="/suggestions" exact component={Suggestions} />
                    <Route path="/successful/:id" exact component={PaymentSuccessful} />
                    <Route path="/signupsuccess" exact component={Signupsuccess} />
                    <Route path="/questionpaper/:id" exact component={QuestionPaper} />
                    <Route path="/forgotpassword/:id" exact component={ForgotPassword} />
                    <Route path="/changepassword/" exact component={ChangePassword} />
                    <Route path="/faqs/" exact component={FAQ} />
                    <Route path = "/verification/:id" exact component = {Dashboard} />
                    <Route path = "/verify" exact component = {SlugPage} />
                  
                    </div>
                    </Router>
              
            </div>
        );
    }
}
export default App;