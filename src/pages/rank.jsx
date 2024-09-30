import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getRankApi } from "../util/apis";
import text from "../constants/text";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getRankApi();
        if (res?.data) {
          setDataSource(res.data);
        }
      } catch (error) {
        notification.error({
          message: "Tải dữ liệu",
          description: error?.response?.data?.EM || text.error,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Max score",
      dataIndex: "score",
      key: "score",
    },
  ];

  notification.config({ placement: "bottomRight" });

  return (
    <div style={{ padding: 30 }}>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default UserPage;
