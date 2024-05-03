import React, { useContext, useState } from 'react';
import { Button, Form, Input, Modal, Row, Col, Upload, message } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { InboxOutlined } from '@ant-design/icons';
import AuctionCard from './AuctionCard'; // Import AuctionCard component

const { TextArea } = Input;

const AddAuction = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [form] = Form.useForm();
  const { currentUser } = useContext(AuthContext);
  const [submittedAuction, setSubmittedAuction] = useState(null); // Track submitted auction

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const onFinish = async (values) => {
    setError('');
    const { itemTitle, itemDesc, startPrice, itemDuration, itemImage } = values;

    if (!imgTypes.includes(itemImage[0].type)) {
      return setError('Please use a valid image');
    }

    const currentDate = new Date();
    const dueDate = new Date(currentDate.getTime() + parseInt(itemDuration) * 3600000);

    const newAuction = {
      email: currentUser.email,
      title: itemTitle,
      desc: itemDesc,
      curPrice: startPrice,
      duration: dueDate,
      itemImage: itemImage[0],
    };

    setAuction(newAuction);
    setSubmittedAuction(newAuction); // Save submitted auction
    closeForm();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      {submittedAuction ? (
        <AuctionCard item={submittedAuction} />
      ) : (
        <>
          <Button type="primary" onClick={openForm}>
            + Add Auction
          </Button>
          <Modal centered title="Create Auction" open={showForm} onCancel={closeForm} footer={null}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="itemTitle" label="Item Title" rules={[{ required: true, message: 'Please input the item title!' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="startPrice" label="Start Price" rules={[{ required: true, message: 'Please input the start price!' }]}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="itemDesc" label="Item Description" rules={[{ required: true, message: 'Please input the item description!' }]}>
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="itemDuration" label="Item Duration in hours" rules={[{ required: true, message: 'Please input the item duration!' }]}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="itemImage" label="Item Image" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload item image!' }]}>
                    <Upload.Dragger name="files" beforeUpload={beforeUpload} accept=".jpg,.jpeg,.png" multiple={false}>
                      <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button onClick={closeForm} style={{ marginLeft: 8 }}>Cancel</Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddAuction;
