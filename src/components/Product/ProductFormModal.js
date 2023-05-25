import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ProductForm from './ProductForm';

const ProductFormModal = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(props.modalName);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {modalText}
      </Button>
      <Modal
        title={modalText}
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <ProductForm product={props.product} modalName={props.modalName} closeModelCallback={handleCancel}></ProductForm>
      </Modal>
    </>
  );
};
export default ProductFormModal;