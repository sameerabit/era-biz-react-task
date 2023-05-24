import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ProductForm from './ProductForm';

const ProductFormModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Add Product');
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
    console.log('Clicked cancel button');
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
        <ProductForm closeModelCallback={handleCancel}></ProductForm>
      </Modal>
    </>
  );
};
export default ProductFormModal;