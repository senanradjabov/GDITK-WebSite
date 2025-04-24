import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import { Table, Space, Tag } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { adminPaths } from "@/routers/helpers";
import { Link } from "react-router-dom";

import api from "@/services/request";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

interface DataType {
  id: number;
  slug_id: string;
  is_draft: boolean;
  tag: string;
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
    width: "20%",
  },
  {
    title: "Tg",
    dataIndex: "tag",
    filters: [
      { text: "news", value: "male" },
      { text: "vacancy", value: "vacancy" },
    ],
    width: "20%",
  },
  {
    title: "is_draft",
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
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (id) => (
      <Space size="middle">
        <Link
          to={`/admin/${adminPaths.news}/edit/${id}`}
        >
          <EditOutlined /> Redak elə
        </Link>
        <Link
          to={`/admin/${adminPaths.news}/delete/${id}`}
        >
          <DeleteOutlined /> Sil
        </Link>
      </Space>
    ),
  },
];

const DataTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalNews, setTotalNews] = useState<number>(1);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      await api
        .get<ResponseData>(`/news/slugs?page=${page}&size=${pageSize}`, {
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
  );
};

export default DataTable;
