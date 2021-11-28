import React from 'react'
import { Box, Modal } from '@mui/material/'
import { SubTitle } from '../common/typografy/SubTitle'
import { useAdmin } from '../../hooks/useAdmin'
import { useStore } from '../../hooks/useStore'
import { AddArticleForm } from '../ui/AddArticleForm'

const style = {
  modalWindow: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '650px',
    width: '100%',
    bgcolor: 'rgb(190, 190, 190)',
    boxShadow: 24,
    p: '10px 30px 30px 30px'
  },
  blockActions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '30px'
  }
}
export const ModalEdit = () => {
  const { blog } = useStore()
  const { handleCloseModalEdit, submitEdit, newArticle } = useAdmin()

  return (
    <div>
      <Modal
        open={!!blog || !!newArticle}
        onClose={handleCloseModalEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modalWindow} component="div">
          <SubTitle>Редактирование</SubTitle>
          <AddArticleForm article={blog} onCloseModal={handleCloseModalEdit} submitEdit={submitEdit} />
        </Box>
      </Modal>
    </div>
  )
}