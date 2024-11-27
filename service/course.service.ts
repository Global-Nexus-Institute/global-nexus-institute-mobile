import apiClient, { endpoints } from "./api";

export const getCourses = async () => {
    const res = await apiClient.get(endpoints.courses.root);
    return res.data;
};