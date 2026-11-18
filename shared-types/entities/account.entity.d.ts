import { Admin } from "./admin.entity";
import { Media } from "./media.entity";
import { Parent } from "./parent.entity";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";
import { User } from "./user.entity";

export interface Account {
    userName: string;
    password: string;

    user?: User;
    userId?: string;
    
    admin?: Admin;
    adminId?: string;

    teacher?: Teacher;
    teacherId?: string;
    
    student?: Student;
    studentId?: string;
    
    parent?: Parent
    parentId?: string;
    
    profileImg?: Media;
    profileImgId?: string;
}