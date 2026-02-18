import { getdata } from '@/utils/getdata'; // Named import with curly braces
import Hotelpage from '@/components/hotelpage';
import { notFound } from 'next/navigation';
import React from 'react';
export default async function serverpagehotel({ params }) {
  const { hotel } = await params;
  if (!hotel) {
    notFound();
  }
  const send = await getdata(hotel);
  
  if(!send || send.length === 0) {
   console.log(' this page do not have menu items');
  }
  
  // Convert Mongoose documents to plain objects to avoid circular references
  const plainData = JSON.parse(JSON.stringify(send));
  
  
  return <Hotelpage data={plainData} />;
}