import { HeaderSelf, Title } from "./styled";
import { Button, Table, Space } from "antd";
import { FileAddOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import { adminPaths } from "@/routers/helpers";
import api from "@/services/request";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

interface DataType {
  id: number;
  title: string;
  file_id: string;
  extension: string;
  created_at: string;
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
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.schedule}/edit/${record.file_id}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
    width: "10%",
  },
];

const ScheduleListPage: React.FC = () => {
  const navigate = useNavigate();

  const addHandler = () => {
    navigate(`${adminPaths.schedule}/add`);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await api
        .get<DataType[]>(`/schedule/all`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          setDataSource(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HeaderSelf>
        <Title>Dərs Cədvəli</Title>
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          size="large"
          onClick={addHandler}
        >
          Əlavə et
        </Button>
      </HeaderSelf>

      <Table<DataType>
        loading={loading}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default ScheduleListPage;
