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
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    // key: "action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.documents}/edit/${record.file_id}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
    width: "10%",
  },
];

const DocumentsListPage: React.FC = () => {
  const navigate = useNavigate();

  const addHandler = () => {
    navigate(`/admin/${adminPaths.documents}/add`);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalNews, setTotalNews] = useState<number>(1);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      await api
        .get<ResponseData>(`/documents/all?page=${page}&size=${pageSize}`, {
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

  return (
    <>
      <HeaderSelf>
        <Title>Sənədlər</Title>
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

export default DocumentsListPage;
