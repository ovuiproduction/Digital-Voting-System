import React,{useState,useEffect} from "react";
import axios from "axios";

export default function AssemblyList({state,onSelectAssembly}){
    const [assembly,setAssembly] = useState("");
    const [assemblyList,setAssemblyList] = useState([]);

    const fetchAssemblyList = async() => {
        try{
          const response = await axios.post('http://localhost:5000/fetch-assembly-list',{state:state});
          if(response.status == 200){
            setAssemblyList(response.data.data);
          }else if(response.status == 400){
            alert('server not responding...');
          }
        }catch(error){
          alert('Data not fetched due to some technical errors');
        }
      };
    
    useEffect(()=>{
        fetchAssemblyList();
    },[state]);

    useEffect(()=>{
        if(assembly!=""){
            onSelectAssembly(assembly);
        }
    },[assembly]);
    return(
        <>
         <div className="election-stage-2-custom-select-wrapper">
            <select
              className="election-stage-2-voter-details-form-select"
              value={assembly}
              onChange={(e) => setAssembly(e.target.value)}
            >
            <option value="">Please select your Assembly constituency</option>
            {assemblyList && assemblyList.map((assemblyName,index)=>(
                <option key={index} value={assemblyName}>{assemblyName}</option>
            ))}
            </select>
          </div>
        </>
    )
}   