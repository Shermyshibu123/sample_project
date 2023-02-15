import { Button, Input, Layout, Tabs, Space, Typography, Avatar, Select, Divider } from 'antd';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';
import authStore from '../../Store/authStore';
import { useHistory } from 'react-router-dom';
import Constant from '../../Global/Constant';

var { TextArea } = Input;
var onChange = (value: string) => {
    console.log(`selected ${value}`);
};

var onSearch = (value: string) => {
    console.log('search:', value);
};
var { Content } = Layout;
var { Title, Text } = Typography;
var ArchiveSvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M58.4833 7.41667L53.8667 1.81667C53.3931 1.25081 52.8018 0.795099 52.1339 0.481333C51.4661 0.167566 50.7379 0.00330138 50 0H10C8.45 0 7.06667 0.716667 6.15 1.81667L1.53333 7.41667C0.566667 8.58333 0 10.05 0 11.6667V53.3333C0 57.0167 2.98333 60 6.66667 60H53.3333C57.0167 60 60 57.0167 60 53.3333V11.6667C60 10.05 59.4333 8.58333 58.4833 7.41667ZM30 48.3333L11.6667 30H23.3333V23.3333H36.6667V30H48.3333L30 48.3333ZM7.08333 6.66667L9.8 3.33333H49.8L52.9167 6.66667H7.08333V6.66667Z" fill="currentColor" />
    </svg>
);
var ShareSvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.837932 20.6382L23.3378 0.639069C23.6971 0.3162 24.1425 0.1046 24.6198 0.0299606C25.0971 -0.0446791 25.5858 0.0208522 26.0266 0.218598C26.4674 0.416344 26.8412 0.737798 27.1028 1.14393C27.3644 1.55006 27.5025 2.02341 27.5002 2.50649V10.5236C35.0102 12.5385 60 21.9181 60 57.504C59.9991 58.0844 59.7963 58.6464 59.4263 59.0936C59.0564 59.5408 58.5424 59.8453 57.9724 59.955C57.4025 60.0646 56.8122 59.9726 56.3027 59.6946C55.7932 59.4167 55.3963 58.9701 55.18 58.4315C47.7676 39.8998 33.3177 36.0325 27.5027 35.225V42.5047C27.5032 42.9873 27.364 43.4598 27.1019 43.865C26.8398 44.2703 26.466 44.591 26.0256 44.7884C25.5852 44.9859 25.0971 45.0516 24.6201 44.9778C24.1432 44.9039 23.6978 44.6936 23.3378 44.3721L0.837932 24.373C0.574405 24.1385 0.363502 23.8508 0.219083 23.529C0.0746638 23.2071 1.91057e-06 22.8584 1.91057e-06 22.5056C1.91057e-06 22.1528 0.0746638 21.8041 0.219083 21.4822C0.363502 21.1604 0.574405 20.8727 0.837932 20.6382Z" fill="currentColor" />
    </svg>
);
var ShareRightSvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M59.1621 20.6382L36.6622 0.639069C36.3029 0.3162 35.8575 0.1046 35.3802 0.0299606C34.9029 -0.0446791 34.4142 0.0208522 33.9734 0.218598C33.5326 0.416344 33.1588 0.737798 32.8972 1.14393C32.6356 1.55006 32.4975 2.02341 32.4998 2.50649V10.5236C24.9898 12.5385 0 21.9181 0 57.504C0.000915327 58.0844 0.203739 58.6464 0.573685 59.0936C0.943631 59.5408 1.45765 59.8453 2.02758 59.955C2.59751 60.0646 3.18785 59.9726 3.69734 59.6946C4.20683 59.4167 4.60373 58.9701 4.81996 58.4315C12.2324 39.8998 26.6823 36.0325 32.4973 35.225V42.5047C32.4968 42.9873 32.636 43.4598 32.8981 43.865C33.1602 44.2703 33.534 44.591 33.9744 44.7884C34.4148 44.9859 34.9029 45.0516 35.3799 44.9778C35.8568 44.9039 36.3022 44.6936 36.6622 44.3721L59.1621 24.373C59.4256 24.1385 59.6365 23.8508 59.7809 23.529C59.9253 23.2071 60 22.8584 60 22.5056C60 22.1528 59.9253 21.8041 59.7809 21.4822C59.6365 21.1604 59.4256 20.8727 59.1621 20.6382Z" fill="currentColor" />
    </svg>

);
var MessageSvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.72167e-05 29.9999C8.72167e-05 13.4314 13.4315 0 30 0C46.5687 0 60 13.4314 60 29.9999C60 46.5683 46.5687 59.9999 30 59.9999C24.6207 59.9999 19.5649 58.5815 15.1945 56.0975L3.94875 59.846C2.87076 60.2054 1.68225 59.9246 0.878757 59.1212C0.0752673 58.3178 -0.205293 57.1292 0.154017 56.0513L3.90264 44.8055C1.41849 40.4351 8.72167e-05 35.3792 8.72167e-05 29.9999ZM17.2714 17.272C14.9562 19.5872 13.3995 22.3841 12.6095 25.3433L18.4066 26.8907C18.9316 24.9236 19.9647 23.064 21.514 21.5147C23.0634 19.9653 24.9231 18.9323 26.8902 18.4072L25.3425 12.6102C22.3835 13.4001 19.5866 14.9568 17.2714 17.272ZM42.7272 17.272C40.4121 14.9568 37.6152 13.4001 34.656 12.6102L33.1086 18.4072C35.0757 18.9323 36.9354 19.9653 38.4846 21.5147C40.0341 23.064 41.067 24.9236 41.592 26.8907L47.3892 25.3433C46.5993 22.3841 45.0426 19.5872 42.7272 17.272ZM12.6095 34.6565C13.3995 37.6157 14.9562 40.4126 17.2714 42.7277C19.5866 45.0431 22.3835 46.5998 25.3425 47.3897L26.8902 41.5928C24.9231 41.0675 23.0634 40.0346 21.514 38.4851C19.9647 36.9359 18.9316 35.0762 18.4066 33.1091L12.6095 34.6565ZM34.656 47.3897C37.6152 46.5998 40.4121 45.0431 42.7272 42.7277C45.0426 40.4126 46.5993 37.6157 47.3892 34.6565L41.592 33.1091C41.067 35.0762 40.0341 36.9359 38.4846 38.4851C36.9354 40.0346 35.0757 41.0675 33.1086 41.5928L34.656 47.3897Z" fill="currentColor" />
    </svg>
);
var PublishSvg = () => (
    <svg width="1em" height="1em" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8462 0C6.17538 0 0 6.17538 0 13.8462V46.1538C0 53.8246 6.17538 60 13.8462 60H46.1538C53.8246 60 60 53.8246 60 46.1538V13.8462C60 6.17538 53.8246 0 46.1538 0H13.8462ZM15 16.1538V16.1585C22.7192 16.1585 30.5354 16.2923 38.0538 16.1585C38.2073 16.1554 38.3598 16.183 38.5025 16.2396C38.6452 16.2962 38.7751 16.3807 38.8847 16.4881C38.9943 16.5956 39.0814 16.7238 39.1408 16.8654C39.2002 17.0069 39.2308 17.1588 39.2308 17.3123V24.0092H23.0769L23.0815 35.6562H39.2308V42.6969C39.2295 43.0021 39.1074 43.2944 38.8912 43.5098C38.6749 43.7252 38.3821 43.8462 38.0769 43.8462H15C14.694 43.8462 14.4005 43.7246 14.1841 43.5082C13.9677 43.2918 13.8462 42.9983 13.8462 42.6923V17.3077C13.8462 17.0017 13.9677 16.7082 14.1841 16.4918C14.4005 16.2754 14.694 16.1538 15 16.1538V16.1538ZM42.7154 21.9231V21.9277C42.87 21.9261 43.0234 21.9556 43.1665 22.0142C43.3095 22.0729 43.4394 22.1596 43.5485 22.2692L50.4323 29.1692C50.5398 29.2764 50.625 29.4037 50.6832 29.5439C50.7414 29.6841 50.7713 29.8344 50.7713 29.9862C50.7713 30.1379 50.7414 30.2882 50.6832 30.4284C50.625 30.5686 50.5398 30.6959 50.4323 30.8031L43.5092 37.7423C43.348 37.904 43.1424 38.0141 42.9185 38.0589C42.6947 38.1037 42.4625 38.081 42.2515 37.9938C42.0405 37.9066 41.8602 37.7587 41.7332 37.5689C41.6063 37.3792 41.5385 37.156 41.5385 36.9277L41.5477 33.5815H26.5385C26.2332 33.5803 25.9409 33.4582 25.7256 33.242C25.5102 33.0257 25.3892 32.7329 25.3892 32.4277L25.3846 27.7085C25.384 27.5565 25.4134 27.406 25.4711 27.2655C25.5288 27.125 25.6137 26.9972 25.7209 26.8896C25.8281 26.7819 25.9555 26.6965 26.0958 26.6383C26.2361 26.58 26.3865 26.55 26.5385 26.55H41.5662V26.5269L41.5754 23.0769C41.5754 22.4446 42.0831 21.9231 42.7154 21.9231Z" fill="currentColor"/>
    </svg>
    
);
var ArchiveIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ArchiveSvg} {...props} />
);
var ShareIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ShareSvg} {...props} />
);
var ShareRightIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ShareRightSvg} {...props} />
);
var MessageIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={MessageSvg} {...props} />
);
var PublishIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={PublishSvg} {...props} />
);
function RaiseYourVoice() {
    var history = useHistory();

    var user = authStore.currentUser;
    
    var navigateToNewVoice = () => {
    history.push("/newVoice");
  }

    return (
        <Layout className="h-100">
            <Layout>
                <Content className='vb-content'>
                    <div className="d-flex h-100">
                        <div className="flex-auto left-tab">
                            <Tabs defaultActiveKey="1" className='h-100'>

                                {
                                     user?.userAccess.includes(Constant.userAccess.Voices) &&
                                <Tabs.TabPane tab="Voices" key="1" className='vb-tab h-100'>
                                    <div className='vb-voice vb-voice--background selected'>
                                        <div className='flex-auto vb-avatar'><Avatar src="https://joeschmoe.io/api/v1/random" /></div>
                                        <div className='flex-fill'>
                                            <div className='d-flex'>
                                                <div className='flex-fill'><Title className='vb-text-primary' level={5}>Priyanka S</Title> </div>
                                                <div className='flex-auto vb-text-secondary'>1 day ago</div>
                                            </div>
                                            <Text className='block-ellipsis'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text></div>

                                    </div>
                                    <Divider className='my-0 vb-divider' />
                                    <div className='vb-voice vb-voice--background'>
                                        <div className='flex-auto vb-avatar'><Avatar src="https://joeschmoe.io/api/v1/random" /></div>
                                        <div className='flex-fill'>

                                            <div className='d-flex'>
                                                <div className='flex-fill'><Title className='vb-text-primary' level={5}>Name</Title> </div>
                                                <div className='flex-auto vb-text-secondary'>1 day ago</div>
                                            </div>
                                            <Text className='block-ellipsis'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text></div>

                                    </div>
                                    <Divider className='my-0 vb-divider' />
                                    <div className='vb-voice vb-voice--background'>
                                        <div className='flex-auto vb-avatar'><Avatar src="https://joeschmoe.io/api/v1/random" /></div>
                                        <div className='flex-fill'>
                                            <div className='d-flex'>
                                                <div className='flex-fill'><Title className='vb-text-primary' level={5}>Name</Title> </div>
                                                <div className='flex-auto vb-text-secondary'>1 day ago</div>
                                            </div>
                                            <Text className='block-ellipsis'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text></div>

                                    </div>
                                    <Divider className='my-0 vb-divider' />
                                    <div className='vb-voice vb-voice--background'>
                                        <div className='flex-auto vb-avatar'><Avatar src="https://joeschmoe.io/api/v1/random" /></div>
                                        <div className='flex-fill'>
                                            <div className='d-flex'>
                                                <div className='flex-fill'><Title className='vb-text-primary' level={5}>Name</Title> </div>
                                                <div className='flex-auto vb-text-secondary'>1 day ago</div>
                                            </div>
                                            <Text className='block-ellipsis'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text></div>

                                    </div>
                                </Tabs.TabPane>
                                
                               
                                }
                                <Tabs.TabPane tab="Published" key="2">
                                Content of Tab Pane 2
                                </Tabs.TabPane>
                               
                                {
                                    user?.userAccess.includes(Constant.userAccess.archieved) &&
                                    <Tabs.TabPane tab="Archived" key="3">
                                    Content of Tab Pane 3
                                </Tabs.TabPane>
                                }
                            </Tabs>
                        </div>
                        <div className="flex-fill d-flex flex-column">
                            <div className="flex-auto">
                                <div className='text-right mb-4'><Button type="primary" onClick={navigateToNewVoice}>Rasie your voice</Button></div>
                            </div>
                            <div className='vb-card vb-card--voicebox flex-fill h-100'>
                                <div className="d-flex justify-content-between align-items-center mb-3"> <Button type="text"><ArchiveIcon style={{ color: '#BC6DB4' }} /></Button>
                                    <Space size={8}>
                                        <Select
                                            className='d-none'
                                            showSearch
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: 'jack',
                                                    label: 'Jack',
                                                },
                                                {
                                                    value: 'lucy',
                                                    label: 'Lucy',
                                                },
                                                {
                                                    value: 'tom',
                                                    label: 'Tom',
                                                },
                                            ]}
                                        />
                                        <Text type="secondary">Share this to </Text> <ShareRightIcon style={{ color: '#0064D4' }} /> 
                            
                                        <Button className='d-none' type="link">Publish <ShareRightIcon style={{ color: '#0064D4' }} /> </Button>
                                    </Space> </div>
                                <div className='vb-voice'>
                                    <div className='flex-auto vb-avatar'><Avatar src="https://joeschmoe.io/api/v1/random" /></div>
                                    <div className='flex-fill'>
                                        <div className='d-flex'>
                                            <div className='flex-fill'><Title className='vb-text-primary' level={5}>Name</Title> </div>
                                            <div className='flex-auto vb-text-secondary'>1 day ago</div>
                                        </div>
                                        <Text >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.  </Text></div>

                                </div>

                                <Divider className='vb-divider' />
                                <div className='vb-voice'>
                                    <div className='flex-auto vb-avatar'><Avatar src="https://joeschmoe.io/api/v1/random" /></div>
                                    <div className='flex-fill'>
                                        <div className='d-flex'>
                                            <div className='flex-fill'><Title className='vb-text-primary' level={5}>Name</Title> </div>
                                            <div className='flex-auto vb-text-secondary'>1 day ago</div>
                                        </div>
                                        <Text >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.  </Text></div>

                                </div>
                            </div>

                        </div>
                    </div>

                </Content>
            </Layout>
        </Layout>

    );
}

export default RaiseYourVoice;