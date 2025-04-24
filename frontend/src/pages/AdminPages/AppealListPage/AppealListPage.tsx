import { HeaderSelf, Title } from "./styled";
import { Table, Space, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import { adminPaths } from "@/routers/helpers";
import api from "@/services/request";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

interface DataType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface ResponseData {
  items: DataType[];
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.id - b.id,
    render: (id) => id,
    width: "6%",
  },
  {
    title: "Tarix",
    dataIndex: "date",
    render: (_, record) => <p>{record.created_at}</p>,
    width: "80%",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.appeal}/edit/${record.id}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
    width: "10%",
  },
];

const AppealListPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalNews, setTotalNews] = useState<number>(1);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      await api
        .get<ResponseData>(`/appeal/all?page=${page}&size=${pageSize}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          setDataSource(res.data.items);
          setTotalNews(res.data.total_items);
          setLoading(false);
        });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  useEffect(() => {
    fetchData(1, 10);
  }, []);

  const deleteAllHandler = async () => {
    try {
      await api
        .delete<ResponseData>(`/appeal/delete-all`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  return (
    <>
      <HeaderSelf>
        <Title>Müraciət</Title>

        <Button
          type="primary"
          size="large"
          onClick={deleteAllHandler}
        >
          HamsInI Sil
        </Button>
      </HeaderSelf>
      <Table<DataType>
        loading={loading}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        pagination={{
          total: totalNews,
          onChange: (page, pageSize) => {
            fetchData(page, pageSize);
          },
          showSizeChanger: true,
        }}
      />
    </>
  );
};

export default AppealListPage;
