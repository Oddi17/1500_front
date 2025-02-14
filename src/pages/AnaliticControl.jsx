import React,{useState,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ACFormWater from '../components/AnaliticContol/ACFormWater'
import ACFormSecRis from '../components/AnaliticContol/ACFormSecRis'
import {Spin,message} from 'antd';
import { AuthContext } from "../components/AuthContext";
import '../css/AnaliticControl.css';


function AnaliticControl(){
    const [reset,setReset] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSend= (data,url) => {
        setIsLoading(true);
        axios.post(`http://127.0.0.1:8000/analitic/${url}`,data,{withCredentials: true})
        .then((response)=>{ 
            setReset(true)
            message.success("Данные успешно отправлены")
        })
        .catch((error) => {
            if (error.status === 401){
                message.error("Пользователь не авторизован")
                setIsAuth(false)
                navigate("/login");
            }else if (error.status === 403){
                message.error("Недостаточно прав")
                setReset(true)
            }else{
                message.error(error.message)
            }
        })
        .finally(() => {
            setIsLoading(false); 
        });  
    }

    return (
        <>  
            <div className='title-page'>
                Аналитический контроль
            </div>
            {isLoading && 
                <Spin tip="Отправляем...">
                    <div></div>
                </Spin>
            }
            <div className='analitic-control'>
                <div className='analitic-control-form source-water'>
                    <h3>Исходная вода</h3>
                    <ACFormWater reset={reset} setReset={setReset} handleSend={handleSend} name={"Исходная вода"}/>
                </div>
                <div className='analitic-control-form second-rising'>
                    <h3>Второй подъем</h3>
                    <ACFormSecRis reset={reset} setReset={setReset} handleSend={handleSend} name={"Второй подъем"}/>
                </div>    
            </div>    
        </>
    )
}

export default AnaliticControl