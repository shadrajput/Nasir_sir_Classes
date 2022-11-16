import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import Cards from "../asset/cards";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { AiOutlineRight } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { Alloverstudent } from "../hooks/usePost";
import { toast } from "react-toastify";
import Loader from '../Componant/Loader';
import { NasirContext } from "../NasirContext";
import ReactPaginate from "react-paginate";


export default function Dashboard() {
  const componentRef = useRef();
  const [isPrint, setIsPrint] = useState(false);
  const [isloading, setloading] = React.useState(true)
  const [currentItems, setcurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [Serialno, setserialno] = useState(1)
  const itemsPerPage = 6;
  
  const { section, admin } = React.useContext(NasirContext);

  console.log(admin);

  // ---------------------------------------------------------------
  // --------------------    API Works       -----------------------
  // ---------------------------------------------------------------

  const [Student, setstudent] = useState();
  const [PaginationData, setPaginationData] = useState([]);
  const Toaster = () => { toast.success('New Staff Register successfully') }
  const errtoast = () => { toast.error("Something Wrong") }
  console.log(section)
  const response = Alloverstudent(section == "primary" ? 0 : 1)


  useEffect(() => {
    async function fetchfacultdata() {
      const res = await Alloverstudent(section);
      console.log(section)
      setstudent(() => res.data)
      setloading(false);
    }
    fetchfacultdata()
  }, [])

  console.log(Student, "student")


  // // -------------------------------
  // // -------- Pagination -----------
  // // -------------------------------
  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   setcurrentItems(Student.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(Student.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, Student])

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % Student.length;
  //   setserialno(event.selected + 1)
  //   setItemOffset(newOffset);
  // };


  if (isloading) {
    return <Loader />
  }

  return (
    <div className="">
      <div className="pt-0 md:flex items-center justify-center md:justify-between mr-5 ">
        <div className="left pt-0 ">
          <img src="/images/desk.webp" alt="" className="" />
        </div>
        <Cards />
      </div>
      <div className="flex justify-center items-center p-10 pt-0">
        <div className="overflow-x-auto relative  sm:rounded-lg bg-white p-10 shadow-xl space-y-5 w-full">
          <div className="print-btn flex items-center space-x-3">


            <ReactToPrint
              trigger={() => (
                <button id='print' className="text-3xl bg-class2-50 rounded-md text-white p-1">
                  <MdLocalPrintshop />
                </button>
              )}
              content={() => componentRef.current}
              onBeforeGetContent={(e) => {
                return new Promise((resolve) => {
                  setIsPrint(true);
                  resolve();
                });
              }}
              onAfterPrint={() => setIsPrint(false)}
            />

          </div>
          <div ref={componentRef} className='p-5 pt-3 pb-0'>
            <table className="w-full text-sm text-center bg-class2-50 rounded-xl  " >
              <thead className="text-xs text-gray-700 uppercase">
                <tr className="text-white text-base">
                  <th scope="col" className="py-7 px-5 text-center ">
                    Serial No
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Name
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Class
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Phone
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Total
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Paidup
                  </th>
                  <th scope="col" className="py-7 px-5 text-center ">
                    Pending
                  </th>
                  <th scope="col" className={`py-7 px-5 text-center  ${isPrint ? "hidden" : "block"}`}>
                    Action
                  </th>
                </tr>
              </thead>
              {Student.length > 0 ?
                (
                  <tbody className="bg-white border items-center ">
                    {
                      Student.map((item, key) => {
                        const Paid_up = [
                          item.academics[0].fees[0].net_fees - item.academics[0].fees[0].pending_amount
                        ]
                        if (item.academics[0].fees[0].pending_amount > 0) {
                          return (
                            <tr className="border-b" >
                              <td className="py-7 px-5 text-center ">{item.student_id}</td>
                              <td className="py-7 px-5 text-center ">{item.basic_info[0].full_name}</td>
                              <td className="py-7 px-5 text-center ">{item.academics[0].class[0].class_name}</td>
                              <td className="py-7 px-5 text-center ">{item.contact_info[0].whatsapp_no}</td>
                              <td className="py-7 px-5 text-center ">{item.academics[0].fees[0].net_fees}</td>
                              <td className="py-7 px-5 text-center ">{Paid_up}</td>
                              <td className="py-7 px-5 text-center ">{item.academics[0].fees[0].pending_amount}</td>
                              <td className={`py-7 px-5 text-center  ${isPrint ? "hidden" : "block"}`}>
                                <div className="flex justify-center space-x-2">
                                   <NavLink className="nav-link" to={`/myclass/class/Profilestudent/${item.student_id}`}>
                                    <Tooltip
                                      content="Show"
                                      placement="bottom-end"
                                      className="text-white bg-black rounded p-2"
                                    >
                                      <span className="text-xl text-darkblue-500">
                                        <AiFillEye />
                                      </span>
                                    </Tooltip>
                                  </NavLink>

                                </div>
                              </td>
                            </tr>
                          )

                        }
                      })}
                  </tbody>
                ) : (
                  <div className="bg-red-200 font-bold items-center p-2 rounded mx-3 flex space-x-2">
                    <IoMdInformationCircle className="text-xl text-red-600" />

                    <h1 className="text-red-800">Student Not avaiable </h1>
                  </div>
                )}
            </table>
          </div>
          <div className=' flex justify-end items-center ml-32 py-5' >
            <div className=' py-2'>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
