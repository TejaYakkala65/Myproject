import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ViewProfile from './ViewProfile';
import UnAuthorized from './UnAuthorized';
import SignUp from './SignUp';
import { createBrowserHistory } from 'history';
import AddProduct from './AddProduct';
import About from './About';

export default() => {
    const history = createBrowserHistory();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signUp" element={<SignUp/>} />
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home history={history}/>} />
                <Route path="/viewProfile" element={<ViewProfile/>} />
                <Route path="/unAuthorized" element={<UnAuthorized/>} />
                <Route path="/AddProduct" element={<AddProduct/>} />
                <Route path="/About" element={<About/>}/>
            </Routes>
        </BrowserRouter>
        )
}