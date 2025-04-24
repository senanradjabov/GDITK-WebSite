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
  title: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "AdI",
    dataIndex: "name",
    width: "80%",
    render: (_, record) => <Space size="middle">{record.title}</Space>,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.manage}/edit/${record.id}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
  },
];

const ManagementListPage: React.FC = () => {
  const navigate = useNavigate();

  const addHandler = () => {
    navigate(`/admin/${adminPaths.manage}/add`);
  };

  const [dataLSource, setDataLSource] = useState<DataType[]>([]);
  const [dataMSource, setDataMSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await api
        .get<DataType[]>(`${adminPaths.manage}/leader`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          setDataLSource(res.data);
          setLoading(false);
        });

      await api
        .get<DataType[]>(`${adminPaths.manage}/manager`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          setDataMSource(res.data);
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
        <Title>Direktor</Title>
      </HeaderSelf>
      <Table<DataType>
        loading={loading}
        columns={columns}
        rowKey={(record) => record.title}
        dataSource={dataLSource}
        pagination={false}
      />
      <HeaderSelf>
        <Title>Köməkçilər</Title>
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
        rowKey={(record) => record.title}
        dataSource={dataMSource}
        pagination={false}
      />
    </>
  );
};

export default ManagementListPage;
