import { request } from "@strapi/helper-plugin";
const ReminderApiHandler = {
  getAllReminders: async () => {
    return await request("/refreshing/getall", {
      method: "GET",
    });
  },
  addReminder: async (data) => {
    return await request(`/refreshing/create`, {
      method: "POST",
      body: { data: data },
    });
  },
  editReminder: async (id, data) => {
    return await request(`/refreshing/update/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },
  deleteReminder: async (id) => {
    return await request(`/refreshing/delete/${id}`, {
      method: "DELETE",
    });
  },
};
export default ReminderApiHandler;