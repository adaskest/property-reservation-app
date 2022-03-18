import React, {useContext, useState} from 'react';import {Box, Button, Card, Container, ImageList, ImageListItem, ThemeProvider, Typography} from "@mui/material";import {createStyles, makeStyles} from '@mui/styles';import {createTheme} from "@mui/material/styles";import Calendar from '../components/Calendar'import ReservationDatePicker from "./ReservationDatePicker";import http from "../plugins/http";import context from "../context/mainContext";import {useNavigate} from "react-router-dom";const useStyles = makeStyles((theme) => createStyles({    card: {        backgroundColor: '#fff3e0', width: 1100, height: 'fit-content', margin: theme.spacing(2), display: 'flex'    }, ImageList: {        width: 700, overflowX: 'hidden', overflowY: 'hidden', margin: theme.spacing(2), display: 'block'    },}));const theme = createTheme();const SingleAd = ({oneAd}) => {    const classes = useStyles();    const [error, setError] = useState('')    const [some, setSome] = useState(true)    const [reservation, setReservation] = useState(false)    const [reservDays, setReservDays] = useState([])    const {setAds} = useContext(context)    const nav = useNavigate()    const {admin, username} = useContext(context)    function displayImg(index) {        oneAd.photos.unshift(oneAd.photos[index])        oneAd.photos.splice(Number(index) + 1, 1);        setSome(!some)    }    async function saveReservation() {        const newReservation = {            adID: oneAd._id,            days: reservDays        }        const data = await http.post(newReservation, 'reservation')        if (!data.success) setError(data.message)        if (data.success) {            setAds(data.message)            nav('/')        }    }    function cancel() {        setReservation(!reservation)        setError('')    }    const administrator = !admin && username    return (<ThemeProvider theme={theme}>        <Container>            <Card className={classes.card}>                <div className={'d-flex'}>                    <div>                        <ImageList className={classes.ImageList}>                            <ImageListItem>                                {oneAd.photos.map((x, i) => i === 0 && <                                    img key={i}                                        style={{                                            height: 500,                                            width: 700,                                            objectFit: "fill",                                            marginBottom: 20,                                        }}                                        src={x}                                        alt={i}                                        loading="lazy"                                />)}                                <div className='d-flex wrap'>                                    {oneAd.photos.map((x, i) => i !== 0 &&                                        <img key={i}                                             style={{                                                 height: 100,                                                 width: 130,                                                 objectFit: "fill",                                                 marginRight: 10,                                                 marginBottom: 10                                             }}                                             src={x}                                             alt={i}                                             loading="lazy"                                             onMouseEnter={() => displayImg(i)}                                        />)}                                </div>                                )}                            </ImageListItem>                            <Container style={{width: 'fit-content'}}>                                {!reservation ? <Calendar reservDays={oneAd.reservation}/> :                                    <ReservationDatePicker reservDays={oneAd.reservation}                                                           setReservDays={setReservDays}/>}                            </Container>                        </ImageList>                    </div>                </div>                <Box style={{margin: 16, position: 'relative', height: 500, width: 300}}>                    <Typography variant={'h6'}>                        City: {oneAd.city}                    </Typography>                    <Typography variant={'h6'}>                        Price: {oneAd.price} Eur/night                    </Typography>                    <Typography variant={'h6'}>                        {oneAd.description}                    </Typography>                    <Box style={{display: "flex", flexDirection: "column", position: "absolute", bottom: -100}}>                        {administrator && <div className='d-flex column'>                            {!reservation ?                                <Button onClick={() => setReservation(!reservation)} variant={"contained"}>Set                                    reservation</Button>                                : <Button onClick={saveReservation} style={{margin: '5px 0'}} variant={"contained"}>Save                                    reservation</Button>}                            {reservation &&                                <Button onClick={cancel} style={{margin: '5px 0'}}                                        variant={"contained"}>cancel</Button>}                            {error && <Typography variant={"subtitle2"}                                         style={{backgroundColor: "red", padding: 10, borderRadius: 5, marginTop: 10}}>                                {error}                            </Typography>}                        </div>}                    </Box>                </Box>            </Card>        </Container>    </ThemeProvider>);};export default SingleAd;