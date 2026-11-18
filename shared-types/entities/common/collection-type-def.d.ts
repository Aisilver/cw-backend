import { Account, Admin, Enrollment, Media, Parent, Product, Student, Teacher, User } from "..";

export type CollectionTypeDefinition = {
    users: User,
    
    account: Account;

    teachers: Teacher;

    parents: Parent;

    admins: Admin;

    students: Student;   

    media: Media;

    lessons: Product;

    enrollments: Enrollment;
}