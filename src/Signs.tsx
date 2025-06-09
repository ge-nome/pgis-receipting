import { useState } from "react"
import { supabase } from './supabaseClient'
import TOTP2FA from "./authentic"
import TwoFASetup from "./authentic"

const Signs = () => {
    const [objects, setObjects] = useState({
        id:'',
        firstname:'',
        lastname:'',
        email:'',
        phone:'',
        password:'',
    })
    const [which, setWhich] = useState(true)
    const [next, setNext] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setLoading(true)
    
        // console.log(Object.values(objects).every(x => !!x))
        //     // if(Object.values(data).every(x => !!x)===false || Object.values(error).length > 0){
        //     //     seterror({...error, submit:'Kindly complete the form correctly'})
        //     //     setice(false)
        //     // }
        //     // else{
        const { data, error } = await supabase
          .from('felhasznalok')
          .insert([
            { 
              name:objects.firstname+' '+objects.lastname,
              email_address:objects.email,
              phone:objects.phone,
              password:objects.password,
              auth_status:false,
              auth_level: 0
            }
          ])
    
        if (error) {
          console.error('Insert error:', error.message)
          console.log('Something went wrong.')
        } else {
          console.log('Thanks and congratulations')
          setNext(true)
        }
    
        
      }
    return (
        <div className="m-auto my-9">
        <div>
            <h1 className="text-4xl font-bold mb-5 w-[90%] m-auto">PGIS</h1>
            <hr className=" mb-9 opacity-20"/>
            
        </div>
        {
            which ? 
            <form className='grid gap-4 w-[90%] m-auto'>
                <h2 className="text-3xl text-center mb-5 font-bold">Sign Up</h2>
                {
                    !next?
                    <div className="grid gap-4">
                        <div className='grid gap-2'>
                            <label htmlFor="" className='text-lg'>First Name</label>
                            <input type="text" className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" placeholder='Trevor' onChange={(e)=>setObjects({...objects, firstname: e.target.value})}/>
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor="" className='text-lg'>Last Name</label>
                            <input type="text" className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" placeholder='Brooking' onChange={(e)=>setObjects({...objects, lastname: e.target.value})}/>
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor="" className='text-lg'>Email Address</label>
                            <input type="text" placeholder='someone@example.com' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, email: e.target.value})}/>
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor="" className='text-lg'>Phone number</label>
                            <input type="number" placeholder='08056478392' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, phone: e.target.value})}/>
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor="" className='text-lg'>Password</label>
                            <input type="password" placeholder='**********' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, password: e.target.value})}/>
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor="" className='text-lg'>Confirm Password</label>
                            <input type="password" placeholder='**********' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, password: e.target.value})}/>
                        </div>
                        <button className='w-[40%] p-3 mt-4 bg-[#212121] text-white rounded text-xl font-bold flex items-center gap-4 justify-center justify-self-end' onClick={handleSubmit}>
                            Next
                            <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.28249 1.91564C1.08536 1.71564 0.975842 1.45248 0.986794 1.1788C0.986794 0.905111 1.09631 0.652478 1.30439 0.452479C1.50153 0.263005 1.77532 0.147215 2.06007 0.147215C2.34481 0.147215 2.61861 0.241953 2.82669 0.431426L9.02539 6.38932C9.12395 6.48406 9.20061 6.59985 9.25537 6.72616C9.31013 6.85248 9.34299 6.98932 9.34299 7.12616C9.34299 7.26301 9.31013 7.39985 9.25537 7.53669C9.20061 7.66301 9.12395 7.7788 9.02539 7.87353L2.82669 13.8314C2.72812 13.9262 2.60765 14.0104 2.47623 14.063C2.33386 14.1156 2.19149 14.1472 2.04911 14.1472C1.90674 14.1472 1.75342 14.1262 1.62199 14.0735C1.49057 14.0209 1.3701 13.9367 1.26059 13.842C1.16202 13.7472 1.08536 13.6209 1.0306 13.4946C0.964889 13.3683 0.942986 13.2314 0.942986 13.0841C0.942986 12.9472 0.975841 12.8104 1.0306 12.6841C1.08536 12.5577 1.17297 12.442 1.28249 12.3367L6.70361 7.12616L5.67415 6.14722L1.28249 1.91564Z" fill="#ffffff"/>
                            </svg>
                        </button>
                        <button className='w-[100%] p-3 text-[#212121] rounded text-xl font-bold' onClick={(e)=>{e.preventDefault();setWhich(false)}}>Sign in</button>
                    </div>
                    :
                    <div>
                        {/* this should return the config that will then be used to update the db */}
                        <TwoFASetup email={objects.email}/>
                    </div>
                }
                
            </form>
            :
            <form className='grid gap-4 w-[90%] m-auto'>
                <h2 className="text-3xl text-center mb-5 font-bold">Sign In</h2>
                <div className='grid gap-2'>
                    <label htmlFor="" className='text-lg'>Email Address</label>
                    <input type="text" placeholder='someone@example.com' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, email: e.target.value})}/>
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="" className='text-lg'>Password</label>
                    <input type="password" placeholder='**********' className="rounded h-[40px] p-2 w-[100%] border border-1 border-gray-400" onChange={(e)=>setObjects({...objects, phone: e.target.value})}/>
                </div>
                {
                    loading ? 
                    <button className='w-[40%] p-3 mt-4 bg-[#212121] text-white rounded text-xl font-bold flex items-center gap-4 justify-center justify-self-end' onClick={handleSubmit}>
                        Next
                        <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.28249 1.91564C1.08536 1.71564 0.975842 1.45248 0.986794 1.1788C0.986794 0.905111 1.09631 0.652478 1.30439 0.452479C1.50153 0.263005 1.77532 0.147215 2.06007 0.147215C2.34481 0.147215 2.61861 0.241953 2.82669 0.431426L9.02539 6.38932C9.12395 6.48406 9.20061 6.59985 9.25537 6.72616C9.31013 6.85248 9.34299 6.98932 9.34299 7.12616C9.34299 7.26301 9.31013 7.39985 9.25537 7.53669C9.20061 7.66301 9.12395 7.7788 9.02539 7.87353L2.82669 13.8314C2.72812 13.9262 2.60765 14.0104 2.47623 14.063C2.33386 14.1156 2.19149 14.1472 2.04911 14.1472C1.90674 14.1472 1.75342 14.1262 1.62199 14.0735C1.49057 14.0209 1.3701 13.9367 1.26059 13.842C1.16202 13.7472 1.08536 13.6209 1.0306 13.4946C0.964889 13.3683 0.942986 13.2314 0.942986 13.0841C0.942986 12.9472 0.975841 12.8104 1.0306 12.6841C1.08536 12.5577 1.17297 12.442 1.28249 12.3367L6.70361 7.12616L5.67415 6.14722L1.28249 1.91564Z" fill="#ffffff"/>
                        </svg>
                    </button>
                    :
                    <button className='w-[40%] p-3 mt-4 bg-[#212121] text-white rounded text-xl font-bold flex items-center gap-4 justify-center justify-self-end' onClick={(e)=>e.preventDefault()}>
                        Please wait...
                        <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.28249 1.91564C1.08536 1.71564 0.975842 1.45248 0.986794 1.1788C0.986794 0.905111 1.09631 0.652478 1.30439 0.452479C1.50153 0.263005 1.77532 0.147215 2.06007 0.147215C2.34481 0.147215 2.61861 0.241953 2.82669 0.431426L9.02539 6.38932C9.12395 6.48406 9.20061 6.59985 9.25537 6.72616C9.31013 6.85248 9.34299 6.98932 9.34299 7.12616C9.34299 7.26301 9.31013 7.39985 9.25537 7.53669C9.20061 7.66301 9.12395 7.7788 9.02539 7.87353L2.82669 13.8314C2.72812 13.9262 2.60765 14.0104 2.47623 14.063C2.33386 14.1156 2.19149 14.1472 2.04911 14.1472C1.90674 14.1472 1.75342 14.1262 1.62199 14.0735C1.49057 14.0209 1.3701 13.9367 1.26059 13.842C1.16202 13.7472 1.08536 13.6209 1.0306 13.4946C0.964889 13.3683 0.942986 13.2314 0.942986 13.0841C0.942986 12.9472 0.975841 12.8104 1.0306 12.6841C1.08536 12.5577 1.17297 12.442 1.28249 12.3367L6.70361 7.12616L5.67415 6.14722L1.28249 1.91564Z" fill="#ffffff"/>
                        </svg>
                    </button>

                }
                <button className='w-[100%] p-3 text-[#212121] rounded text-xl font-bold' onClick={(e)=>{e.preventDefault();setWhich(true)}}>Sign up</button>
            </form>
        }
        </div>
    )
}

export default Signs
