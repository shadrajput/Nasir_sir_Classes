import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { FiUsers } from "react-icons/fi";
import Facultytable from "../Componant/facultytable";
import { FaPlus } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAllFaculty, Addfaculty } from "../hooks/usePost"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../Componant/Loader';


const Faculty = () => {
  // ------------------------------------------------------------------------------------
  // -------------------------- Use_State -----------------------------------------------
  // ------------------------------------------------------------------------------------
  const [model, setModel] = React.useState(false);
  const [isloading, setloading] = React.useState(true)
  const [isPrint, setIsPrint] = useState(false);
  const form = useRef()





  // ------------------------------------------------------------------------------------
  // -------------------------- API Works -----------------------------------------------
  // ------------------------------------------------------------------------------------
  const [data, setData] = useState();
  const Toaster = () => { toast.success('New Staff Register successfully') }
  const errtoast = () => { toast.error("Something Wrong") }

  useEffect(() => {
    async function fetchfacultdata() {
      const res = await getAllFaculty();
      setData(() => res)
      setloading(false);
    }
    fetchfacultdata()
  }, [])

  // ------------------------------------------------------------------------------------
  // -------------------------- FORM VALIDATION -----------------------------------------
  // ------------------------------------------------------------------------------------
  const [img, setImg] = useState("./images/profile.jpeg");
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    resetField,
  } = useForm();
  const onSubmit = async (data) => {
    const formdata = new FormData(form.current);
   
    const response = await Addfaculty(formdata)
    console.log(response , "res")
    console.log(response.data.data.success)
    if (response.data.data.success) {
      Toaster()
      handleClick()
      return setModel(false)
    } else {
      return errtoast()
    }

  }
  const handleClick = () => {
    resetField("photo"); resetField("full_name"); resetField("email"); resetField("whatsapp_no"); resetField("mobileno"); resetField("dob");
    resetField("joining_date"); resetField("role"); resetField("address"); resetField("gender");
    setImg('')
    setModel(false)
  }

  if (isloading) {
    return <Loader />
  }

  return (
    <>

      <div className="relative ">
        {model && (
          <div className='flex justify-center shadow-2xl  '>
            <div className='absolute  mx-auto  opacity-100 shadow-2xl rounded mt-10 bg-white w-2/3 z-50'>
              <div className=''>
                <div className='flex justify-end '>
                  <button onClick={handleClick} className='absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-red-700'>

                    <AiFillCloseCircle />
                  </button>

                </div>
                <div className='mt-7'>
                  <h1 className='text-2xl font-bold text-darkblue-500 px-6 '>Registration</h1>

                  <form ref={form} className="flex justify-center items-center " onSubmit={handleSubmit(onSubmit)}>
                    <div className=" w-full grid grid-cols-1 rounded-lg  bg-white pb-5 pt-10 ">
                      <div className=" flex flex-col items-center gap-4">
                        <div className='profile_img_div border-2 border-gray-500 shadow-lg'>
                          <img src={img} width="100%" height="100%" alt="student profile" />
                          <div className='profile_img_overlay flex flex-col justify-center items-center'>
                            <input type='file' name='photo' className="rounded-md w-16" onChange={onImageChange} />

                          </div>
                        </div>
                        <div className="flex lg:flex-row md:flex-col gap-4 ">
                          <div className="fullname">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Full Name
                              </span>
                              <input
                                type="text"
                                placeholder="First Name, Middle Name, Last Name"
                                className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.full_name && 'border-red-600'}`}
                                {...register("full_name", { required: "Fullname is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                                onKeyUp={() => {
                                  trigger('full_name')
                                }}
                              />
                              {errors.full_name && (<small className="text-red-700">{errors.full_name.message}</small>)}
                            </label>
                          </div>
                          <div className="email">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Email
                              </span>
                              <input
                                type="text"
                                placeholder="Enter Your Email"
                                className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.email && 'border-red-600'}`}
                                {...register("email", { required: "Email is required", pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Please enter valid email" } })}
                                onKeyUp={() => {
                                  trigger('email')
                                }}
                              />
                              {errors.email && (<small className="text-red-700">{errors.email.message}</small>)}
                            </label>
                          </div>
                          <div className="whatsappno">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                WhatsApp No
                              </span>
                              <input
                                type="text"
                                placeholder="Enter Your WhatsApp No"
                                className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.whatsapp_no && 'border-red-600'}`}
                                {...register("whatsapp_no", { required: "Whatsapp no is required", pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" }, minLength: { value: 10, message: "Please enter valida whatsapp no" } })}
                                onKeyUp={() => {
                                  trigger('whatsappno')
                                }}
                              />
                              {errors.whatsapp_no && (<small className="text-red-700">{errors.whatsapp_no.message}</small>)}
                            </label>
                          </div>
                        </div>
                        <div className="flex lg:flex-row md:flex-col gap-4 items-center">

                          <div className="mobileno">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Mobile No
                              </span>
                              <input
                                type="text"
                                placeholder="Enter Your Mobile No"
                                className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.mobileno && 'border-red-600'}`}
                                {...register("mobileno", { required: "Mobile no is required", pattern: { value: /^[0-9]*$/, message: "Please enter only numbers" }, minLength: { value: 10, message: "Please enter valida mobile no" } })}
                                onKeyUp={() => {
                                  trigger('mobileno')
                                }}
                              />
                              {errors.mobileno && (<small className="text-red-700">{errors.mobileno.message}</small>)}
                            </label>
                          </div>
                          <div className="dateofbirth">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Date Of Birth
                              </span>
                              <input
                                type="date"
                                className={`xl:w-52 2xl:w-60 hover:cursor-pointer mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.dob && 'border-red-600'}`}
                                {...register("dob", { required: "Date of birth is required" })}
                              />

                              {errors.dob && (<small className="text-red-700">{errors.dob.message}</small>)}
                            </label>
                          </div>
                          <div className="gender ">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Gender
                              </span>
                              <div className=" border xl:w-52 2xl:w-60 border-slate-300 mt-1 rounded-md h-10 flex justify-center items-center space-x-5 ">
                                <div className="male ">

                                  <label for="gender" className="m-2">
                                    Male
                                  </label>
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="Male"
                                    className="  hover:cursor-pointer"
                                    {...register("gender", { required: "Gender is required" })}
                                  />
                                </div>
                                <div className="female">
                                  <label for="gender" className="m-2">
                                    Female
                                  </label>
                                  <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="Female"
                                    className="   hover:cursor-pointer"
                                    {...register("gender", { required: "Gender is required" })}
                                  />

                                </div>

                              </div>
                            </label>
                            {errors.gender && (<small className="text-red-700">{errors.gender.message}</small>)}
                          </div>
                        </div>
                        <div className="flex lg:flex-row md:flex-col gap-4">
                          <div className="role">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Role
                              </span>
                              <input
                                type="text"
                                placeholder="Enter Your Role"
                                className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.role && 'border-red-600'}`}
                                {...register("role", { required: "Role is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                                onKeyUp={() => {
                                  trigger('role')
                                }}
                              />
                              {errors.role && (<small className="text-red-700">{errors.role.message}</small>)}
                            </label>
                          </div>
                          <div className="address">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Address
                              </span>
                              <input
                                type="text"
                                placeholder="Enter Your Address"
                                className={`xl:w-52 2xl:w-60 mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.address && 'border-red-600'}`}
                                {...register("address", { required: "Address is required", pattern: { value: /^[A-Za-z ]+$/, message: "Please enter only characters" } })}
                                onKeyUp={() => {
                                  trigger('address')
                                }}
                              />
                              {errors.address && (<small className="text-red-700">{errors.address.message}</small>)}
                            </label>
                          </div>
                          <div className="dateofjoining">
                            <label className="block">
                              <span className="block text-sm font-medium text-slate-700">
                                Date Of Joining
                              </span>
                              <input
                                type="date"
                                className={`xl:w-52 2xl:w-60 hover:cursor-pointer mt-1 block  px-3 py-2 bg-white border  border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none ${errors.joining_date && 'border-red-600'}`}
                                {...register("joining_date", { required: "Date of joining is required" })}
                              />

                              {errors.joining_date && (<small className="text-red-700">{errors.joining_date.message}</small>)}
                            </label>
                          </div>
                        </div>
                        <div className="flex lg:flex-row md:flex-col gap-4">

                          <div className="btn mt-5 flex justify-center w-60">
                            <button
                              type="button" onClick={handleClick}
                              className="bg-blue-900 hover:bg-white border-2 hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                            >
                              Clear
                            </button>
                            <button
                              type="submit"
                              className="bg-blue-900 hover:bg-white border-2 flex justify-center items-center  hover:border-blue-900 text-white hover:text-blue-900 font-medium h-11 w-28 rounded-md tracking-wider"
                            >


                              <h1 className="" >SUBMIT</h1>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>





                </div>

              </div>
            </div>
          </div>


        )}

        <div className={`bg-slate-100 ${model && "opacity-5"}`}>
          <div className="mt-5 ">
            <div className="xl:flex xl:justify-between justify-center items-center  p-5 pt-2 xl:pl-12 space-y-5">
              <h1 className=" text-xl xl:text-3xl text-center xl:text-left text-darkblue-500 font-bold">
                Staff

              </h1>
              <NavLink className="nav-link" to="">

                <div className="button flex justify-center text-center items-center space-x-4  ">
                  <div className="wrapper">
                    <div
                      className="btn cursor-pointer  h-12 w-56 rounded-full bg-white text-left border  overflow-hidden "
                      id="btn"
                    >
                      <div
                        className="icons  h-12 w-52 flex ml-3 items-center "
                        id="icons"
                        onClick={(e) => setModel(true)}
                      >
                        <FaPlus className="text-2xl text-darkblue-500  " />
                        <span className="ml-3 text-lg text-darkblue-500 font-semibold">
                          Add New Member
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="pt-0 xl:flex items-center px-20  ">
              <div className=" left ">
                <img
                  src="/images/faculty.png"
                  alt=""
                  className=" w-2/3 "
                />
              </div>
              <div className="right  flex justify-center">
                {/* <div>
                  <div className="card h-44 w-52 bg-white drop-shadow-md flex py-5 space-y-5">

                    <div className='bg-blue-300 w-20 h-20 flex justify-center items-center rounded-md relative left-5 bottom-12 drop-shadow-lg'>
                      <FiUsers className='text-blue-500 text-4xl' />
                    </div>
                    <div className='space-y-3'>
                      <h1 className='text-xl text-gray-600 relative bottom-7 left-32 font-semibold '>Total Staff</h1>
                      <p className=' text-5xl font-bold ml-12 text-blue-500'>{data.staffData.length}</p>
                    </div>
                  </div>
                </div> */}
                {/* <div
                  id="faculty-card"
                  className=" cursor-pointer  w-48 h-32 2xl:w-52 rounded-lg xl:h-28 bg-class10-50  xl:space-y-3 space-y-2 "
                >
                  <div className="flex items-center text-center justify-center space-x-5 pt-3 ">
                    <MdPendingActions className=" text-class10-50 rounded-full xl:text-5xl text-5xl  xl:p-1 p-1 bg-white" />
                    <p className="text-white text-4xl">578</p>
                  </div>
                  <h1 className="text-white text-xl ">
                    Pending <span>Staff</span>
                  </h1>
                </div> */}
                <div
                  id="faculty-card"
                  className=" p-5 flex items-center  rounded-lg  bg-class5-50 drop-shadow-lg space-x-7  ml-10 "
                >
                  <div className="space-y-3">
                    <div className='flex items-center justify-center bg-white h-14 w-14 ml-5 rounded-md'>
                      <FiUsers className="text-4xl text-class5-50" />
                    </div>
                    <h1 className="text-gray-200 xl:text-xl uppercase text-center  ">
                      Staff Total
                    </h1>
                  </div>
                  <p className=" font-semibold text-white xl:text-5xl">578</p>
                </div>
              </div>
            </div>
            <Facultytable />
          </div>
        </div>

      </div>

    </>
  )

}

export default Faculty














