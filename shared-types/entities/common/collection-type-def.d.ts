import { AdminEntity } from "../admin.entity";
import { ParentEntity } from "../parent.entity";
import { StudentEntity } from "../student.entity";
import { TeacherEntity } from "../teacher.entity";
import { UserEntity } from "../user.entity";

export type CollectionTypeDefinition = {
    users: UserEntity,
    
    teachers: TeacherEntity;
    
    lessons: any;

    parents: ParentEntity;

    admins: AdminEntity;

    students: StudentEntity;   

    enrollments: any;
}