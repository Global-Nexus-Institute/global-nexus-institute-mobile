import apiClient, { endpoints } from "./api";

export const getCourses = async () => {
    const res = await apiClient.get(endpoints.courses.root);
    return res.data;
};

export const getCourse = async (slug: string) => {
    const res = await apiClient.get(`${endpoints.courses.root}/${slug}`);
    return res.data.course;
};