import { useState } from 'react'
import thanks from './assets/thanks.png'
import './App.css'

function App() {
  const [close, setClose] = useState(true)

  return (
     <div className='w-[100%]'>
      <h2 className='text-3xl text-center py-5 font-bold'>PGIS</h2>
      <hr className='opacity-20'/>
      <div className='m-auto w-[90%] py-5'>
        <h3 className='text-2xl pb-4'>Receipt Processing System</h3>
        <form className='grid gap-4 w-[100%]'>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Name of Payer</label>
            <input type="text" className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" placeholder='Name of Payer'/>
          </div>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Amount Paid</label>
            <input type="number" placeholder='0.00' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" />
          </div>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Purpose</label>
            <input type="text" className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" />
          </div>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Balance</label>
            <input type="number" placeholder='0.00' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" />
          </div>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Auth Code</label>
            <input type="text" placeholder="XXXXXX" className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" />
          </div>
          <button className='w-[100%] p-3 bg-[#15d087] text-white rounded text-xl font-bold' onClick={(e)=>{e.preventDefault(); setClose(false)}}>Generate Receipt</button>
        </form>
      </div>
      {
        !close ?
        <div className='fixed grid justify-center items-center w-[100%] h-[100vh] z-20 bg-[#000000cc] top-0 left-0'>
        <div className='w-[90vw] bg-[#ffffff] rounded-xl'>
          <h3 className='text-xl text-center py-3  px-4 font-bold'>PRECIOUS GIFT INTERNATIONAL SCHOOL</h3>
          <div className='rounded-t-xl w-[100%] flex justify-center'>
            <img src={thanks} alt="" className='w-[30%]'/>
          </div>
          <div className='bg-[#a7a7a71a] p-3'>  
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Ref. Number</p>
              <p>203984709320</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Payer</p>
              <p>Odoemelam Odufeko</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Amount</p>
              <p>20,000</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Amount</p>
              <p>20,000</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Purpose</p>
              <p>Lesson</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Date of Issuance</p>
              <p>20th July, 2025</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Issuer</p>
              <p>Mr Ebube</p>
            </div>
          </div>
          
        </div>
        <button className='w-[100%] p-3 bg-[#15d087] text-white rounded text-xl font-bold'>Download Receipt</button>
        
        <div className='w-[100%] flex justify-center' onClick={(e)=>{e.preventDefault(); setClose(true)}}>
          <button className='self-center w-[50px] h-[50px] text-lg border border-1 border-white text-white rounded-full'>X</button>
        </div>
        </div>
        :
        ''
      }
     </div>
  )
}

export default App
