
import React, { useCallback, useEffect, useState } from 'react'

const App = () => {

  //API - https://dummyjson.com/products?limit=10&skip=10

  const [pageNo, setPageNo] = useState(0);
  const [pageData,setPageData] = useState(null);

  const getData = async(pageNo)=>{
    const data = await  fetch(`https://dummyjson.com/products?limit=9&skip=${pageNo*9}`).then(res=>res.json());
    setPageData(data);
  }

  const nextPage=()=>{
    if((pageNo+1)*9 < pageData?.total){
      setPageNo((no)=>no+1);
    }
  }
  const prevPage=()=>{
    if(pageNo*9 > 0){
      setPageNo((no)=>no-1);
    }
  }

  const showNo = useCallback((i)=>{
    if(i<pageNo && pageNo-2 >i || i>pageNo && pageNo+2<i){
      return false;
    }else{
      return true;
    }
  },[pageNo])

  useEffect(()=>{
    getData(pageNo);
  },[pageNo])

  return (
    <div className='flex flex-col items-center p-20'>
      <h1 className='text-3xl'>Products</h1>
      <div className='flex flex-wrap justify-center w-full'>
      {
        pageData?.products.map(each=>{
          return <div className='flex flex-row items-center w-1/4 m-4 bg-blue-100 p-2 rounded-xl' key={each.id}>
            <img src={each.thumbnail} alt={each.title} className='w-32 h-32 object-cover' />
            <div className='flex flex-col ml-2'>
            <h2 className='text-lg font-semibold'>{each.title}</h2>
            <p className='max-w-40 max-h-28 overflow-hidden'>{each.description}</p>
            </div>
          </div>
        })
      }
      </div>

      <div className='flex flex-row w-fit'>
        {
          pageNo!==0 ? 
          <div className='flex items-center gap-2 px-4 py-3 border-2 border-blue-400 rounded-full w-fit cursor-pointer' onClick={()=>{prevPage()}}>
          <span>&lt;</span> Previous
        </div>
        : ""
        }

        {
          pageData? [...new Array(Math.floor(pageData.total/9)+1)].map((each,i)=>{
            return showNo(i) ? <div className={`w-12 h-12  mx-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200   ${pageNo=== i ? "bg-blue-500 text-white" : " bg-slate-50"}`} onClick={()=>{setPageNo(i)}} >{i+1}</div>
             : <div className='w-fit h-12 mx-1 rounded-full flex items-center justify-center cursor-pointer'> . </div>
          })
          : ""
        }


        {
          (pageNo+1)*9 < pageData?.total ?
          <div className='flex items-center gap-2 px-4 py-3 border-2 border-blue-400 rounded-full w-fit cursor-pointer' onClick={()=>{nextPage()}}>
          Next <span>&gt;</span>
       </div>
       : ""
        }
      </div>
    </div>
  )
}

export default App