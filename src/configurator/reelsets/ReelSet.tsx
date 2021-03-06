import {
  ClearOutlined,
  CopyOutlined,
  DeleteFilled,
  DownloadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Space, Modal } from "antd";
import { useState } from "react";
import PreviewModal from "./PreviewModal";
import ReelStrip from "./ReelStrip";

const ReelSet = ({
  reelset,
  values,
  handleOnSave,
  numberOfReels,
  symbolsSuggestions,
  onCopy,
  copiedVals,
  onPaste,
}: {
  reelset: string;
  handleOnSave: any;
  values: any;
  numberOfReels: number;
  symbolsSuggestions: Array<{ id: string; text: string }>;
  onCopy: any;
  copiedVals: any;
  onPaste: any;
}) => {
  const [form] = Form.useForm();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [previewReelsetViewData, setPreviewReelsetViewData] =
    useState<Array<Array<String>>>();

  const showPreviewModal = (data: Array<Array<String>>) => {
    setPreviewReelsetViewData(data);
    setIsPreviewModalVisible(true);
  };
  const hidePreviewModal = (data: Array<Array<String>>) => {
    setPreviewReelsetViewData(undefined);
    setIsPreviewModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    handleOnSave(values);
  };

  return (
    <>
      <Form
        form={form}
        name="reelsetForm"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          fakereels:
            values && values["fakereels"]
              ? [...values["fakereels"]]
              : [...new Array(numberOfReels)],
          reels:
            values && values["reels"]
              ? [...values["reels"]]
              : [...new Array(numberOfReels)],
          initial:
            values && values["initial"]
              ? [...values["initial"]]
              : [...new Array(numberOfReels)],
        }}
      >
        <div style={{ textAlign: "right" }}>
          <Space>
            {!copiedVals && (
              <Button
                icon={<CopyOutlined />}
                onClick={() => {
                  onCopy(form.getFieldsValue());
                }}
              >
                Copy for other tabs
              </Button>
            )}
            {copiedVals && (
              <>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => {
                    handleOnSave(copiedVals);
                    onPaste();
                  }}
                >
                  Paste
                </Button>
                <Button
                  icon={<ClearOutlined />}
                  onClick={() => {
                    handleOnSave(copiedVals);
                    onPaste();
                  }}
                >
                  Clear
                </Button>
              </>
            )}
          </Space>
        </div>
        <h3>
          Fake Reels: {reelset}{" "}
          <Button
            onClick={() => {
              showPreviewModal(values["fakereels"]);
            }}
          >
            Preview
          </Button>
        </h3>
        <Form.List
          name="fakereels"
          rules={
            [
              //   {
              //     validator: async (_, names) => {
              //       if (!names || names.length < 2) {
              //         return Promise.reject(new Error("At least 2 passengers"));
              //       }
              //     },
              //   },
            ]
          }
        >
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`Strip:${field.key}`}
                    required={false}
                    key={field.key}
                    shouldUpdate
                  >
                    <ReelStrip
                      symbolsSuggestions={symbolsSuggestions}
                      fieldPath={["fakereels"]}
                      field={field}
                      form={form}
                    />
                  </Form.Item>
                ))}
                <Form.Item>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <h3>
          Reels{" "}
          <Button
            onClick={() => {
              showPreviewModal(values["reels"]);
            }}
          >
            Preview
          </Button>
        </h3>
        <Form.List
          name="reels"
          rules={
            [
              //   {
              //     validator: async (_, names) => {
              //       if (!names || names.length < 2) {
              //         return Promise.reject(new Error("At least 2 passengers"));
              //       }
              //     },
              //   },
            ]
          }
        >
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`Strip:${field.key}`}
                    required={false}
                    key={field.key}
                  >
                    <ReelStrip
                      symbolsSuggestions={symbolsSuggestions}
                      fieldPath={["reels"]}
                      field={field}
                      form={form}
                    />
                  </Form.Item>
                ))}
                <Form.Item>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <h3>
          Initial Symbols{" "}
          <Button
            onClick={() => {
              showPreviewModal(values["initial"]);
            }}
          >
            Preview
          </Button>
        </h3>
        <Form.List
          name="initial"
          rules={
            [
              //   {
              //     validator: async (_, names) => {
              //       if (!names || names.length < 2) {
              //         return Promise.reject(new Error("At least 2 passengers"));
              //       }
              //     },
              //   },
            ]
          }
        >
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`Strip:${field.key}`}
                    required={false}
                    key={field.key}
                  >
                    <ReelStrip
                      symbolsSuggestions={symbolsSuggestions}
                      fieldPath={["initial"]}
                      field={field}
                      form={form}
                    />
                  </Form.Item>
                ))}
                <Form.Item>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {previewReelsetViewData && (
        <PreviewModal
          data={previewReelsetViewData}
          isVisible={isPreviewModalVisible}
          onCancel={hidePreviewModal}
        ></PreviewModal>
      )}
    </>
  );
};

export default ReelSet;
