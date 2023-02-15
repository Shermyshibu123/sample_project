import React, { useEffect, useState } from "react";
import { Form, Button, FormInstance, Layout, Col, Row } from "antd";
import TextAreaField from "./TextAreaField";
import RadioSelect from "./RadioSelect";
import FooterComponent from "../FooterComponent";

interface Props {
  form: FormInstance<any>;
  metaData: any;
  customerName: any;
  companyName: any;
  projectName: any;
  projectCode: any;
  filledsurvey: any;
  surveyTemplate: Array<any>;
  onSave?: (model: any) => void;
  Response: any;
  isProfilePage: boolean;
}

function MetaForm(props: Props) {
  const [masterMetaData, setMasterMetaData] = useState<Array<any>>([]);
  const {
    form,
    metaData,
    onSave,
    surveyTemplate,
    Response,
    customerName,
    companyName,
    projectName,
    projectCode,
    isProfilePage,
    filledsurvey,
  } = props;

  useEffect(() => {
    if (surveyTemplate !== undefined) {
      setMasterMetaData(surveyTemplate);
    }
  }, [surveyTemplate]);

  const saveSurveyResponse = () => {
    form.validateFields().then((value) => {
      if (onSave) {
        const modifiedData = form.getFieldsValue(Object.keys(value));
        let isModified = false;
        if (Object.keys(modifiedData).length > 0) {
          isModified = true;
          if (Object.keys(modifiedData).length !== 0) {
            Response.formResponse = JSON.stringify(modifiedData);
          } else {
            Response.formResponse = "";
          }
          if (isModified) {
            onSave(Response);
          }
        }
      }
    });
  };

  return (
    <>
      {!isProfilePage && (
        <Layout.Content>
          <div className="px-5 pt-5 CFF-inner-bg text-center">
            <div className="CFF-logo mb-4">
              {/* <img src={logo2} alt="logo" /> */}
            </div>
            <h3 className="mb-0">Customer Feedback Form</h3>
            <h5 style={{ textAlign: "center", fontSize: "14px" }}>
              Thank you for connecting with Travancore Analytics.
              <br />
              We value your feedback. So please share your thoughts for us.
            </h5>
          </div>
          <div className="card-top pb-5">
            <div className="container card p-5">
              <div className="p-3 bg-light mb-3">
                <Row>
                  <Col span={8}>
                    <p className="mb-2" style={{ fontSize: "15px" }}>
                      Project Name: {projectName}
                    </p>
                  </Col>
                  <Col span={8} offset={8}>
                    <p className="mb-2" style={{ fontSize: "15px" }}>
                      Customer: {customerName}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <p className="mb-2" style={{ fontSize: "15px" }}>
                      Project Code: {projectCode}
                    </p>
                  </Col>
                  <Col span={8} offset={8}>
                    <p className="mb-2" style={{ fontSize: "15px" }}>
                      Customer POC: {companyName}
                    </p>
                  </Col>
                </Row>
              </div>
              <div className="question-wrapper question-container word-break">
                <Form
                  form={form}
                  className="form-wrapper"
                  size="large"
                  layout="vertical"
                  labelAlign="left"
                  autoComplete="off"
                  colon={false}
                  onFinish={onSave}
                >
                  {masterMetaData.map((formField: any) => {
                    if (formField.input_type === "big_text") {
                      return (
                        <div>
                          {filledsurvey ? (
                            <div className="border-bottom-dashed pt-3">
                              <strong>{formField.title}</strong>
                              <p className="pt-3">{metaData[formField.name]}</p>
                            </div>
                          ) : (
                            <TextAreaField
                              disabled={filledsurvey}
                              title={formField.title}
                              name={formField.name}
                              placeholder={formField.placeholder}
                              required={formField.required}
                              initialValue={metaData[formField.name]}
                            />
                          )}
                        </div>
                      );
                    }
                    if (formField.input_type === "radio") {
                      return (
                        <div>
                          {filledsurvey ? (
                            <div className="border-bottom-dashed pt-3">
                              <strong>{formField.title}</strong>
                              <p className="pt-3">{metaData[formField.name]}</p>
                            </div>
                          ) : (
                            <RadioSelect
                              title={formField.title}
                              name={formField.name}
                              required={formField.required}
                              initialValue={metaData[formField.name]}
                              options={formField.values}
                            />
                          )}
                        </div>
                      );
                    }

                    if (formField.input_type === "dropdown") {
                      return (
                        <div>
                          {(() => {
                            if (filledsurvey) {
                              return (
                                <div className="border-bottom-dashed pt-3">
                                  <strong>{formField.title}</strong>
                                  <p className="pt-3">
                                    {metaData[formField.name]}
                                  </p>
                                </div>
                              );
                            }
                          })()}
                        </div>
                      );
                    }
                  })}
                  {!filledsurvey ? (
                    <Form.Item className="d-flex justify-content-end text-right">
                      <Button
                        disabled={filledsurvey === true}
                        className="mr-2"
                        key="ok"
                        onClick={saveSurveyResponse}
                        type="primary"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  ) : (
                    ""
                  )}
                </Form>
              </div>
            </div>
          </div>
          <FooterComponent />
        </Layout.Content>
      )}
    </>
  );
}
export default MetaForm;
