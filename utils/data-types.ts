export type Course = {
  _id?: string;
  uuid?: string; // example: "077d3c58-9e6c-43ba-9ee8-a0c1f303fd18",
  name: string; // example: "Data Analytics With Python and SQL";
  slug: string; // example: "data-analytics-with-python-and-sql";
  short_intro: string; // example: "Discover the power of data analysis with Python and SQL in this dynamic campus program, unlocking insights and driving informed decisions.";
  is_featured: boolean;
  lesson_count: number;
  student_count: number;
  activity_count: number;
  main_image: string;
  cost?: number | string;
};

export type UsersDataType = {
  _id: string;
  uid: number;
  names: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  address?: {
    city: string;
    country: string;
    streetAddress?: string;
    zipCode?: string;
  };
  courses?: Course[] | [];
  profilePic?: string;
  createdAt: string;
  updatedAt: string;
};