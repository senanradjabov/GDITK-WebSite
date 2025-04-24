import { useState, useEffect } from "react";

import type { TableProps } from "antd";
import { Table, Space, Button, Avatar } from "antd";
import {
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import { useNavigate, Link } from "react-router-dom";

import { HeaderSelf, Title } from "./styled";

import { adminPaths } from "@/routers/helpers";
import api from "@/services/request";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

interface DataType {
  id: number;
  image_id: string;
  title: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Şəkil",
    dataIndex: "image",
    render: (_, record) => (
      <Space size="middle">
        <Avatar
          shape="square"
          size={64}
          src={`${import.meta.env.VITE_APP_DOMAIN}/images/id/${record.image_id}`}
        />
      </Space>
    ),
  },
  {
    title: "Başlıq",
    dataIndex: "title",
    width: "80%",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/admin/${adminPaths.gallerySlider}/edit/${record.image_id}`}>
          <EditOutlined /> Redak elə
        </Link>
      </Space>
    ),
  },
];

const GallerySliderListPage: React.FC = () => {
  const navigate = useNavigate();

  const addHandler = () => {
    navigate(`/admin/${adminPaths.gallerySlider}/add`);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await api
        .get<DataType[]>(`${adminPaths.gallerySlider}/images`, {
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
        <Title>Slider</Title>
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
        rowKey={(record) => record.image_id}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default GallerySliderListPage;
