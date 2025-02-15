import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AnaliticJournalForm from '../components/AnaliticJournal/AnaliticJournalForm';
import AnaliticJournalTable from "../components/AnaliticJournal/AnaliticJournalTable";
import { message } from 'antd';
import { AuthContext } from "../components/AuthContext";
import Spinner from '../components/Spinner';


export default function WaterBalance() {
    const [dataTable, setDataTable] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGetData = (start_time,end_time) => {
        getData(start_time,end_time)
    }

    const getData = (start_time,end_time) => {
        setIsLoading(true);
        const url = `http://127.0.0.1:8000/analitic/journal?start_time=${start_time}&end_time=${end_time}`
        axios.get(url,{withCredentials: true}).then((response)=>{ 
            const add_key_data = response.data.map((item,index)=>({
                ...item,
                "key":index,
            }))
            // setDataTable(response.data)
            setDataTable(add_key_data)
        })
        .catch((error) => {
            if (error.status === 401){
                message.error("Пользователь не авторизован")
                setIsAuth(false)
                navigate("/login");
            }else if (error.status === 403){
                message.error("Недостаточно прав")
            }else if (error.status === 404){
                message.error("Ничего не найдено")    
            }else{
                message.error(error.message)
            }
            setDataTable([]);
        })
        .finally(() => {
            setIsLoading(false); 
        });  
    };
    return(
        <>
            <div className='form-range analitic-journal-form'>
                <AnaliticJournalForm onSubmit={handleGetData}/>
            </div>
            {isLoading ? <Spinner /> : 
                (<div className='container-page analitic-journal'>
                    <AnaliticJournalTable data={dataTable}/> 
                </div>
             )}  
        </>
    )
}