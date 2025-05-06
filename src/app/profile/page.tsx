import React from 'react'
import ProfileInfo from './ProfileInfo'
import ProfileOrders from './ProfileOrders'
import axiosInstance from '@/axios';
import { IGetData } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile'
};

export default async function Profile() {
  const res = await axiosInstance.get("/get-data/");
  const getData: IGetData = res.data;  return (
    <div className='container mx-auto px-5 md:px-0 mb-12 lg:mb-20  py-10 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-5'>
      <ProfileInfo/>
      <ProfileOrders getData={getData}/>
    </div>
  )
}
