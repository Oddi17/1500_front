import React,{useState} from 'react';
import {Table,Select,message,Modal} from 'antd';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const { confirm } = Modal;

//также стоит добавить поиск пользователей в таблице
function AdminManageTable({data}){
    const [isLoading,setIsLoading] = useState(false)

    const handleDelete = (id_user) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: "Вы уверены, что хотите удалить пользователя?",
            content: "Это действие нельзя отменить!",
            okText: "Да, удалить",
            cancelText: "Отмена",
            okType: "danger",
            onOk() {
                setIsLoading(true)
                axios.delete(`http://10.50.50.2/api/auth/delete/user/?id=${id_user}`,{withCredentials: true})
                .then((response)=>{ 
                    message.success("Пользователь успешно удален")
                })
                .catch((error)=>{
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
            },
            onCancel() {
                message.info("Удаление отменено");
            },
        })
         
    }

    const handleChange = (value,id) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: "Вы уверены, что хотите сменить роль пользователя?",
            okText: "Да,изменить",
            cancelText: "Отмена",
            okType: "default",
            onOk() {
                setIsLoading(true)
                axios.put(`http://10.50.50.2/api/auth/change/user/role`,{
                    id:id,
                    role:value
                },{withCredentials: true})
                .then((response)=>{ 
                    message.success("Роль пользователя успешно изменена")
                })
                .catch((error)=>{
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
            },
            onCancel() {
                message.info("Изменение роли отменено");
            },
        })
    }

    const columns = [
        {
            title: 'Имя пользователя',
            dataIndex: 'first_name',
            key: 'first_name',
            width: '265px',
            align: "center",
        },
        {
            title: 'Логин пользователя' ,
            dataIndex: "login",
            key: "login",
            width: '130px',
            align: "center",
        },
        // {
        //     title: 'Роль пользователя' ,
        //     dataIndex: "role",
        //     key: "role",
        //     width: '130px',
        //     align: "center",
        // },
        {
            title: 'Роль пользователя',
            dataIndex : 'role',
            key: "role",
            align: "center",
            width: '130px',
            render: (_,device) => (
                <Select
                    defaultValue= {device.role}
                    style={{ width: 120 }}
                    onChange={(value=>handleChange(value,device.id))}
                    options={[
                        { value: 'operator', label: 'оператор' },
                        { value: 'user', label: 'инженер' },
                    ]}/>
            )
        },
        {
            title: 'Действия',
            dataIndex : 'key',
            align: "center",
            key: 'action',
            render: (_,device) => (
                <>
                    <a onClick={()=>handleDelete(device.id)}>Удалить</a>
                </>
            )
        },
    ]

    const defaultTitle = () => 'Управление пользователями';
    return (
        <Table
            bordered
            loading = {isLoading}
            columns={columns} 
            dataSource={data}
            title={defaultTitle}
            pagination={false}
            scroll={{ y: 500 }} 
        />
    )
}
export default AdminManageTable