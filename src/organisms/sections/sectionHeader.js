import { Box, Button, Text } from "../../atoms";

export const SectionHeader = (props) => {
   const { title = '',
      newButton = false,
      newButtonAction = () => { },
      saveButton = false,
      saveButtonAction = () => { },
      deleteButton = false,
      deleteButtonAction = () => { }
   } = props;

   return (
      <>
         <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
         }}>
            <Box sx={{ display: 'flex', flex: 1, height: '100%', gap: 1 }}>
               <Text title bold>{title}</Text>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }, gap: 1 }}>
               {newButton && <Button text='Novo' style={{ width: 100 }} onClick={newButtonAction} />}
               {saveButton && <Button text='Salvar' style={{ width: 100 }} onClick={saveButtonAction} />}
               {deleteButton && <Button secondary text='Excluir' style={{ width: 100 }} onClick={deleteButtonAction} />}
            </Box>
         </Box>
      </>
   )
}