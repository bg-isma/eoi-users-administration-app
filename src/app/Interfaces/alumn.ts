import { Course } from "./course";
import { Experience } from "./experience";

export type Alumn = {
    id: string,
    img?: string,
    name: string,
    description?: string,
    courses?: Course[],
    birthday?: string,
    laborSituation?: string,
    phone?: string,
    city?: string,
    contactEmail?: string,
    experiences?: Experience[]
    password : string,
    loginEmail: string ,
    mainCourse: string
}

/*
// un curso :
    {
        "name": "",
        "img": "",
        "hours": 0,
        "description": "",
        "skils":    
        ],
        "professors":   
        ],
        "area": "",
        "year": "",
        "modality": ""
    }
*/

/* 
    {
        "company": "",
        "time": ""
    }
*/ 