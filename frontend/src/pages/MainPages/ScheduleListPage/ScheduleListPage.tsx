import { useEffect, useState } from "react";
import { List, Button, Spin, message } from "antd";
import api from "@/services/request";
import { Container, PageWrapper } from "@/App.styled";
import { TitleSelf } from "./styled";

interface Schedule {
  id: number;
  title: string;
  file_id: string;
  extension: string;
  created_at: string;
}

const ScheduleListPage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await api.get<Schedule[]>("/schedule/all");
        setSchedules(data);
      } catch {
        message.error("Не удалось загрузить расписания");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <PageWrapper>
      <Container>
        <TitleSelf>Dərs cədvəlləri</TitleSelf>
        {loading ? (
          <Spin size="large" />
        ) : (
          <List
            bordered
            dataSource={schedules}
            renderItem={(schedule) => (
              <List.Item
                actions={[
                  <Button
                    key="list-load"
                    target="_blank"
                    type="primary"
                    // rel="noopener noreferrer"
                    href={`${api.defaults.baseURL}/schedule/get/${schedule.file_id}`}
                  >
                    load
                  </Button>,
                ]}
              >
                {schedule.title} ({schedule.extension})
              </List.Item>
            )}
          />
        )}
      </Container>
    </PageWrapper>
  );
};

export default ScheduleListPage;
