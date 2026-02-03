import  connectdb  from '@/dbcoonect/connectdb';
import hotel from "@/models/hotel";
import React from 'react'

const getallhoteldata = async () => {
    try {
        await connectdb();
        const alldata = await hotel.find({})
        return alldata || []
    } catch (error) {
        return null
    }

}

export default getallhoteldata
