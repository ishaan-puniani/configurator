import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select } from "antd";
import { useState } from "react";
import { Tag, WithContext as ReactTags } from "react-tag-input";

const ReelStrip = ({ fieldPath, field, form, symbolsSuggestions }: any) => {
  const [tags, setTags] = useState<Array<Tag>>(
    form.getFieldValue([...fieldPath, field.name])
      ? form
          .getFieldValue([...fieldPath, field.name])
          .map((tg: string, idx: number) => ({ id: "" + idx, text: tg }))
      : []
  );

  const handleDelete = (i: any) => {
    const updatedTags = tags.filter((_tag, index) => index !== i);
    setTags(updatedTags);
    form.setFields([
      {
        name: [...fieldPath, field.name],
        value: updatedTags.map((t) => t.text),
      },
    ]);
  };

  const handleAddition = (tag: any) => {
    let comingTags = [];
    if (tag.text.indexOf(",") > 0) {
      tag.text
        .split(",")
        .filter((tg: string) => tg.trim().length > 0)
        .forEach((tg: string, idx: number) => {
          comingTags.push({ id: "" + (tags.length + idx + 1), text: tg });
        });
    } else {
      comingTags.push({ id: "" + (tags.length + 1), text: tag.id });
    }
    const newTags = [...tags, ...comingTags];
    setTags(newTags);

    form.setFields([
      {
        name: [...fieldPath, field.name],
        value: newTags.map((t) => t.text),
      },
    ]);
  };

  const handleDrag = (tag: any, currPos: number, newPos: number) => {
    const oldTags = [...tags];
    const newTags = oldTags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
    // this.setState({ tags: newTags });
    form.setFields([
      {
        name: [...fieldPath, field.name],
        value: newTags.map((t) => t.text),
      },
    ]);
  };

  //   handleDrag(tag, currPos, newPos) {
  //     const tags = [...this.state.tags];

  //     // mutate array
  //     tags.splice(currPos, 1);
  //     tags.splice(newPos, 0, tag);

  //     // re-render
  //     this.setState({ tags });
  //   }

  //   handleTagClick(index) {
  //     console.log('The tag at index ' + index + ' was clicked');
  //   }
  const copyToClipboard = () => {
    try {
      const val = form.getFieldValue([...fieldPath, field.name]);
      navigator.clipboard.writeText(val.join(","));
    } catch (ex) {}
  };
  return (
    <Form.Item
      name={field.key}
      rules={[
        {
          validator: (rule, value) => {
            return Promise.resolve();
            // console.log(form.getFieldValue("dynamicReelLinking"));
            // console.log(form.getFieldValue("clientId"));
            // return value.length > 2
            //   ? Promise.resolve()
            //   : Promise.reject(new Error("Should be a number"));
          },
        },
      ]}
    >
      <ReactTags
        autofocus={false}
        tags={tags}
        suggestions={symbolsSuggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        // handleTagClick={this.handleTagClick}
      />
      <Button onClick={copyToClipboard}>Copy To Clipboard</Button>
    </Form.Item>
  );
};

export default ReelStrip;
