import React from 'react'
import { Box, Modal } from '@mui/material/'
import { SubTitle } from './common/typografy/SubTitle'
import { AddArticleForm } from './ui/AddArticleForm'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentArticle, getIsModal, setCloseModal } from '../store/articles'

const style = {
  modalWindow: {
    position: 'absolute',
    top: '49%',
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
export const ModalEdit = ({ handleSnackbar }) => {
  const blog = useSelector(getCurrentArticle())
  const dispatch = useDispatch()
  const isModal = useSelector(getIsModal())

  return (
    <div>
      <Modal
        open={!!blog || isModal}
        onClose={() => dispatch(setCloseModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modalWindow} component="div">
          <SubTitle>Редактирование</SubTitle>
          <AddArticleForm
            article={blog}
            onCloseModal={() => dispatch(setCloseModal())}
            handleSnackbar={handleSnackbar}
            // submitEdit={(data, checkEdit) => dispatch(updateArticle(data, checkEdit, handleSnackbar))}
          />
        </Box>
      </Modal>
    </div>
  )
}