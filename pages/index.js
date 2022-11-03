import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Test from '../components/Signin';
import { useSelector, useDispatch } from 'react-redux';
import RightDrawer from '../components/RightDrawer';
import { Box, CircularProgress, Container } from '@mui/material';
import Layout from '../components/Layout';
import firebase, { tokenSignin, checkSignin } from '../actions/auth.action';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Home() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(checkSignin());
    setTimeout(()=>router.push('/auctions'),0);
  }, [])


  return (
    <div>
      Welcome to Bidding Cars<br />
      Redirecting to live auctions...<br/>
      <CircularProgress/>

    </div>
  );
}
