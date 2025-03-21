import React,{ useState } from "react";
import { Form,Space,Button,Input,Select,message } from 'antd';
import {EditOutlined} from '@ant-design/icons';

export default function AddUserForm({handleSend,addForm}) {

    //const [role,setRole] = useState("operator")
    const handleSubmitAdd = () => {
        addForm.validateFields().then((objform)=>{
            handleSend(objform)
        }).catch((error)=>{
            message.error(error.message)
        })
    }
    // const handleChange = (value) => {
    //     setRole(value);
    // }
    return (
        <>
            <Form 
                form={addForm}
                onFinish={handleSubmitAdd}
                name="AddUser"
                initialValues={{ user_role: "operator" }}
            >
                <Form.Item 
                    name="user_name" 
                    label="Имя пользователя" 
                    normalize={(value) => value?.trim()}
                    rules={[
                        { required: true,message: 'Пожалуйста, введите имя пользователя' },
                        ]} >
                    <Input />
                </Form.Item>  
                <Form.Item 
                    name="user_login" 
                    label="Логин пользователя" 
                    normalize={(value) => value?.trim()}
                    rules={[
                        { required: true,message: 'Пожалуйста, введите логин пользователя' },
                        ]} >
                    <Input />
                </Form.Item>  
                <Form.Item 
                    name="user_password" 
                    label="Пароль пользователя" 
                    normalize={(value) => value?.trim()}
                    rules={[
                        { required: true,message: 'Пожалуйста, введите пароль пользователя' },
                        ]} >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="user_role" 
                    label="Роль пользователя"
                    >
                    <Select
                        style={{ width: 120 }}
                        onChange={(value=>handleChange(value))}
                        options={[
                            { value: 'operator', label: 'оператор' },
                            { value: 'user', label: 'инженер' },
                        ]}
                    />
                </Form.Item>
                <Form.Item className='buttons'>
                    <Space>
                        <Button icon={<EditOutlined />} type="primary" htmlType="submit">Добавить</Button>
                        <Button htmlType="reset">Очистить</Button>
                    </Space>
                </Form.Item>  

            </Form>

        </>
    )
}