import React from 'react';
import {Table,Button} from 'antd';

const columns = [
    {
      title: 'Дата/Время записи',
      dataIndex: 'recdt',
      key: 'recdt',
      width: '130px',
      align: "center",  
      render: (text) => new Date(text).toLocaleString()
    },
    {
      title: 'Локация',
      dataIndex: "location",
      key: "location",
      width: '120px',
      align: "center",
      
    },
    {
      title: 'Температура',
      dataIndex: "temperature",
      key: "temperature",
      width: '120px',
      align: "center",
    },
    {
      title: 'pH',
      dataIndex: "ph",
      key: "ph",
      width: '100px',
      align: "center",
    },
    {
      title: 'Цветность',
      dataIndex: "color",
      key: "color",
      width: '110px',
      align: "center",
    },
    {
      title: 'Ост. Хлор',
      dataIndex: "chlorine",
      key: "chlorine",
      width: '110px',
      align: "center",
      render: (text) => text ? text : "-"
    },
    {
      title: 'Ост. Алюминий',
      dataIndex: "aluminum",
      key: "aluminum",
      width: '110px',
      align: "center",
    },
    {
      title: 'Мутность',
      dataIndex: "turbidity",
      key: "turbidity",
      width: '110px',
      align: "center",
    },
    {
      title: 'Хлориды',
      dataIndex: "chlorides",
      key: "chlorides",
      width: '110px',
      align: "center",
    },
]


function AnaliticJournalTable({isLoading,data}){
    const defaultTitle = () => 'Журнал аналитического контроля';
    return (
        <Table
            bordered
            loading = {isLoading}
            columns={columns} 
            dataSource={data}
            title={defaultTitle}
            pagination={false}
            scroll={{ y: 400 }} // Высота для вертикального скролла
            footer={() => (
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button type="primary">Экспорт в Excel</Button>
              </div>
              )}
        />
    )
}
export default AnaliticJournalTable