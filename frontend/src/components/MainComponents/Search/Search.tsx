import { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const SearchModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery || trimmedQuery.length < 3) {
      message.error("Enter a valid query (at least 3 characters)");
      return;
    }

    onClose();
    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <Modal
      title="Xəbər axtarışı"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Input
        placeholder="AxtarIn..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onPressEnter={handleSearch}
        allowClear
      />
      <Button
        type="primary"
        onClick={handleSearch}
        style={{ marginTop: 10, width: "100%" }}
      >
        Search
      </Button>
    </Modal>
  );
};

export default SearchModal;
