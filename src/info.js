import React, { Component } from "react";
import { DatePicker, Col, Row, Typography, Spin, Image } from "antd";
import moment from "moment";

const { Paragraph, Title } = Typography;

async function fetchData(date) {
  try {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=ryKeedeRejmebUmDh57G3jeiUi3emyj3d467ioGM&date=${date}`;
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

export default class Info extends Component {
  state = {
    date: "",
    explanation: "",
    url: "",
    title: "",
    mydate: "",
    loading: false,
  };

  componentDidMount() {
    this.myFunc("2019-09-13");
  }

  myFunc = (date) => {
    this.setState({ loading: true });
    fetchData(date)
      .then((data) => {
        this.setState({
          date: data.date,
          explanation: data.explanation,
          url: data.url,
          title: data.title,
        });
      })
      .then(() => this.setState({ loading: false }));
  };

  disabledDate(current) {
    return current && current > moment();
  }

  render() {
    const { date, explanation, url, title, loading } = this.state;
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
            disabledDate={this.disabledDate}
            onChange={(_, date) => this.myFunc(date)}
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
  }
}
