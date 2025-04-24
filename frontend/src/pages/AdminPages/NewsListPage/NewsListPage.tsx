import { HeaderSelf, Title } from "./styled";
import { Button, Table, Space, Tag } from "antd";
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
  description: string;
  slug: string;
  is_draft: boolean;
  created_at: string;
  update_at: string;
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
    // sorter: true,
    render: (id) => id,
    width: "6%",
  },
  {
    title: "Başlıq",
    dataIndex: "title",
  },
  {
    title: "Qaralama",
    dataIndex: "is_draft",
    key: "is_draft",
    filters: [
      { text: "false", value: false },
      { text: "true", value: true },
    ],
    onFilter: (value, record) => value === record.is_draft,
    render: (tag: boolean) => {
      const color = tag ? "volcano" : "green";
      return <Tag color={color}>{`${tag}`.toUpperCase()}</Tag>;
    },
    width: "10%",
  },
  {
    title: "Action",
    // key: "action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.newsList}/edit/${record.slug}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
    width: "10%",
  },
];

const NewsListPage: React.FC = () => {
  const navigate = useNavigate();

  const addHandler = () => {
    navigate(adminPaths.newsAdd);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalNews, setTotalNews] = useState<number>(1);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      await api
        .get<ResponseData>(`/news/admin?page=${page}&size=${pageSize}`, {
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
        <Title>Xəbərlər</Title>
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

export default NewsListPage;
