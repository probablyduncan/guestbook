type GuestbookEntryTemplateType = "guestbook" | "job"
    | "college" | "homestay" | "review" | "security"
    | "dating" | "snail" | "alt" | "doodle";

type GuestbookFormDataOfType<T extends GuestbookEntryTemplateType> = Omit<Extract<GuestbookFormData, { type: T }>, "type">;

type GuestbookFormData = {
    type: "guestbook";
    name: string;
    location?: string;
    url?: string;
    message: string;
} | {
    type: "job";
    name: string;
    fax: string;
    jobTitle: string;
    experience: string;
    fit: string;
    gap: string;
    desiredSalary: number;
} | {
    type: "college";

    // in 200 words, why would you be a good fit for ${school}
    fit: string;

    // what grade do you plan to get
    grade: string;
    
    extracurriculars: {
        type: "volunteering" | "sports captain" | "small business";
        text: string;
    }[];
} | {
    type: "homestay";

} | {
    type: "dating";
    height: number;
    jumpHeight: number;

    // validation: that's too many toes!!!
    toeCount: number;

    sunday: string;
    dread: string;
    apocalypse: string;
}