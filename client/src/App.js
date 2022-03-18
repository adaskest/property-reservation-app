import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import context from "./context/mainContext";
import {useEffect, useState} from "react";
import MainPage from "./pages/MainPage";
import http from "./plugins/http";
import CreatePage from "./pages/CreatePage";
import {Box, CircularProgress} from "@mui/material";
import SingleAdPage from "./pages/SingleAdPage";
import {ThemeProvider} from "@mui/styles";
import {createTheme} from "@mui/material/styles";


const theme = createTheme();

function App() {

    const [isOnline, setIsOnline] = useState(false);
    const [username, setUsername] = useState('')
    const [admin, setAdmin] = useState(false)
    const [ads, setAds] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [page, setPage] = useState('')

    const data = {
        username, setUsername, admin, setAdmin, ads, setAds, showSearch, setShowSearch, page, setPage
    }

    {
        useEffect(async () => {
            function handleStatusChange() {
                setIsOnline(!isOnline);
            }

            const id = localStorage.getItem('secretKey')
            if (id) await getUser()

            async function getUser() {
                const user = await http.get('get-user/' + id)
                setAdmin(user.admin)
                setUsername(user.username)
            }

            setTimeout(() => {
                handleStatusChange();
            }, 1000)
        }, [])

        if (!isOnline) {
            return <Box style={{display: 'flex'}}>
                <CircularProgress style={{margin: '100px auto', width: 100, height: 100}}/>
            </Box>;
        }
    }

    return (
        <context.Provider value={data}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path={'/register'} element={<RegisterPage/>}/>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path={'/create'} element={<CreatePage/>}/>
                        <Route path={'/single-ad/:id'} element={<SingleAdPage/>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </context.Provider>
    );
}

export default App;
