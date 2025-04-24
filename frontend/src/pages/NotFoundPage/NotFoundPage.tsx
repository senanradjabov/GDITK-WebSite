import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Bağışlayın, bu səhifə mövcud deyil."
            extra={
                <Button type="primary" onClick={() => navigate("/")}>
                    Ana səhifəyə qayıt
                </Button>
            }
        />
    );
};

export default NotFoundPage;
