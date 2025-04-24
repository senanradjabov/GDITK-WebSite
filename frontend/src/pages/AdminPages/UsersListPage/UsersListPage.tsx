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
  username: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "username",
    width: "80%",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.user}/edit/${record.username}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
  },
];

const UsersListPage: React.FC = () => {
  const navigate = useNavigate();

  const addHandler = () => {
    navigate(`${adminPaths.user}/add`);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await api
        .get<DataType[]>(`${adminPaths.user}/all`, {
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
        <Title>User</Title>
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
        rowKey={(record) => record.username}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default UsersListPage;
