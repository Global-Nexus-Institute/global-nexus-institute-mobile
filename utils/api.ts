import { getCourse } from "@/service/course.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCourseFromSlug = async (slug: string) => {
  try {
    const res = await getCourse(slug);
    await AsyncStorage.setItem("course", JSON.stringify(res));
    return res;
  } catch (error) {
    console.log("error getting course");
  }
};


export const removeCourse = async () => {
    try{
        await AsyncStorage.removeItem('course');
    } catch(e){
        console.log('error removing item');
    }
}