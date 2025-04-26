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
  name: string;
  description: string;
  slug: string;
  head_of_department_id: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Başlıq",
    dataIndex: "name",
    width: "80%",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.department}/edit/${record.slug}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
  },
];

const DepartmentListPage: React.FC = () => {
  const navigate = useNavigate();

  const addHandler = () => {
    navigate(`/admin/${adminPaths.department}/add`);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await api
        .get<DataType[]>(`${adminPaths.department}`, {
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
        <Title>Şöbə və bölmələr</Title>
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
        rowKey={(record) => record.name}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default DepartmentListPage;
