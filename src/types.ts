export type ID = string;
export type Email = string;

export interface CourseType {
  id: ID;
  name: string;
}

export interface Course {
  id: ID;
  name: string;
}

export interface Offering {
  id: ID;
  courseId: ID;
  courseTypeId: ID;
}

export interface Registration {
  id: ID;
  offeringId: ID;
  studentName: string;
  studentEmail?: Email;
}

export interface OfferingWithLabels {
  id: ID;
  courseId: ID;
  courseTypeId: ID;
  courseName: string;
  courseTypeName: string;
}
