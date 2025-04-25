import { useState, useEffect } from "react";

import type { TableProps } from "antd";
import { Table, Space, Button } from "antd";
import { EditOutlined, FileAddOutlined } from "@ant-design/icons";

import { useNavigate, Link } from "react-router-dom";

import { HeaderSelf, Title } from "./styled";

import { adminPaths } from "@/routers/helpers";
import api from "@/services/request";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

interface DataType {
  id: number;
  first_name: string;
  last_name: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "AdI",
    dataIndex: "name",
    width: "80%",
    render: (_, record) => (
      <Space size="middle">{record.first_name + " " + record.last_name}</Space>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.staff}/edit/${record.id}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
  },
];

const StaffListPage: React.FC = () => {
  const navigate = useNavigate();

  const addHandler = () => {
    navigate(`/admin/${adminPaths.staff}/add`);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await api
        .get<DataType[]>(`${adminPaths.staff}`, {
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
        <Title>Personal</Title>
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
        rowKey={(record) => record.first_name}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default StaffListPage;
