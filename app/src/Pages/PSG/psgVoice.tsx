import { Col, Layout, Row, Input, Typography, Button, Space, Modal} from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import React, {useState}from 'react';
import PSGHeader from './psgHeader';

const { TextArea } = Input;

const { Content} = Layout;
const { Title } = Typography;

function PSGVoice() {

    const [text, setText] = useState('');

    const handleText = (e:any) => {
        setText(e.target.value)
    }

    const countDown = () => {
        const secondsToGo = 60;
    
        const modal = Modal.success({
            title: <div className='d-flex justify-content-between'>'Your Voice is Successfully Submitted!!' <Button type='link' className='vb-weight-600 underline'>Undo</Button></div>,
            icon: <CheckCircleTwoTone  twoToneColor="#0064D4"/>,
            width:600,
            
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    };
    return (
        <Layout className="h-100">
            <PSGHeader/>
            <Layout>
                <Content className='vb-content'>
                    <Row className='h-100'>    
                        <Col md={18} className="m-auto h-100">
                        <div className='vb-card vb-card--voicebox h-100'>
                        <div className="flex-fill overflow-auto">
                        <Title level={3} className="mb-2 vb-text-primary">New Voice</Title>
                        <TextArea value={text} rows={5} onChange={(e) => {handleText(e)}} maxLength={500} placeholder="Please write your message here..." ></TextArea>
                        </div>
                        <div className="flex-auto mt-4">
                        <Space size={16} className="w-100 justify-content-between">
                        <Button onClick={() => setText('')} disabled={!text}>Clear</Button>
                        <Button type='primary' onClick={countDown} disabled={!text}>Submit</Button>
                        </Space>
                        </div>
                        </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>

    );
}
export default PSGVoice;