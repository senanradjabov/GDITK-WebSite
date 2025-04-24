import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Flex, Select } from "antd";

import api from "@/services/request";
import { adminPaths } from "@/routers/helpers";

const { Option } = Select;

interface StaffMember {
  id: number;
  first_name: string;
  last_name: string;
}

interface MainData {
  id: number;
  title: string;
  staff_id: number;
}

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

const getUrl = (slug: string) => `${adminPaths.manage}/get/${slug}`;
const updateUrl = (slug: string) => `${adminPaths.manage}/update/${slug}`;
const deleteUrl = (slug: string) => `${adminPaths.manage}/delete/${slug}`;
const addUrl = `${adminPaths.manage}/add`;
const getStaffUrl = `${adminPaths.staff}`;

const ManagementUpsetPage: React.FC = () => {
  const { slugId } = useParams<{ slugId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [staffOptions, setStaffOptions] = useState<StaffMember[]>([]);

  useEffect(() => {
    if (slugId) {
      setLoading(true);

      api
        .get(getUrl(slugId), { withCredentials: true })
        .then((response) => {
          const { title, staff_id } = response.data;

          form.setFieldsValue({
            title: title,
            staff_id: staff_id,
          });
        })
        .catch((error) => {
          message.error(`Failed to load data.\n ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slugId, form]);

  useEffect(() => {
    api
      .get(getStaffUrl, { withCredentials: true })
      .then((response) => {
        setStaffOptions(response.data);
      })
      .catch(() => {
        message.error("Ошибка загрузки данных");
      });
  }, []);

  const handleFinish = (values: MainData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("staff_id", String(values.staff_id));

    const request = slugId
      ? api.put(updateUrl(slugId), formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
      : api.post(addUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

    request
      .then(() => {
        message.success("Saved successfully!");
        navigate(`/admin/${adminPaths.manage}`);
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
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      request
        .then(() => {
          message.success("delete successfully!");
          navigate(`/admin/${adminPaths.manage}`);
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
      >
        <Form.Item
          label="Vəzifənin adI"
          name="title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="staff_id"
          label="Adam"
          rules={[{ required: true, message: "Seçin" }]}
        >
          <Select placeholder="Выберите" loading={loading}>
            {staffOptions.map((staff) => (
              <Option key={staff.id} value={staff.id}>
                {staff.first_name} {staff.last_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Flex gap="small" wrap>
            <Button type="primary" htmlType="submit" loading={loading}>
              {slugId ? "Yenilə" : "Yaratmaq"}
            </Button>
            {slugId && slugId !== "1" ? (
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

export default ManagementUpsetPage;
