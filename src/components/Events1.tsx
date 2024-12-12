import { useState, useEffect } from 'react';
import concrete from '../constants/concrete_success.jpeg'
import tedx from '../constants/tedx.jpeg'
import spark from '../constants/spark.jpeg'
import { Calendar, MapPin} from 'lucide-react';

export default function Events1() {
  return (
    <div className=" text-white mx-20">
        <h1 className='font-bold text-3xl text-center py-10 pb-14 font-Montserrat'>Past Events</h1>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
      <div className='p-2 w-full'>
        <img src={concrete} alt="" className='h-64 w-full rounded-t-xl' />
        <div className=' bg-slate-950 border-b-2 py-6 rounded-b-md px-4 flex flex-col gap-2 justify-center font-OpenSans'>
        <h1 className='font-Roboto font-semibold text-xl'>Concrete Success</h1>
        <div className='flex'>
            <Calendar className="h-5 w-5 mr-2 text-red-500" />
            <p className='text-gray-400'>Invalid date</p>
            </div>
            <div className='flex'>
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            <p className='text-gray-400'>Bhimavaram</p>
            </div>
        </div>
      </div>
      <div className='p-2 w-full'>
        <img src={tedx} alt="" className='h-64 w-full rounded-t-xl' />
        <div className=' bg-slate-950 border-b-2 py-6 rounded-b-md px-4 flex flex-col gap-2 justify-center font-OpenSans'>
        <h1 className='font-Roboto font-semibold text-xl'>TedX</h1>
        <div className='flex'>
            <Calendar className="h-5 w-5 mr-2 text-red-500" />
            <p className='text-gray-400'>Invalid date</p>
            </div>
            <div className='flex'>
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            <p className='text-gray-400'>Bhimavaram</p>
            </div>
        </div>
      </div>
      <div className='p-2 w-full'>
        <img src={spark} alt="" className='h-64 w-full rounded-t-xl ' />
        <div className=' bg-slate-950 border-b-2 py-6 rounded-b-md px-4 flex flex-col gap-2 justify-center font-OpenSans'>
        <h1 className='font-Roboto font-semibold text-xl'>Spark Tank</h1>
        <div className='flex'>
            <Calendar className="h-5 w-5 mr-2 text-red-500" />
            <p className='text-gray-400'>Invalid date</p>
            </div>
            <div className='flex'>
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            <p className='text-gray-400'>Bhimavaram</p>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}