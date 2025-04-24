import { useEffect, useState } from "react";
import { List, Button, Spin, message, Pagination } from "antd";
import { Container, PageWrapper } from "@/App.styled";
import { TitleSelf, ContainerSelf } from "./styled";
import api from "@/services/request";

interface Document {
  id: number;
  title: string;
  file_id: string;
  extension: string;
  created_at: string;
}

interface DocumentResponse {
  items: Document[];
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}

const DocumentsList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Количество документов на странице

  const fetchDocuments = async (page: number) => {
    setLoading(true);
    try {
      const { data } = await api.get<DocumentResponse>(
        `/documents/all?page=${page}&size=${pageSize}`
      );
      setDocuments(data.items);
      setTotalItems(data.total_items);
      setCurrentPage(data.current_page);
    } catch {
      message.error("Не удалось загрузить документы");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(currentPage);
  }, [currentPage]);

  return (
    <PageWrapper>
      <Container>
        <TitleSelf>Sənədlər</TitleSelf>
        {loading ? (
          <Spin size="large" />
        ) : (
          <ContainerSelf>
            <List
              bordered
              dataSource={documents}
              renderItem={(doc) => (
                <List.Item
                  actions={[
                    <Button
                      key="list-load"
                      target="_blank"
                      type="primary"
                      // rel="noopener noreferrer"
                      href={`${api.defaults.baseURL}/documents/get/${doc.file_id}`}
                    >
                      load
                    </Button>,
                  ]}
                >
                  {doc.title} ({doc.extension})
                </List.Item>
              )}
            />
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              onChange={(page) => fetchDocuments(page)}
              style={{ marginTop: 20, textAlign: "center" }}
            />
          </ContainerSelf>
        )}
      </Container>
    </PageWrapper>
  );
};

export default DocumentsList;
