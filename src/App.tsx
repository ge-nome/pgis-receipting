import { useRef, useState } from 'react'
import thanks from './assets/thanks.png'
import './App.css'
import html2canvas from 'html2canvas'
import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'


type purposes =[
  id:number,
  name:string,
]

type data = [
    id:string,
    payer:string,
    amount_paid:string,
    amount_left:string,
    purpose:number,
    auth_c:string,
    issuance_date:string,
    issuer:string
]

function App() {
  const [close, setClose] = useState(true)
  const cardRef = useRef()

  const capturetd = async (name) => {
    const canvas = await html2canvas(cardRef.current, {allowTaint: true})
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement('a')
      link.href = dataUrl
      link.download = name
      link.click()
  }

  // Create data object
  const [objects, setObjects] = useState({
    id:'',
    payer:'',
    amount_paid:'',
    amount_left:'',
    purpose:'',
    auth_c:'',
    issuance_date:'',
    issuer:''
  })

  const [purposes, setPurposes] = useState([
    {
      id:1,
      name: 'School fees'
    },
    {
      id:2,
      name: 'Lesson fees'
    },
    {
      id:3,
      name: 'End of the year party'
    },
    {
      id:4,
      name: 'Skill Acquisition'
    },
    {
      id:5,
      name: 'WAEC certificate'
    },
    {
      id:6,
      name: 'NECO certificate'
    },
    {
      id:7,
      name: 'Testimonial'
    },
    {
      id:8,
      name: 'Statement of Result'
    },
  ])

  const handler = (value, payload) =>{
        // to handle errors start here
        
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setLoading(true)

    console.log(Object.values(objects).every(x => !!x))
        // if(Object.values(data).every(x => !!x)===false || Object.values(error).length > 0){
        //     seterror({...error, submit:'Kindly complete the form correctly'})
        //     setice(false)
        // }
        // else{
    const { data, error } = await supabase
      .from('payments')
      .insert([
        { 
          payer:objects.payer,
          amount_paid:objects.amount_paid,
          amount_left:objects.amount_left,
          purpose:objects.purpose,
          auth_c:objects.auth_c,
          issuer:'Danula Fotom'
        }
      ])

    if (error) {
      console.error('Insert error:', error.message)
      console.log('Something went wrong.')
    } else {
      console.log('Thanks and congratulations')
      setClose(false)
    }

    setLoading(false)
  }
              
  return (
     <div className='w-[100%]'>
      <h2 className='text-3xl text-center py-5 font-bold'>PGIS</h2>
      <hr className='opacity-20'/>
      <div className='m-auto w-[90%] py-5'>
        <h3 className='text-2xl pb-4'>Receipt Processing System</h3>
        <form className='grid gap-4 w-[100%]'>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Name of Payer</label>
            <input type="text" className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" placeholder='Name of Payer' onChange={(e)=>setObjects({...objects, payer: e.target.value})}/>
          </div>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Amount Paid</label>
            <input type="number" placeholder='0.00' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, amount_paid: e.target.value})}/>
          </div>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Purpose</label>
            <select className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, purpose: e.target.value})}>
              <option value="">Purpose of Payment</option>
              {
                purposes.map(({id, name})=>(
                  <option key={id} value={name}>{name}</option>
                ))
              }
              
            </select>
          </div>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Balance</label>
            <input type="number" placeholder='0.00' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, amount_left: e.target.value})}/>
          </div>
          <div className='grid gap-2'>
            <label htmlFor="" className='text-lg'>Auth Code</label>
            <input type="text"maxLength={6} placeholder="XXXXXX" className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, auth_c: e.target.value})}/>
          </div>
          <button className='w-[100%] p-3 bg-[#15d087] text-white rounded text-xl font-bold' onClick={handleSubmit}>Generate Receipt</button>
        </form>
      </div>
      {
        !close ?
        <div  className='fixed grid justify-center items-center w-[100%] h-[100vh] z-20 bg-[#000000cc] top-0 left-0'>
        <div className='w-[90vw] bg-[#ffffff] rounded-xl' ref={cardRef}>
          <h3 className='text-xl text-center py-3  px-4 font-bold'>PRECIOUS GIFT INTERNATIONAL SCHOOL</h3>
          <div className='rounded-t-xl w-[100%] flex justify-center'>
            <img src={thanks} alt="" className='w-[30%]'/>
          </div>
          <div className='bg-[#a7a7a71a] p-3'>  
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Ref. Number</p>
              <p>{Math.random()}</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Payer</p>
              <p>{objects.payer}</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Amount</p>
              <p>{objects.amount_paid}</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Amount</p>
              <p>{objects.amount_left}</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Purpose</p>
              <p>
                {       
                  objects.purpose
                }
              </p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Date of Issuance</p>
              <p>{Date.now()}</p>
            </div>
            <hr className='opacity-20'/>
            <div className='flex justify-between py-3'>
              <p className='font-bold'>Issuer</p>
              <p>{objects.issuer}</p>
            </div>
          </div>
          
        </div>
        <button className='w-[100%] p-3 bg-[#15d087] text-white rounded text-xl font-bold' onClick={()=>capturetd(objects.payer)}>Download Receipt</button>
        
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
