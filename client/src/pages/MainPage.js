import React, {useContext, useEffect} from 'react';import http from "../plugins/http";import context from "../context/mainContext";import Ad from "../components/Ad";const MainPage = () => {    const {ads, setAds} = useContext(context)    useEffect(async () => {        const data = await http.get('get-ads')        if (data.success) setAds(data.message)    }, [])    return (        <div className='d-flex wrap'>            {ads.map((ad, i) => <Ad ad={ad} key={i}/>)}        </div>    );};export default MainPage;