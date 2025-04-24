import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Flex } from "antd";

import api from "@/services/request";
import { adminPaths } from "@/routers/helpers";

interface NewsData {
  title: string;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const getUrl = (slug: string) => `${adminPaths.specialties}/admin/${slug}`;
const updateUrl = (slug: string) => `${adminPaths.specialties}/update/${slug}`;
const deleteUrl = (slug: string) => `${adminPaths.specialties}/admin/delete/${slug}`;
const addUrl = `${adminPaths.specialties}/admin/add`;

const SpecialtiesUpsetPage: React.FC = () => {
  const { slugId } = useParams<{ slugId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slugId) {
      setLoading(true);
      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const { title } = response.data;
          form.setFieldsValue({ title });
        })
        .catch((error) => {
          message.error(`Failed to load data.\n ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slugId, form]);


  const handleFinish = (values: NewsData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", values.title);


    const request = slugId
      ? api.put(updateUrl(slugId), formData, {
        withCredentials: true,
      })
      : api.post(addUrl, formData, {
        withCredentials: true,
      });

    request
      .then(() => {
        message.success("saved successfully!");
        navigate(`/admin/${adminPaths.specialties}`);
      })
      .catch((error) => {
        message.error(`Failed to save. \n${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (slugId) {
      const request = api.delete(deleteUrl(slugId), {
        withCredentials: true,
      });

      request
        .then(() => {
          message.success("Delete successfully!");
          navigate(`/admin/${adminPaths.specialties}`);
        })
        .catch((error) => {
          message.error(`Failed to delete. \n${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <h1>{slugId ? "Redak elə" : "Yaratmaq"}</h1>

      <Form
        form={form}
        layout="vertical"
        {...formItemLayout}
        onFinish={handleFinish}
        initialValues={{ is_draft: true }}
      >
        <Form.Item
          label="Başlıq"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item>
          <Flex gap="small" wrap>
            <Button type="primary" htmlType="submit" loading={loading}>
              {slugId ? "Yenilə" : "Yaratmaq"}
            </Button>
            {slugId ? (
              <Button
                type="primary"
                loading={loading}
                color="danger"
                onClick={() => handleDelete()}
              >
                Sil
              </Button>
            ) : (
              ""
            )}
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default SpecialtiesUpsetPage;
