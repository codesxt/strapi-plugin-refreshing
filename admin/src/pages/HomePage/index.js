import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Layout,BaseHeaderLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import Plus from '@strapi/icons/Plus';
import { Box } from '@strapi/design-system/Box';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import Calendar from '@strapi/icons/Calendar';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { DatePicker } from '@strapi/design-system/DatePicker';
import Modal from '../../components/Modal';
import ReminderApiHandler from '../../api/reminder';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import EditModal from '../../components/EditModal';
function HomePage(){
 
  const [reminderList,setReminder]=React.useState([]);  
const [ModalVisible,SetModalVisible]=React.useState(false);
  const [isEdit,setIsEdit]=React.useState(false)
  const [editedVal,setEditedVal]=React.useState({})
async function FetchReminders(){
  const reminders=await ReminderApiHandler.getAllReminders();
  setReminder(reminders)
}
 
async function DeleteReminders(id){
  const deleted=await ReminderApiHandler.deleteReminder(id)
  FetchReminders()
}
 
async function updateReminder(id,data){
  await ReminderApiHandler.editReminder(id,{"remindername":data.remindername,"date":data.date,'datetime':new Date(data.date)})
  FetchReminders()
}
 
function addReminder(data){
  ReminderApiHandler.addReminder({"remindername":data.remindername,"date":data.date,"datetime":new Date(data.date),"isdatepassed":false})
FetchReminders()
}
 
 
React.useEffect(()=>{
  FetchReminders()
},[])
  return (<Box>
      <Layout>
       
<Box background="neutral100">
<BaseHeaderLayout primaryAction={<Button startIcon={<Plus />} onClick={SetModalVisible}>Add an reminder</Button>}
 title="Add reminder" subtitle={`${reminderList.length} reminders found`} as="h2" />
    </Box>
    {reminderList.length==0?
    <Box padding={8} background="neutral100">
      <EmptyStateLayout icon={<Calendar />} content="You don't have any reminders yet..." />
    </Box>:
    <Table>
      <Thead>
        <Tr>
        <Th>
            <Typography variant="sigma">ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Reminder name</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">date</Typography>
                </Th>
           
        </Tr>
      </Thead>
      <Tbody>
      {reminderList.map((k)=>{
      return(
      <Tr>
      <Td>
      <Typography textColor="neutral800">{k.id}</Typography>
    </Td>
    <Td>
      <Typography textColor="neutral800">{k.remindername}</Typography>
    </Td>
    <Td>
    <DatePicker selectedDate={new Date(k.date)} label="date" name="datepicker" selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`} disabled />
 
    </Td>
    <Flex>
       <IconButton onClick={() => {
        setEditedVal({
          id:k.id,
          date:k.date,
          remindername:k.remindername
        })
        setIsEdit(true)
       }} label="Edit" noBorder icon={<Pencil />} />
      <Box paddingLeft={1}>
        <IconButton onClick={() => DeleteReminders(k.id)} label="Delete" noBorder icon={<Trash />} />
      </Box>
    </Flex>
    </Tr>
   
    )}
    )}
    </Tbody>
    </Table>}
      </Layout>
      {ModalVisible&& <Modal setShowModal={SetModalVisible} addReminder={addReminder}/>}
      {isEdit&& <EditModal setShowModal={setIsEdit} updateReminder={updateReminder} id={editedVal.id} dateGiven={editedVal.date} nameGiven={editedVal.remindername}/>}
    </Box>
    )
};
export default memo(HomePage);