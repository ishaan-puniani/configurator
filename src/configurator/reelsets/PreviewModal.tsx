import { Modal } from "antd";

const PreviewModal = ({ data, isVisible, onCancel }: any) => {
  const maxRows = Math.max(...data?.map((a: Array<String>) => a.length)) || 0;
  const cols = data?.length || 0;

  return (
    <Modal
      title="Preview"
      visible={isVisible}
      footer={null}
      onCancel={onCancel}
      width={cols * 120}
    >
      <table className="reelset-preview">
        {[...Array(maxRows)].map((e, rowIdx) => (
          <tr key={rowIdx}>
            <td>{rowIdx}</td>
            {[...Array(cols)].map((e, colIdx) => (
              <td>{data[colIdx][rowIdx]}</td>
            ))}
          </tr>
        ))}
      </table>
    </Modal>
  );
};
export default PreviewModal;
