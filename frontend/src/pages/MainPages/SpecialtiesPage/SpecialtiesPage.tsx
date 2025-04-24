import { useEffect, useState } from "react";
import { List, Spin, message } from "antd";
import api from "@/services/request";
import { Container, PageWrapper } from "@/App.styled";
import { TitleSelf } from "./styled";

interface Schedule {
    id: number;
    title: string;
}

const SpecialtiesPage: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const { data } = await api.get<Schedule[]>("/specialties/all");
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
                <TitleSelf>İxtisaslar</TitleSelf>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <List
                        size="large"
                        bordered
                        dataSource={schedules}
                        renderItem={(item) => <List.Item>{item.title}</List.Item>}
                    />
                )}
            </Container>
        </PageWrapper>
    );
};

export default SpecialtiesPage;
