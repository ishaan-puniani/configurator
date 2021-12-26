import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select } from "antd";
import { useState } from "react";
import { Tag, WithContext as ReactTags } from "react-tag-input";

const TagInputForChild = ({
  fieldPath,
  field,
  form,
  symbolsSuggestions,
  label,
  rules,
  valueType,
}: any) => {
  debugger;
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
        value: updatedTags.map((t) =>
          valueType === "integer" ? parseInt(t.text) : t.text
        ),
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
        value: newTags.map((t) =>
          valueType === "integer" ? parseInt(t.text) : t.text
        ),
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

  return (
    <Form.Item
      name={[...fieldPath, field.name]}
      label={label}
      help="You can use , (comma) as separator for adding multiple values together and hit enter. Feel free to paste value as well"
      rules={rules}
      // rules={[
      //   {
      //     validator: (rule, value) => {
      //       return Promise.resolve();
      //       // console.log(form.getFieldValue("dynamicReelLinking"));
      //       // console.log(form.getFieldValue("clientId"));
      //       // return value.length > 2
      //       //   ? Promise.resolve()
      //       //   : Promise.reject(new Error("Should be a number"));
      //     },
      //   },
      // ]}
    >
      <ReactTags
        tags={tags}
        suggestions={symbolsSuggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        // handleDrag={this.handleDrag}
        // handleTagClick={this.handleTagClick}
      />
    </Form.Item>
  );
};

export default TagInputForChild;
