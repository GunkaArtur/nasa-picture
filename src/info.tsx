import React, { ReactElement, useEffect, useState } from "react";
import { DatePicker, Col, Row, Typography, Spin, Image } from "antd";
import { fetchData } from "./fetchData";
import moment from "moment";

const { Paragraph, Title } = Typography;

export const Info = (): ReactElement => {
  const [date, setDate] = useState("");
  const [explanation, setExplanation] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onDateChange("2019-09-13");
  }, []);

  const onDateChange = (date: string) => {
    setLoading(true);
    fetchData(date)
      .then(data => {
        setDate(data.date);
        setExplanation(data.explanation);
        setUrl(data.url);
        setTitle(data.title);
      })
      .then(() => setLoading(false));
  };

  const disabledDate = (current: moment.Moment) => {
    return current && current > moment();
  };

  return loading ? (
    <Spin
      size="large"
      style={{ position: "absolute", top: "50%", left: "50%" }}
    />
  ) : (
    <Row justify="space-around">
      <Col span={24}>
        <Title level={2}>Choose any date</Title>
      </Col>
      <Col span={12}>
        <DatePicker
          value={moment(date)}
          disabledDate={disabledDate}
          onChange={(_, date) => onDateChange(date)}
        />
        <Title level={4}>Date:</Title>
        <Paragraph>{date}</Paragraph>
        <Title level={4}>Title:</Title>
        <Paragraph>{title}</Paragraph>
        <Title level={4}>Explanation:</Title>
        <Paragraph>{explanation}</Paragraph>
      </Col>
      <Col span={12}>
        <Image src={url} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </Col>
    </Row>
  );
};
